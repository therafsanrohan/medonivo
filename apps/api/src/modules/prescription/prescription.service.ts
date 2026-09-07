import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface PrescriptionItemDto {
  medicineName: string;
  dosage: string;
  duration: string;
  instructions?: string;
}

export interface CreatePrescriptionDto {
  patientId: string;
  doctorId: string;
  branchId: string;
  appointmentId?: string;
  diagnosis?: string;
  chiefComplaints?: string;
  vitalsBp?: string;
  vitalsPulse?: number;
  vitalsWeightKg?: number;
  items: PrescriptionItemDto[];
}

@Injectable()
export class PrescriptionService {
  constructor(private readonly db: DatabaseService) {}

  async createPrescription(tenantId: string, dto: CreatePrescriptionDto) {
    const rxRows = await this.db.query<any>(
      `INSERT INTO clinical.prescriptions
       (tenant_id, branch_id, patient_id, doctor_id, appointment_id, diagnosis, chief_complaints, vitals_bp, vitals_pulse, vitals_weight_kg, doctor_signature)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        tenantId,
        dto.branchId,
        dto.patientId,
        dto.doctorId,
        dto.appointmentId || null,
        dto.diagnosis || 'Essential Hypertension',
        dto.chiefComplaints || 'Headache, Fatigue',
        dto.vitalsBp || '120/80',
        dto.vitalsPulse || 72,
        dto.vitalsWeightKg || 68.5,
        `DIGITAL_SIG_${Date.now()}`
      ]
    );

    const prescription = rxRows[0];

    for (const item of dto.items) {
      await this.db.query(
        `INSERT INTO clinical.prescription_items
         (prescription_id, medicine_name, dosage, duration, instructions)
         VALUES ($1, $2, $3, $4, $5)`,
        [prescription.id, item.medicineName, item.dosage, item.duration, item.instructions || 'After meals']
      );
    }

    return {
      ...prescription,
      items: dto.items
    };
  }

  async getPatientPrescriptions(tenantId: string, patientId: string) {
    const rows = await this.db.query<any>(
      `SELECT * FROM clinical.prescriptions WHERE patient_id = $1 AND tenant_id = $2 ORDER BY created_at DESC`,
      [patientId, tenantId]
    );

    return rows;
  }
}
