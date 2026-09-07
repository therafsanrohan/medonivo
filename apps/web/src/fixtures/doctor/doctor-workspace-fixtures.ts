export interface QueuePatient {
  id: string;
  token: string;
  patientName: string;
  age: number;
  gender: string;
  mrnPhone: string;
  chiefComplaint: string;
  carePassStatus: 'active' | 'platinum' | 'senior' | 'none';
  carePassLabel: string;
  queueStatus: 'waiting' | 'in_consultation' | 'completed';
  queueStatusLabel: string;
  arrivalTime: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface PrescribedMedicine {
  id: string;
  name: string;
  dosage: string; // e.g. "40mg"
  timing: string; // e.g. "1-0-1" (Morning-Afternoon-Night)
  foodRelation: 'Before Food' | 'After Food' | 'With Food';
  durationDays: number;
  instructions?: string;
}

export interface ConsultationRecord {
  id: string;
  queueId: string;
  patientName: string;
  date: string;
  vitals: {
    bpSystolic: number;
    bpDiastolic: number;
    pulse: number;
    weightKg: number;
    spo2: number;
    tempF: number;
  };
  clinicalNotes: string;
  diagnosis: string;
  medicines: PrescribedMedicine[];
  recommendedTests: string[];
  followUpDate: string;
  careLoopCreated: boolean;
}

export interface PendingReport {
  id: string;
  patientName: string;
  testTitle: string;
  category: string;
  submittedDate: string;
  facility: string;
  status: 'pending_review' | 'reviewed';
  doctorNote?: string;
  urgency: 'high' | 'normal';
}

export interface DoctorMessageThread {
  id: string;
  patientName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  relatedCareLoop?: string;
}

export interface ChamberSchedule {
  branch: string;
  days: string[];
  hours: string;
  slotDurationMinutes: number;
  maxPatientsPerDay: number;
  isAcceptingBookings: boolean;
}

export const initialQueueList: QueuePatient[] = [
  {
    id: 'q_1',
    token: 'A-14',
    patientName: 'Jahangir Hossain',
    age: 68,
    gender: 'Male',
    mrnPhone: '+880 1819-556677',
    chiefComplaint: 'Post-Angioplasty follow-up, mild shortness of breath on exertion',
    carePassStatus: 'senior',
    carePassLabel: 'CarePass Senior Gold',
    queueStatus: 'in_consultation',
    queueStatusLabel: 'In Consultation',
    arrivalTime: '04:15 PM',
    allergies: ['Sulfa Drugs', 'Dust'],
    chronicConditions: ['Type-2 Diabetes', 'Coronary Artery Disease', 'Hypertension']
  },
  {
    id: 'q_2',
    token: 'A-15',
    patientName: 'Arman Hossain',
    age: 34,
    gender: 'Male',
    mrnPhone: '+880 1711-223344',
    chiefComplaint: 'Routine BP checkup and prescription refill',
    carePassStatus: 'platinum',
    carePassLabel: 'CarePass Platinum',
    queueStatus: 'waiting',
    queueStatusLabel: 'Waiting in Chamber',
    arrivalTime: '04:30 PM',
    allergies: ['Penicillin'],
    chronicConditions: ['Hypertension']
  },
  {
    id: 'q_3',
    token: 'A-16',
    patientName: 'Suraiya Begum',
    age: 62,
    gender: 'Female',
    mrnPhone: '+880 1819-556677',
    chiefComplaint: 'Joint stiffness in knees, elevated morning blood sugar',
    carePassStatus: 'senior',
    carePassLabel: 'CarePass Senior Gold',
    queueStatus: 'waiting',
    queueStatusLabel: 'Waiting in Chamber',
    arrivalTime: '04:45 PM',
    allergies: ['Aspirin'],
    chronicConditions: ['Osteoarthritis', 'Prediabetes']
  },
  {
    id: 'q_4',
    token: 'A-17',
    patientName: 'Tanvir Rahman',
    age: 45,
    gender: 'Male',
    mrnPhone: '+880 1912-334455',
    chiefComplaint: 'Chest tightness after heavy meals, acid reflux',
    carePassStatus: 'active',
    carePassLabel: 'CarePass Active',
    queueStatus: 'waiting',
    queueStatusLabel: 'Waiting in Chamber',
    arrivalTime: '05:00 PM',
    allergies: [],
    chronicConditions: ['GERD']
  }
];

export const initialPendingReports: PendingReport[] = [
  {
    id: 'rep_1',
    patientName: 'Jahangir Hossain',
    testTitle: 'Lipid Profile & HbA1c Panel',
    category: 'Biochemistry',
    submittedDate: '2026-09-02',
    facility: 'Dhanmondi Central Lab',
    status: 'pending_review',
    urgency: 'high'
  },
  {
    id: 'rep_2',
    patientName: 'Arman Hossain',
    testTitle: '24-Hour Ambulatory Blood Pressure Monitor',
    category: 'Cardiology',
    submittedDate: '2026-09-04',
    facility: 'Uttara Branch Diagnostics',
    status: 'pending_review',
    urgency: 'normal'
  },
  {
    id: 'rep_3',
    patientName: 'Suraiya Begum',
    testTitle: 'Knee Joint X-Ray & Uric Acid Test',
    category: 'Radiology',
    submittedDate: '2026-09-05',
    facility: 'Dhanmondi Central Lab',
    status: 'reviewed',
    doctorNote: 'Mild degenerative osteophytes visible. Continue joint supplements.',
    urgency: 'normal'
  }
];

export const initialDoctorMessages: DoctorMessageThread[] = [
  {
    id: 'msg_1',
    patientName: 'Jahangir Hossain',
    lastMessage: 'Doctor, should I take Clopidogrel before or after lunch?',
    timestamp: '10 mins ago',
    unreadCount: 1,
    relatedCareLoop: 'Post-Angioplasty Recovery'
  },
  {
    id: 'msg_2',
    patientName: 'Arman Hossain',
    lastMessage: 'My BP reading this morning was 132/84 mmHg.',
    timestamp: '2 hours ago',
    unreadCount: 0,
    relatedCareLoop: 'Hypertension Management'
  }
];

export const initialSchedules: ChamberSchedule[] = [
  {
    branch: 'Dhanmondi Branch',
    days: ['Mon', 'Wed', 'Sat'],
    hours: '04:00 PM - 08:00 PM',
    slotDurationMinutes: 15,
    maxPatientsPerDay: 20,
    isAcceptingBookings: true
  },
  {
    branch: 'Uttara Branch',
    days: ['Sun', 'Tue', 'Thu'],
    hours: '10:00 AM - 02:00 PM',
    slotDurationMinutes: 20,
    maxPatientsPerDay: 15,
    isAcceptingBookings: true
  }
];

export const availableMedicineDatabase = [
  'Telmisartan 40mg',
  'Telmisartan 80mg',
  'Rosuvastatin 10mg',
  'Rosuvastatin 20mg',
  'Clopidogrel 75mg',
  'Aspirin 75mg (Ecosprin)',
  'Metformin 500mg XR',
  'Metformin 850mg',
  'Bisoprolol 2.5mg',
  'Bisoprolol 5mg',
  'Omeprazole 20mg (Seclo)',
  'Esomeprazole 20mg',
  'Atorvastatin 10mg',
  'Montelukast 10mg'
];
