import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async createDoctorProfile(
    staffProfileId: string,
    specialty: string,
    consultationFee: number,
    followUpFee: number,
    biography?: string
  ) {
    const staff = await this.prisma.staffProfile.findUnique({
      where: { id: staffProfileId }
    });

    if (!staff) {
      throw new NotFoundException('Staff profile not found');
    }

    const existingProfile = await this.prisma.doctorProfile.findUnique({
      where: { staffProfileId }
    });

    if (existingProfile) {
      throw new ConflictException('Doctor profile already configured for this staff member');
    }

    return this.prisma.doctorProfile.create({
      data: {
        staffProfileId,
        specialty,
        consultationFee,
        followUpFee,
        biography
      }
    });
  }

  async addDoctorSchedule(
    doctorProfileId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    slotDurationMinutes: number,
    roomId?: string
  ) {
    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: doctorProfileId }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return this.prisma.doctorSchedule.create({
      data: {
        doctorProfileId,
        dayOfWeek,
        startTime,
        endTime,
        slotDurationMinutes,
        roomId
      }
    });
  }

  async addDoctorLeave(
    doctorProfileId: string,
    startDate: Date | string,
    endDate: Date | string,
    reason?: string,
    isException = false
  ) {
    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: doctorProfileId }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return this.prisma.doctorLeave.create({
      data: {
        doctorProfileId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        isException
      }
    });
  }

  async generateBookingSlots(doctorProfileId: string, dateStr: string) {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: doctorProfileId },
      include: {
        schedules: {
          where: { dayOfWeek }
        },
        leaves: {
          where: {
            startDate: { lte: date },
            endDate: { gte: date }
          }
        },
        appointments: {
          where: {
            appointmentDate: date,
            status: { in: ['PENDING', 'CHECKED_IN'] }
          }
        }
      }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    // Check if doctor has a full day off (leave where isException = false)
    const fullDayLeave = doctor.leaves.some((l) => !l.isException);
    if (fullDayLeave) {
      return [];
    }

    const slots: Array<{ startTime: string; endTime: string; isAvailable: boolean }> = [];

    for (const schedule of doctor.schedules) {
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);

      let current = new Date(date);
      current.setHours(startHour, startMin, 0, 0);

      const end = new Date(date);
      end.setHours(endHour, endMin, 0, 0);

      while (current < end) {
        const next = new Date(current.getTime() + schedule.slotDurationMinutes * 60 * 1000);
        if (next > end) break;

        const startTimeStr = current.toTimeString().slice(0, 5);
        const endTimeStr = next.toTimeString().slice(0, 5);

        // Check if slot overlaps with an exception leave
        const isExcluded = doctor.leaves.some((leave) => {
          if (!leave.isException) return false;
          // check if current time overlaps leave hours
          return current >= leave.startDate && next <= leave.endDate;
        });

        // Check if slot has an existing booking
        const isBooked = doctor.appointments.some((app) => app.startTime === startTimeStr);

        slots.push({
          startTime: startTimeStr,
          endTime: endTimeStr,
          isAvailable: !isExcluded && !isBooked
        });

        current = next;
      }
    }

    return slots;
  }
}
