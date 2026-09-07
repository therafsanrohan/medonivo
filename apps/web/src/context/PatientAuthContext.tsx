'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FamilyMember,
  CareLoop,
  CareLoopTask,
  MedicineItem,
  Doctor,
  HealthRecord,
  initialFamilyMembers,
  initialCareLoops,
  initialMedicines,
  initialDoctors,
  initialHealthRecords
} from '../fixtures/patient-fixtures';

export interface AppointmentBooking {
  id: string;
  memberId: string;
  memberName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  branch: string;
  date: string;
  slot: string;
  queueToken: string;
  status: 'scheduled' | 'checked_in' | 'completed' | 'cancelled';
}

interface PatientAuthContextType {
  members: FamilyMember[];
  activeMemberId: string;
  activeMember: FamilyMember;
  setActiveMemberId: (id: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;

  careLoops: CareLoop[];
  toggleCareTaskStatus: (loopId: string, taskId: string) => void;
  
  medicines: MedicineItem[];
  toggleMedicineTaken: (medId: string) => void;
  
  doctors: Doctor[];
  
  appointments: AppointmentBooking[];
  bookAppointment: (booking: Omit<AppointmentBooking, 'id' | 'queueToken' | 'status'>) => AppointmentBooking;

  records: HealthRecord[];
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  
  needsAttentionCount: number;
}

const PatientAuthContext = createContext<PatientAuthContextType | undefined>(undefined);

export function PatientAuthProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [activeMemberId, setActiveMemberId] = useState<string>('mem_self');
  const [careLoops, setCareLoops] = useState<CareLoop[]>(initialCareLoops);
  const [medicines, setMedicines] = useState<MedicineItem[]>(initialMedicines);
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([
    {
      id: 'apt_201',
      memberId: 'mem_father',
      memberName: 'Jahangir Hossain',
      doctorId: 'doc_1',
      doctorName: 'Dr. Prof. Shamsul Huda',
      specialty: 'Cardiology',
      branch: 'Dhanmondi Branch',
      date: 'Today',
      slot: '04:30 PM',
      queueToken: 'A-14',
      status: 'scheduled'
    }
  ]);
  const [records, setRecords] = useState<HealthRecord[]>(initialHealthRecords);

  // Load local storage on mount
  useEffect(() => {
    try {
      const savedMember = localStorage.getItem('medonivo_active_member');
      if (savedMember) setActiveMemberId(savedMember);
    } catch {
      // ignore SSR or storage restriction
    }
  }, []);

  const handleSetActiveMember = (id: string) => {
    setActiveMemberId(id);
    try {
      localStorage.setItem('medonivo_active_member', id);
    } catch {
      // ignore
    }
  };

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];

  const addFamilyMember = (newMem: Omit<FamilyMember, 'id'>) => {
    const created: FamilyMember = {
      ...newMem,
      id: `mem_${Date.now()}`
    };
    setMembers((prev) => [...prev, created]);
    handleSetActiveMember(created.id);
  };

  const toggleCareTaskStatus = (loopId: string, taskId: string) => {
    setCareLoops((prev) =>
      prev.map((loop) => {
        if (loop.id !== loopId) return loop;
        const updatedTasks = loop.tasks.map((task) => {
          if (task.id !== taskId) return task;
          const nextStatus = task.status === 'completed' ? 'due_today' : 'completed';
          return { ...task, status: nextStatus as CareLoopTask['status'] };
        });
        const completedCount = updatedTasks.filter((t) => t.status === 'completed').length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        return {
          ...loop,
          tasks: updatedTasks,
          progressPercent: newProgress
        };
      })
    );
  };

  const toggleMedicineTaken = (medId: string) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id !== medId) return med;
        const isNowTaken = !med.takenToday;
        return {
          ...med,
          takenToday: isNowTaken,
          streakDays: isNowTaken ? med.streakDays + 1 : Math.max(0, med.streakDays - 1)
        };
      })
    );
  };

  const bookAppointment = (data: Omit<AppointmentBooking, 'id' | 'queueToken' | 'status'>) => {
    const tokenNumber = Math.floor(Math.random() * 20) + 1;
    const tokenCode = `B-${tokenNumber.toString().padStart(2, '0')}`;
    const newBooking: AppointmentBooking = {
      ...data,
      id: `apt_${Date.now()}`,
      queueToken: tokenCode,
      status: 'scheduled'
    };
    setAppointments((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const created: HealthRecord = {
      ...record,
      id: `rec_${Date.now()}`
    };
    setRecords((prev) => [created, ...prev]);
  };

  // Calculate Needs Attention items for current active member
  const memberLoops = careLoops.filter((cl) => cl.memberId === activeMemberId);
  const overdueTasksCount = memberLoops.flatMap((cl) => cl.tasks).filter((t) => t.status === 'overdue').length;
  const memberMeds = medicines.filter((m) => m.memberId === activeMemberId);
  const pendingMedsCount = memberMeds.filter((m) => !m.takenToday).length;
  const needsAttentionCount = overdueTasksCount + pendingMedsCount;

  return (
    <PatientAuthContext.Provider
      value={{
        members,
        activeMemberId,
        activeMember,
        setActiveMemberId: handleSetActiveMember,
        addFamilyMember,
        careLoops,
        toggleCareTaskStatus,
        medicines,
        toggleMedicineTaken,
        doctors,
        appointments,
        bookAppointment,
        records,
        addHealthRecord,
        needsAttentionCount
      }}
    >
      {children}
    </PatientAuthContext.Provider>
  );
}

export function usePatientAuth() {
  const context = useContext(PatientAuthContext);
  if (!context) {
    throw new Error('usePatientAuth must be used within a PatientAuthProvider');
  }
  return context;
}
