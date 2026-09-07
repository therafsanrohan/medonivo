export interface CareUserFixture {
  name: string;
  carePassPlan: string;
  includedConsultations: number;
  diagnosticDiscountPercent: number;
}

export interface UpcomingAppointmentFixture {
  id: string;
  doctorName: string;
  specialty: string;
  branchName: string;
  queueToken: string;
  appointmentTime: string;
  estimatedWaitMinutes: number;
}

export const mockCareUser: CareUserFixture = {
  name: 'Patient Family',
  carePassPlan: 'CarePass Active (Silver)',
  includedConsultations: 2,
  diagnosticDiscountPercent: 15
};

export const mockUpcomingAppointments: UpcomingAppointmentFixture[] = [
  {
    id: 'apt_101',
    doctorName: 'Dr. Arman Hossain',
    specialty: 'Cardiology',
    branchName: 'Central Dhaka Branch',
    queueToken: 'A-14',
    appointmentTime: 'Today at 04:30 PM',
    estimatedWaitMinutes: 15
  }
];
