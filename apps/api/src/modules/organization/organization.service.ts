import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  private async getOrCreatePrimaryOrganization(tenantId: string) {
    let org = await this.prisma.organization.findFirst({
      where: { tenantId }
    });

    if (!org) {
      org = await this.prisma.organization.create({
        data: {
          tenantId,
          name: 'Primary Organization',
          code: 'ORG'
        }
      });
    }

    return org;
  }

  async createBranch(tenantId: string, name: string, code: string, address?: string) {
    const org = await this.getOrCreatePrimaryOrganization(tenantId);

    const existingBranch = await this.prisma.branch.findUnique({
      where: {
        organizationId_code: {
          organizationId: org.id,
          code
        }
      }
    });

    if (existingBranch) {
      throw new ConflictException(`Branch with code "${code}" already exists in this organization`);
    }

    return this.prisma.branch.create({
      data: {
        organizationId: org.id,
        name,
        code,
        address
      }
    });
  }

  async getBranches(tenantId: string) {
    const org = await this.getOrCreatePrimaryOrganization(tenantId);
    return this.prisma.branch.findMany({
      where: { organizationId: org.id },
      include: {
        departments: true,
        rooms: true,
        operatingHours: true
      }
    });
  }

  async createDepartment(tenantId: string, branchId: string, name: string, code: string) {
    // Verify branch belongs to tenant organization
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      include: { organization: true }
    });

    if (!branch || branch.organization.tenantId !== tenantId) {
      throw new NotFoundException('Branch not found or tenant context mismatch');
    }

    const existingDept = await this.prisma.department.findUnique({
      where: {
        branchId_code: {
          branchId,
          code
        }
      }
    });

    if (existingDept) {
      throw new ConflictException(`Department with code "${code}" already exists in this branch`);
    }

    return this.prisma.department.create({
      data: {
        branchId,
        name,
        code
      }
    });
  }

  async createRoom(tenantId: string, branchId: string, name: string, code: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      include: { organization: true }
    });

    if (!branch || branch.organization.tenantId !== tenantId) {
      throw new NotFoundException('Branch not found or tenant context mismatch');
    }

    const existingRoom = await this.prisma.room.findUnique({
      where: {
        branchId_code: {
          branchId,
          code
        }
      }
    });

    if (existingRoom) {
      throw new ConflictException(`Room with code "${code}" already exists in this branch`);
    }

    return this.prisma.room.create({
      data: {
        branchId,
        name,
        code
      }
    });
  }

  async configureOperatingHours(
    tenantId: string,
    branchId: string,
    hours: Array<{ dayOfWeek: number; openTime: string; closeTime: string; isClosed?: boolean }>
  ) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      include: { organization: true }
    });

    if (!branch || branch.organization.tenantId !== tenantId) {
      throw new NotFoundException('Branch not found or tenant context mismatch');
    }

    // Process each day in a transaction
    return this.prisma.$transaction(
      hours.map((h) =>
        this.prisma.operatingHour.upsert({
          where: {
            branchId_dayOfWeek: {
              branchId,
              dayOfWeek: h.dayOfWeek
            }
          },
          update: {
            openTime: h.openTime,
            closeTime: h.closeTime,
            isClosed: h.isClosed ?? false
          },
          create: {
            branchId,
            dayOfWeek: h.dayOfWeek,
            openTime: h.openTime,
            closeTime: h.closeTime,
            isClosed: h.isClosed ?? false
          }
        })
      )
    );
  }

  async createService(tenantId: string, name: string, code: string, basePrice: number) {
    const existingService = await this.prisma.service.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code
        }
      }
    });

    if (existingService) {
      throw new ConflictException(`Service with code "${code}" already exists in this tenant`);
    }

    return this.prisma.service.create({
      data: {
        tenantId,
        name,
        code,
        basePrice
      }
    });
  }

  async getServices(tenantId: string) {
    return this.prisma.service.findMany({
      where: { tenantId, isActive: true }
    });
  }

  async createStaffInvitation(tenantId: string, email: string, roleCode: string, phoneNumber?: string) {
    // Resolve role id
    const role = await this.prisma.role.findUnique({
      where: { code: roleCode }
    });

    if (!role) {
      throw new NotFoundException(`Role with code "${roleCode}" not found`);
    }

    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour expiration

    return this.prisma.staffInvitation.create({
      data: {
        tenantId,
        email,
        phoneNumber,
        roleId: role.id,
        token,
        status: 'PENDING',
        expiresAt
      }
    });
  }
}
