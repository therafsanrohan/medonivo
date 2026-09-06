'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  OrgDoctor,
  CredentialReviewItem,
  OrgDepartment,
  BranchScheduleOverview,
  StaffUser,
  initialOrgDoctors,
  initialCredentialReviews,
  initialOrgDepartments,
  initialBranchSchedules,
  initialStaffUsers
} from '../fixtures/org-fixtures';

interface OrgAuthContextType {
  hospitalName: string;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  doctors: OrgDoctor[];
  credentialReviews: CredentialReviewItem[];
  departments: OrgDepartment[];
  branchSchedules: BranchScheduleOverview[];
  staffList: StaffUser[];
  inviteDoctor: (doc: Omit<OrgDoctor, 'id' | 'patientsThisMonth'>) => void;
  reviewCredential: (id: string, action: 'approved' | 'rejected', notes?: string) => void;
  addDepartment: (dept: Omit<OrgDepartment, 'id' | 'monthlyThroughput'>) => void;
  updateStaffRole: (staffId: string, role: StaffUser['role']) => void;
}

const OrgAuthContext = createContext<OrgAuthContextType | undefined>(undefined);

export function OrgAuthProvider({ children }: { children: React.ReactNode }) {
  const [hospitalName] = useState('Square Hospital Network');
  const [selectedBranch, setSelectedBranch] = useState('All Campuses');

  const [doctors, setDoctors] = useState<OrgDoctor[]>(initialOrgDoctors);
  const [credentialReviews, setCredentialReviews] = useState<CredentialReviewItem[]>(initialCredentialReviews);
  const [departments, setDepartments] = useState<OrgDepartment[]>(initialOrgDepartments);
  const [branchSchedules] = useState<BranchScheduleOverview[]>(initialBranchSchedules);
  const [staffList, setStaffList] = useState<StaffUser[]>(initialStaffUsers);

  const inviteDoctor = (docData: Omit<OrgDoctor, 'id' | 'patientsThisMonth'>) => {
    const newDoc: OrgDoctor = {
      ...docData,
      id: `doc_${Date.now()}`,
      patientsThisMonth: 0
    };
    setDoctors((prev) => [newDoc, ...prev]);
  };

  const reviewCredential = (id: string, action: 'approved' | 'rejected', notes?: string) => {
    setCredentialReviews((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: action, reviewNotes: notes } : c))
    );

    // If approved, update doctor status in roster
    if (action === 'approved') {
      const reviewItem = credentialReviews.find((c) => c.id === id);
      if (reviewItem) {
        setDoctors((prev) =>
          prev.map((d) =>
            d.regNumber === reviewItem.bmdcRegNumber
              ? { ...d, status: 'active', statusLabel: 'Active on Duty', bmdcVerified: true }
              : d
          )
        );
      }
    }
  };

  const addDepartment = (deptData: Omit<OrgDepartment, 'id' | 'monthlyThroughput'>) => {
    const newDept: OrgDepartment = {
      ...deptData,
      id: `dept_${Date.now()}`,
      monthlyThroughput: 0
    };
    setDepartments((prev) => [...prev, newDept]);
  };

  const updateStaffRole = (staffId: string, role: StaffUser['role']) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, role } : s))
    );
  };

  return (
    <OrgAuthContext.Provider
      value={{
        hospitalName,
        selectedBranch,
        setSelectedBranch,
        doctors,
        credentialReviews,
        departments,
        branchSchedules,
        staffList,
        inviteDoctor,
        reviewCredential,
        addDepartment,
        updateStaffRole
      }}
    >
      {children}
    </OrgAuthContext.Provider>
  );
}

export function useOrgAuth() {
  const context = useContext(OrgAuthContext);
  if (!context) {
    throw new Error('useOrgAuth must be used within an OrgAuthProvider');
  }
  return context;
}
