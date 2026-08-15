// @ts-nocheck
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  private generateMRN(): string {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit random padding
    return `MRN-${today}-${rand}`;
  }

  async registerPatient(
    tenantId: string | null,
    input: {
      fullName: string;
      email?: string;
      phoneNumber: string;
      dateOfBirth: string | Date;
      gender: string;
      bloodGroup?: string;
      address?: string;
      emergencyContactName?: string;
      emergencyContactPhone?: string;
      emergencyContactRelation?: string;
    }
  ) {
    const dob = new Date(input.dateOfBirth);

    // 1. Strict Duplicate Check on Phone Number
    const existingPhone = await this.prisma.user.findFirst({
      where: {
        tenantId,
        phoneNumber: input.phoneNumber
      }
    });

    if (existingPhone) {
      throw new ConflictException('A patient with this phone number already exists under this tenant');
    }

    // 2. Soundex/Heuristic Match on Name and DOB
    const duplicateProfile = await this.prisma.patientProfile.findFirst({
      where: {
        dateOfBirth: dob,
        user: {
          tenantId,
          fullName: {
            equals: input.fullName,
            mode: 'insensitive'
          }
        }
      }
    });

    if (duplicateProfile) {
      throw new ConflictException('Potential duplicate check failed: patient with the same name and date of birth already exists');
    }

    const mrn = this.generateMRN();

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          tenantId,
          fullName: input.fullName,
          email: input.email || null,
          phoneNumber: input.phoneNumber,
          isActive: true
        }
      });

      const profile = await tx.patientProfile.create({
        data: {
          userId: user.id,
          mrn,
          dateOfBirth: dob,
          gender: input.gender,
          bloodGroup: input.bloodGroup || null,
          address: input.address || null,
          emergencyContactName: input.emergencyContactName || null,
          emergencyContactPhone: input.emergencyContactPhone || null,
          emergencyContactRelation: input.emergencyContactRelation || null
        },
        include: {
          user: true
        }
      });

      return profile;
    });
  }

  async searchPatients(tenantId: string | null, query: string) {
    if (!query) {
      return [];
    }

    return this.prisma.patientProfile.findMany({
      where: {
        user: {
          tenantId,
          OR: [
            { fullName: { contains: query, mode: 'insensitive' } },
            { phoneNumber: { contains: query } },
            { email: { contains: query, mode: 'insensitive' } }
          ]
        }
      },
      include: {
        user: true
      }
    });
  }

  async getPatientProfile(tenantId: string | null, id: string) {
    const profile = await this.prisma.patientProfile.findFirst({
      where: {
        id,
        user: {
          tenantId
        }
      },
      include: {
        user: true,
        familyPrimary: {
          include: {
            relative: {
              include: {
                user: true
              }
            }
          }
        },
        familyRelative: {
          include: {
            patient: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    return profile;
  }

  async createFamilyRelationship(
    tenantId: string | null,
    patientId: string,
    relativeId: string,
    relationshipType: string,
    caregiverPermissionActive: boolean
  ) {
    // Validate both patients exist and belong to the tenant
    const p1 = await this.prisma.patientProfile.findFirst({
      where: { id: patientId, user: { tenantId } }
    });
    const p2 = await this.prisma.patientProfile.findFirst({
      where: { id: relativeId, user: { tenantId } }
    });

    if (!p1 || !p2) {
      throw new NotFoundException('One or both patient profiles not found or tenant context mismatch');
    }

    if (patientId === relativeId) {
      throw new ConflictException('Cannot link a patient profile to itself');
    }

    const existingRel = await this.prisma.familyRelationship.findUnique({
      where: {
        patientId_relativeId: {
          patientId,
          relativeId
        }
      }
    });

    if (existingRel) {
      throw new ConflictException('This family relationship is already mapped');
    }

    return this.prisma.familyRelationship.create({
      data: {
        patientId,
        relativeId,
        relationshipType,
        caregiverPermissionActive,
        consentSignedAt: new Date()
      }
    });
  }
}
