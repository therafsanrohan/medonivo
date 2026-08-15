import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface PatientRecord {
  id: string;
  tenant_id: string;
  mrn: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  carepass_status?: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class PatientService {
  constructor(private readonly db: DatabaseService) {}

  private generateMRN(): string {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
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
    }
  ) {
    const [firstName, ...lastNameParts] = input.fullName.split(' ');
    const lastName = lastNameParts.join(' ') || 'N/A';
    const dob = new Date(input.dateOfBirth).toISOString().slice(0, 10);

    const existing = await this.db.query<{ id: string }>(
      'SELECT id FROM patient.patients WHERE phone = $1',
      [input.phoneNumber]
    );

    if (existing.length > 0) {
      throw new ConflictException('A patient with this phone number already exists');
    }

    const mrn = this.generateMRN();

    const created = await this.db.query<PatientRecord>(
      `INSERT INTO patient.patients (tenant_id, mrn, first_name, last_name, phone, email, date_of_birth, gender, blood_group)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        tenantId,
        mrn,
        firstName,
        lastName,
        input.phoneNumber,
        input.email || null,
        dob,
        input.gender,
        input.bloodGroup || null
      ]
    );

    return created[0];
  }

  async searchPatients(tenantId: string | null, query: string) {
    if (!query) return [];

    return this.db.query<PatientRecord>(
      `SELECT * FROM patient.patients 
       WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR phone ILIKE $1 OR mrn ILIKE $1`,
      [`%${query}%`]
    );
  }

  async getPatientProfile(tenantId: string | null, id: string) {
    const res = await this.db.query<PatientRecord>(
      'SELECT * FROM patient.patients WHERE id = $1',
      [id]
    );

    if (res.length === 0) {
      throw new NotFoundException('Patient profile not found');
    }

    return res[0];
  }

  async createFamilyRelationship(
    tenantId: string | null,
    patientId: string,
    relativeId: string,
    relationshipType: string,
    caregiverPermissionActive: boolean
  ) {
    return {
      id: 'mock-relationship-id',
      patientId,
      relativeId,
      relationshipType,
      caregiverPermissionActive
    };
  }
}
