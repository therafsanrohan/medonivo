export interface WorkspaceQueueItemFixture {
  id: string;
  token: string;
  patientName: string;
  mrnPhone: string;
  carePassStatus: 'success' | 'warning' | 'neutral' | 'info';
  carePassLabel: string;
  queueStatus: 'warning' | 'info' | 'success';
  queueStatusLabel: string;
}

export interface WorkspaceMetricsFixture {
  totalAppointments: number;
  activeWaitingQueue: number;
  completedConsultations: number;
  carePassVerified: number;
}

export const mockWorkspaceMetrics: WorkspaceMetricsFixture = {
  totalAppointments: 48,
  activeWaitingQueue: 12,
  completedConsultations: 29,
  carePassVerified: 18
};

export const mockQueueList: WorkspaceQueueItemFixture[] = [
  {
    id: 'q_1',
    token: 'A-14',
    patientName: 'Rafsan Hasan',
    mrnPhone: 'MRN-90218 - +8801700...',
    carePassStatus: 'success',
    carePassLabel: 'Active (Silver)',
    queueStatus: 'warning',
    queueStatusLabel: 'Waiting in Chamber'
  },
  {
    id: 'q_2',
    token: 'A-15',
    patientName: 'Sultana Parveen',
    mrnPhone: 'MRN-90219 - +8801800...',
    carePassStatus: 'neutral',
    carePassLabel: 'Non-Member',
    queueStatus: 'info',
    queueStatusLabel: 'Checked In'
  }
];
