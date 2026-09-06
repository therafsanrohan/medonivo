export interface OrgDoctor {
  id: string;
  name: string;
  specialty: string;
  regNumber: string;
  branch: string;
  department: string;
  status: 'active' | 'on_leave' | 'pending_verification';
  statusLabel: string;
  consultationFee: number;
  patientsThisMonth: number;
  bmdcVerified: boolean;
  avatarUrl?: string;
}

export interface CredentialReviewItem {
  id: string;
  doctorName: string;
  specialty: string;
  bmdcRegNumber: string;
  medicalCollege: string;
  gradYear: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    title: string;
    type: string;
    verified: boolean;
  }[];
  reviewNotes?: string;
}

export interface OrgDepartment {
  id: string;
  name: string;
  code: string;
  headDoctor: string;
  totalDoctors: number;
  activeChambers: number;
  bedCapacity: number;
  monthlyThroughput: number;
}

export interface BranchScheduleOverview {
  branchName: string;
  location: string;
  activeSessions: number;
  totalCapacityToday: number;
  checkedInToday: number;
  queueDelayMinutes: number;
  status: 'normal' | 'busy' | 'critical';
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Hospital Owner' | 'Clinical Director' | 'Credential Officer' | 'Desk Receptionist';
  department: string;
  assignedBranch: string;
  lastActive: string;
  status: 'active' | 'suspended';
}

export const initialOrgDoctors: OrgDoctor[] = [
  {
    id: 'doc_1',
    name: 'Prof. Dr. Arman Hossain',
    specialty: 'Senior Consultant Cardiology',
    regNumber: 'BMDC-A-48912',
    branch: 'Dhanmondi Central Campus',
    department: 'Cardiology',
    status: 'active',
    statusLabel: 'Active on Duty',
    consultationFee: 1500,
    patientsThisMonth: 340,
    bmdcVerified: true
  },
  {
    id: 'doc_2',
    name: 'Dr. Nusrat Jahan',
    specialty: 'Endocrinology & Diabetology',
    regNumber: 'BMDC-A-53210',
    branch: 'Uttara Branch',
    department: 'Endocrinology',
    status: 'active',
    statusLabel: 'Active on Duty',
    consultationFee: 1200,
    patientsThisMonth: 280,
    bmdcVerified: true
  },
  {
    id: 'doc_3',
    name: 'Dr. Shahriar Kabir',
    specialty: 'Orthopedics & Joint Replacement',
    regNumber: 'BMDC-A-61023',
    branch: 'Dhanmondi Central Campus',
    department: 'Orthopedics',
    status: 'on_leave',
    statusLabel: 'On Leave (Returns Sep 10)',
    consultationFee: 1400,
    patientsThisMonth: 190,
    bmdcVerified: true
  },
  {
    id: 'doc_4',
    name: 'Dr. Farhana Ahmed',
    specialty: 'Neurology & Stroke Medicine',
    regNumber: 'BMDC-A-72411',
    branch: 'Banani Specialty Wing',
    department: 'Neurology',
    status: 'pending_verification',
    statusLabel: 'Pending Credentials Check',
    consultationFee: 1300,
    patientsThisMonth: 0,
    bmdcVerified: false
  },
  {
    id: 'doc_5',
    name: 'Dr. Tanvir Chowdhury',
    specialty: 'General Pediatrics',
    regNumber: 'BMDC-A-39104',
    branch: 'Uttara Branch',
    department: 'Pediatrics',
    status: 'active',
    statusLabel: 'Active on Duty',
    consultationFee: 1000,
    patientsThisMonth: 410,
    bmdcVerified: true
  }
];

export const initialCredentialReviews: CredentialReviewItem[] = [
  {
    id: 'cred_101',
    doctorName: 'Dr. Farhana Ahmed',
    specialty: 'Neurology & Stroke Medicine',
    bmdcRegNumber: 'BMDC-A-72411',
    medicalCollege: 'Dhaka Medical College',
    gradYear: 2018,
    submittedDate: '2026-09-04',
    status: 'pending',
    documents: [
      { title: 'BMDC Permanent Registration Certificate', type: 'PDF', verified: true },
      { title: 'FCPS Neurology Part-2 Passing Certificate', type: 'PDF', verified: true },
      { title: 'NID Verification Card', type: 'IMAGE', verified: true }
    ]
  },
  {
    id: 'cred_102',
    doctorName: 'Dr. Mahmudul Hasan',
    specialty: 'Gastroenterology & Hepatology',
    bmdcRegNumber: 'BMDC-A-81204',
    medicalCollege: 'Chittagong Medical College',
    gradYear: 2019,
    submittedDate: '2026-09-05',
    status: 'pending',
    documents: [
      { title: 'BMDC Registration Copy', type: 'PDF', verified: true },
      { title: 'MD Thesis Certificate', type: 'PDF', verified: false }
    ]
  }
];

export const initialOrgDepartments: OrgDepartment[] = [
  {
    id: 'dept_1',
    name: 'Cardiology & Heart Failure',
    code: 'CARD',
    headDoctor: 'Prof. Dr. Arman Hossain',
    totalDoctors: 8,
    activeChambers: 4,
    bedCapacity: 60,
    monthlyThroughput: 1420
  },
  {
    id: 'dept_2',
    name: 'Endocrinology & Diabetology',
    code: 'ENDO',
    headDoctor: 'Dr. Nusrat Jahan',
    totalDoctors: 6,
    activeChambers: 3,
    bedCapacity: 30,
    monthlyThroughput: 980
  },
  {
    id: 'dept_3',
    name: 'Orthopedics & Spine Surgery',
    code: 'ORTH',
    headDoctor: 'Dr. Shahriar Kabir',
    totalDoctors: 5,
    activeChambers: 2,
    bedCapacity: 45,
    monthlyThroughput: 750
  },
  {
    id: 'dept_4',
    name: 'Pediatrics & Neonatology',
    code: 'PED',
    headDoctor: 'Dr. Tanvir Chowdhury',
    totalDoctors: 5,
    activeChambers: 3,
    bedCapacity: 40,
    monthlyThroughput: 1100
  }
];

export const initialBranchSchedules: BranchScheduleOverview[] = [
  {
    branchName: 'Dhanmondi Central Campus',
    location: 'Road 8/A, Dhanmondi, Dhaka',
    activeSessions: 14,
    totalCapacityToday: 240,
    checkedInToday: 184,
    queueDelayMinutes: 8,
    status: 'normal'
  },
  {
    branchName: 'Uttara Branch',
    location: 'Sector 3, Uttara, Dhaka',
    activeSessions: 8,
    totalCapacityToday: 140,
    checkedInToday: 128,
    queueDelayMinutes: 22,
    status: 'busy'
  },
  {
    branchName: 'Banani Specialty Wing',
    location: 'Road 11, Banani, Dhaka',
    activeSessions: 5,
    totalCapacityToday: 80,
    checkedInToday: 54,
    queueDelayMinutes: 5,
    status: 'normal'
  }
];

export const initialStaffUsers: StaffUser[] = [
  {
    id: 'staff_1',
    name: 'Syed Rafsan Rohan',
    email: 'rohan@squarehospital.org',
    role: 'Hospital Owner',
    department: 'Executive Board',
    assignedBranch: 'All Campuses',
    lastActive: 'Active now',
    status: 'active'
  },
  {
    id: 'staff_2',
    name: 'Dr. Kamrul Islam',
    email: 'kamrul.admin@squarehospital.org',
    role: 'Clinical Director',
    department: 'Medical Administration',
    assignedBranch: 'Dhanmondi Central Campus',
    lastActive: '12 mins ago',
    status: 'active'
  },
  {
    id: 'staff_3',
    name: 'Sharmin Sultana',
    email: 'sharmin.hr@squarehospital.org',
    role: 'Credential Officer',
    department: 'Medical HR & Credentialing',
    assignedBranch: 'All Campuses',
    lastActive: '1 hour ago',
    status: 'active'
  },
  {
    id: 'staff_4',
    name: 'Anisur Rahman',
    email: 'anis.reception@squarehospital.org',
    role: 'Desk Receptionist',
    department: 'Patient Services',
    assignedBranch: 'Uttara Branch',
    lastActive: '3 mins ago',
    status: 'active'
  }
];
