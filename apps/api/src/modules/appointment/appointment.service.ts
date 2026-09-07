import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface AppointmentRecord {
  id: string;
  tenant_id: string;
  branch_id: string;
  patient_id: string;
  doctor_id: string;
  appointment_time: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class AppointmentService {
  constructor(private readonly db: DatabaseService) {}

  async createAppointment(
    tenantId: string | null,
    patientId: string,
    doctorId: string,
    branchId: string,
    appointmentTime: string,
    type = 'consultation'
  ) {
    // 1. Verify patient exists
    const patients = await this.db.query<{ id: string }>(
      'SELECT id FROM patient.patients WHERE id = $1',
      [patientId]
    );
    if (patients.length === 0) {
      throw new NotFoundException('Patient profile not found');
    }

    // 2. Check for duplicate booking
    const duplicates = await this.db.query<{ id: string }>(
      `SELECT id FROM scheduling.appointments 
       WHERE doctor_id = $1 AND appointment_time = $2 AND status IN ('scheduled', 'checked_in')`,
      [doctorId, appointmentTime]
    );

    if (duplicates.length > 0) {
      throw new ConflictException('This booking slot is already reserved');
    }

    // 3. Insert appointment
    const res = await this.db.query<AppointmentRecord>(
      `INSERT INTO scheduling.appointments (tenant_id, branch_id, patient_id, doctor_id, appointment_time, status, type)
       VALUES ($1, $2, $3, $4, $5, 'scheduled', $6)
       RETURNING *`,
      [tenantId, branchId, patientId, doctorId, appointmentTime, type]
    );

    return res[0];
  }

  async checkIn(tenantId: string | null, appointmentId: string) {
    const apps = await this.db.query<AppointmentRecord>(
      'SELECT * FROM scheduling.appointments WHERE id = $1',
      [appointmentId]
    );

    if (apps.length === 0) {
      throw new NotFoundException('Appointment not found');
    }

    const app = apps[0];
    if (app.status !== 'scheduled') {
      throw new ConflictException(`Cannot check in appointment that is already ${app.status}`);
    }

    // Update appointment status to checked_in
    const updated = await this.db.query<AppointmentRecord>(
      `UPDATE scheduling.appointments SET status = 'checked_in', updated_at = NOW() WHERE id = $1 RETURNING *`,
      [appointmentId]
    );

    return updated[0];
  }

  async getLiveQueue(tenantId: string | null, branchId: string) {
    return this.db.query(
      `SELECT a.id, a.appointment_time, a.status, 
              p.first_name || ' ' || p.last_name as patient_name,
              s.first_name || ' ' || s.last_name as doctor_name
       FROM scheduling.appointments a
       JOIN patient.patients p ON a.patient_id = p.id
       JOIN identity.staff s ON a.doctor_id = s.id
       WHERE a.branch_id = $1 AND a.status = 'checked_in'
       ORDER BY a.appointment_time ASC`,
      [branchId]
    );
  }
}
