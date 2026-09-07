export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // Self, Spouse, Father, Mother, Child
  age: number;
  gender: string;
  bloodGroup: string;
  avatar: string;
  carePassPlan: string;
  includedConsultations: number;
  diagnosticDiscountPercent: number;
  emergencyContact: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface CareLoopTask {
  id: string;
  title: string;
  type: 'consultation' | 'medication' | 'lab_test' | 'report_upload' | 'doctor_review';
  dueDate: string;
  status: 'completed' | 'due_today' | 'overdue' | 'upcoming';
  assignee: string;
  notes?: string;
  actionUrl?: string;
}

export interface CareLoop {
  id: string;
  memberId: string;
  title: string;
  doctorName: string;
  doctorSpecialty: string;
  startDate: string;
  expectedEndDate: string;
  progressPercent: number;
  status: 'active' | 'completed';
  tasks: CareLoopTask[];
}

export interface MedicineItem {
  id: string;
  memberId: string;
  name: string;
  dosage: string; // e.g. "1 Tablet"
  frequency: string; // e.g. "Twice Daily (After Food)"
  timing: ('morning' | 'afternoon' | 'evening' | 'night')[];
  prescribedBy: string;
  takenToday: boolean;
  streakDays: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  branch: string;
  avatarUrl: string;
  consultationFee: number;
  availableDays: string[];
  availableSlots: string[];
}

export interface HealthRecord {
  id: string;
  memberId: string;
  title: string;
  category: 'prescription' | 'lab_report' | 'hospital_summary' | 'vaccination';
  date: string;
  doctorName?: string;
  facilityName: string;
  fileUrl?: string;
  fileSize?: string;
}

export const initialFamilyMembers: FamilyMember[] = [
  {
    id: 'mem_self',
    name: 'Arman Hossain',
    relation: 'Self',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    avatar: 'AH',
    carePassPlan: 'CarePass Platinum',
    includedConsultations: 4,
    diagnosticDiscountPercent: 20,
    emergencyContact: '+880 1711-223344 (Wife)',
    allergies: ['Penicillin'],
    chronicConditions: ['Hypertension']
  },
  {
    id: 'mem_father',
    name: 'Jahangir Hossain',
    relation: 'Father',
    age: 68,
    gender: 'Male',
    bloodGroup: 'O+',
    avatar: 'JH',
    carePassPlan: 'CarePass Senior Gold',
    includedConsultations: 6,
    diagnosticDiscountPercent: 25,
    emergencyContact: '+880 1819-556677 (Son)',
    allergies: ['Sulfa Drugs', 'Dust'],
    chronicConditions: ['Type-2 Diabetes', 'Coronary Artery Disease']
  },
  {
    id: 'mem_mother',
    name: 'Suraiya Begum',
    relation: 'Mother',
    age: 62,
    gender: 'Female',
    bloodGroup: 'A+',
    avatar: 'SB',
    carePassPlan: 'CarePass Senior Gold',
    includedConsultations: 6,
    diagnosticDiscountPercent: 25,
    emergencyContact: '+880 1819-556677 (Son)',
    allergies: ['Aspirin'],
    chronicConditions: ['Osteoarthritis']
  },
  {
    id: 'mem_child',
    name: 'Riya Hossain',
    relation: 'Daughter',
    age: 6,
    gender: 'Female',
    bloodGroup: 'B+',
    avatar: 'RH',
    carePassPlan: 'CarePass Junior',
    includedConsultations: 3,
    diagnosticDiscountPercent: 15,
    emergencyContact: '+880 1711-223344 (Father)',
    allergies: ['Peanuts'],
    chronicConditions: ['Mild Asthma']
  }
];

export const initialCareLoops: CareLoop[] = [
  {
    id: 'cl_101',
    memberId: 'mem_father',
    title: 'Post-Angioplasty Recovery & Cardiac Rehab',
    doctorName: 'Dr. Prof. Shamsul Huda',
    doctorSpecialty: 'Cardiology',
    startDate: '2026-08-15',
    expectedEndDate: '2026-09-30',
    progressPercent: 70,
    status: 'active',
    tasks: [
      {
        id: 't_1',
        title: 'Initial Post-Op Consultation',
        type: 'consultation',
        dueDate: '2026-08-15',
        status: 'completed',
        assignee: 'Dr. Prof. Shamsul Huda',
        notes: 'Stent placement successful. Prescribed antiplatelet therapy.'
      },
      {
        id: 't_2',
        title: 'Complete Blood Count & Lipid Profile',
        type: 'lab_test',
        dueDate: '2026-09-01',
        status: 'completed',
        assignee: 'Dhanmondi Central Lab'
      },
      {
        id: 't_3',
        title: 'Upload Lipid Profile Report',
        type: 'report_upload',
        dueDate: '2026-09-02',
        status: 'completed',
        assignee: 'Patient / Family'
      },
      {
        id: 't_4',
        title: 'Echocardiogram (Echo) Follow-up',
        type: 'lab_test',
        dueDate: '2026-09-07',
        status: 'due_today',
        assignee: 'Dhanmondi Branch'
      },
      {
        id: 't_5',
        title: 'Doctor Review & Medication Adjustment',
        type: 'doctor_review',
        dueDate: '2026-09-10',
        status: 'upcoming',
        assignee: 'Dr. Prof. Shamsul Huda'
      }
    ]
  },
  {
    id: 'cl_102',
    memberId: 'mem_self',
    title: 'Hypertension Management & Lifestyle Program',
    doctorName: 'Dr. Farhana Yasmin',
    doctorSpecialty: 'Internal Medicine',
    startDate: '2026-09-01',
    expectedEndDate: '2026-10-01',
    progressPercent: 40,
    status: 'active',
    tasks: [
      {
        id: 't_10',
        title: 'Routine BP Baseline Check',
        type: 'consultation',
        dueDate: '2026-09-01',
        status: 'completed',
        assignee: 'Dr. Farhana Yasmin'
      },
      {
        id: 't_11',
        title: 'Daily BP Reading Logging (Week 1)',
        type: 'medication',
        dueDate: '2026-09-06',
        status: 'completed',
        assignee: 'Patient'
      },
      {
        id: 't_12',
        title: 'Kidney Function & Electrolyte Test',
        type: 'lab_test',
        dueDate: '2026-09-05',
        status: 'overdue',
        assignee: 'Patient / Family'
      }
    ]
  }
];

export const initialMedicines: MedicineItem[] = [
  {
    id: 'med_1',
    memberId: 'mem_self',
    name: 'Telmisartan 40mg',
    dosage: '1 Tablet',
    frequency: 'Once Daily (Morning)',
    timing: ['morning'],
    prescribedBy: 'Dr. Farhana Yasmin',
    takenToday: true,
    streakDays: 14
  },
  {
    id: 'med_2',
    memberId: 'mem_self',
    name: 'Rosuvastatin 10mg',
    dosage: '1 Tablet',
    frequency: 'Once Daily (Night)',
    timing: ['night'],
    prescribedBy: 'Dr. Farhana Yasmin',
    takenToday: false,
    streakDays: 12
  },
  {
    id: 'med_3',
    memberId: 'mem_father',
    name: 'Clopidogrel 75mg',
    dosage: '1 Tablet',
    frequency: 'Once Daily (After Lunch)',
    timing: ['afternoon'],
    prescribedBy: 'Dr. Prof. Shamsul Huda',
    takenToday: false,
    streakDays: 22
  },
  {
    id: 'med_4',
    memberId: 'mem_father',
    name: 'Metformin 500mg XR',
    dosage: '1 Tablet',
    frequency: 'Twice Daily (Breakfast & Dinner)',
    timing: ['morning', 'night'],
    prescribedBy: 'Dr. Nusrat Jahan',
    takenToday: true,
    streakDays: 45
  }
];

export const initialDoctors: Doctor[] = [
  {
    id: 'doc_1',
    name: 'Dr. Prof. Shamsul Huda',
    specialty: 'Cardiology',
    qualification: 'MBBS, FCPS (Cardiology), FACC (USA)',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 340,
    branch: 'Dhanmondi Branch',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    consultationFee: 1500,
    availableDays: ['Mon', 'Wed', 'Sat'],
    availableSlots: ['04:00 PM', '04:30 PM', '05:00 PM', '06:00 PM']
  },
  {
    id: 'doc_2',
    name: 'Dr. Farhana Yasmin',
    specialty: 'Internal Medicine',
    qualification: 'MBBS, MD (Medicine), MRCP (UK)',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 195,
    branch: 'Uttara Branch',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&w=200&q=80',
    consultationFee: 1200,
    availableDays: ['Sun', 'Tue', 'Thu'],
    availableSlots: ['10:00 AM', '11:00 AM', '03:00 PM', '03:30 PM']
  },
  {
    id: 'doc_3',
    name: 'Dr. Tanvir Ahmed',
    specialty: 'Pediatrics & Child Health',
    qualification: 'MBBS, DCH, FCPS (Pediatrics)',
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 280,
    branch: 'Banani Branch',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    consultationFee: 1000,
    availableDays: ['Everyday'],
    availableSlots: ['05:00 PM', '05:30 PM', '06:30 PM']
  },
  {
    id: 'doc_4',
    name: 'Dr. Nusrat Jahan',
    specialty: 'Endocrinology & Diabetes',
    qualification: 'MBBS, DEM (BIRDEM), MD (Endocrinology)',
    experienceYears: 16,
    rating: 4.7,
    reviewCount: 150,
    branch: 'Dhanmondi Branch',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    consultationFee: 1300,
    availableDays: ['Mon', 'Thu', 'Sat'],
    availableSlots: ['06:00 PM', '07:00 PM', '07:30 PM']
  }
];

export const initialHealthRecords: HealthRecord[] = [
  {
    id: 'rec_1',
    memberId: 'mem_father',
    title: 'Lipid Profile & HbA1c Lab Report',
    category: 'lab_report',
    date: '2026-09-02',
    doctorName: 'Dr. Prof. Shamsul Huda',
    facilityName: 'Dhanmondi Central Diagnostics',
    fileSize: '1.4 MB'
  },
  {
    id: 'rec_2',
    memberId: 'mem_father',
    title: 'Post-Angioplasty Discharge Summary',
    category: 'hospital_summary',
    date: '2026-08-15',
    doctorName: 'Dr. Prof. Shamsul Huda',
    facilityName: 'Medonivo Cardiac Center',
    fileSize: '3.2 MB'
  },
  {
    id: 'rec_3',
    memberId: 'mem_self',
    title: 'Hypertension Consultation Prescription',
    category: 'prescription',
    date: '2026-09-01',
    doctorName: 'Dr. Farhana Yasmin',
    facilityName: 'Medonivo Uttara Clinic',
    fileSize: '850 KB'
  },
  {
    id: 'rec_4',
    memberId: 'mem_child',
    title: 'Pediatric Vaccination Certificate (MMR Booster)',
    category: 'vaccination',
    date: '2026-06-10',
    doctorName: 'Dr. Tanvir Ahmed',
    facilityName: 'Medonivo Banani Clinic',
    fileSize: '1.1 MB'
  }
];
