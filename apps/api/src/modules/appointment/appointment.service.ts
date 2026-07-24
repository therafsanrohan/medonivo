import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createAppointment(
    tenantId: string | null,
    patientId: string,
    doctorProfileId: string,
    branchId: string,
    dateStr: string,
    startTime: string,
    endTime: string,
    serviceId?: string
  ) {
    const date = new Date(dateStr);

    // Verify patient profile belongs to tenant
    const patient = await this.prisma.patientProfile.findFirst({
      where: { id: patientId, user: { tenantId } }
    });
    if (!patient) {
      throw new NotFoundException('Patient profile not found under this tenant');
    }

    // Verify branch belongs to tenant
    const branch = await this.prisma.branch.findFirst({
      where: { id: branchId, organization: { tenantId: tenantId || undefined } }
    });
    if (!branch) {
      throw new NotFoundException('Branch not found under this tenant');
    }

    // Check for duplicate booking at the same slot
    const duplicateApp = await this.prisma.appointment.findFirst({
      where: {
        doctorProfileId,
        appointmentDate: date,
        startTime,
        status: { in: ['PENDING', 'CHECKED_IN'] }
      }
    });

    if (duplicateApp) {
      throw new ConflictException('This booking slot is already reserved');
    }

    return this.prisma.appointment.create({
      data: {
        patientId,
        doctorProfileId,
        branchId,
        serviceId: serviceId || null,
        appointmentDate: date,
        startTime,
        endTime,
        status: 'PENDING'
      }
    });
  }

  async checkIn(tenantId: string | null, appointmentId: string) {
    const app = await this.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        branch: { organization: { tenantId: tenantId || undefined } }
      },
      include: {
        doctorProfile: true
      }
    });

    if (!app) {
      throw new NotFoundException('Appointment not found or tenant context mismatch');
    }

    if (app.status !== 'PENDING') {
      throw new ConflictException(`Cannot check in appointment that is already ${app.status}`);
    }

    // Generate queue token (e.g. sequence ticket based on number of active tickets today for this doctor)
    const count = await this.prisma.appointment.count({
      where: {
        doctorProfileId: app.doctorProfileId,
        appointmentDate: app.appointmentDate,
        status: 'CHECKED_IN'
      }
    });

    const queueToken = `T-${101 + count}`;

    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CHECKED_IN',
        queueToken,
        checkedInAt: new Date()
      }
    });
  }

  async getLiveQueue(tenantId: string | null, branchId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        branchId,
        appointmentDate: today,
        status: 'CHECKED_IN',
        branch: { organization: { tenantId: tenantId || undefined } }
      },
      include: {
        patient: {
          include: {
            user: true
          }
        },
        doctorProfile: {
          include: {
            staffProfile: {
              include: {
                user: true
              }
            }
          }
        }
      },
      orderBy: {
        checkedInAt: 'asc'
      }
    });

    // Estimate waiting time (15 mins per patient in queue)
    return appointments.map((app, index) => {
      const waitTimeMinutes = index * 15;
      return {
        id: app.id,
        patientName: app.patient.user.fullName,
        doctorName: app.doctorProfile.staffProfile.user.fullName,
        queueToken: app.queueToken,
        checkedInAt: app.checkedInAt,
        estimatedWaitTimeMinutes: waitTimeMinutes
      };
    });
  }
}
