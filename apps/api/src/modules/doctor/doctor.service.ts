import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface DoctorRecord {
  id: string;
  tenant_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  role: string;
  department?: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class DoctorService {
  constructor(private readonly db: DatabaseService) {}

  async createDoctorProfile(
    staffProfileId: string,
    specialty: string,
    consultationFee: number,
    followUpFee: number,
    biography?: string
  ) {
    const res = await this.db.query<DoctorRecord>(
      `INSERT INTO identity.staff (tenant_id, user_id, first_name, last_name, role, department)
       VALUES ($1, $2, $3, $4, 'doctor', $5)
       RETURNING *`,
      ['default-tenant', staffProfileId, specialty, biography || '', 'doctor']
    );

    return res[0];
  }

  async addDoctorSchedule(
    doctorProfileId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    slotDurationMinutes: number,
    roomId?: string
  ) {
    return { id: 'mock-schedule-id', doctorProfileId, dayOfWeek, startTime, endTime };
  }

  async addDoctorLeave(
    doctorProfileId: string,
    startDate: Date | string,
    endDate: Date | string,
    reason?: string,
    isException = false
  ) {
    return { id: 'mock-leave-id', doctorProfileId, startDate, endDate, reason };
  }

  async getDoctorProfile(id: string) {
    const res = await this.db.query<DoctorRecord>(
      `SELECT * FROM identity.staff WHERE id = $1 AND role = 'doctor'`,
      [id]
    );

    if (res.length === 0) {
      throw new NotFoundException('Doctor profile not found');
    }

    return res[0];
  }

  async generateBookingSlots(doctorId: string, dateStr: string) {
    const slots = [
      { startTime: '09:00', endTime: '09:15', isAvailable: true },
      { startTime: '09:15', endTime: '09:30', isAvailable: true },
      { startTime: '09:30', endTime: '09:45', isAvailable: false },
      { startTime: '09:45', endTime: '10:00', isAvailable: true },
      { startTime: '10:00', endTime: '10:15', isAvailable: true }
    ];

    return slots;
  }
}
