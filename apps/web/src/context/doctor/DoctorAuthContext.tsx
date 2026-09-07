'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  QueuePatient,
  ConsultationRecord,
  PendingReport,
  DoctorMessageThread,
  ChamberSchedule,
  initialQueueList,
  initialPendingReports,
  initialDoctorMessages,
  initialSchedules
} from '@/fixtures/doctor/doctor-workspace-fixtures';

export interface DoctorProfile {
  name: string;
  specialty: string;
  title: string;
  regNumber: string;
  currentBranch: string;
  chamberStatus: 'in_chamber' | 'on_break' | 'offline';
}

interface DoctorAuthContextType {
  doctor: DoctorProfile;
  setChamberStatus: (status: DoctorProfile['chamberStatus']) => void;
  
  queue: QueuePatient[];
  callPatient: (patientId: string) => void;
  completeConsultation: (patientId: string) => void;

  consultations: ConsultationRecord[];
  saveConsultation: (record: Omit<ConsultationRecord, 'id' | 'date' | 'careLoopCreated'>) => ConsultationRecord;

  pendingReports: PendingReport[];
  reviewReport: (reportId: string, doctorNote: string) => void;

  messages: DoctorMessageThread[];
  sendMessageReply: (threadId: string, text: string) => void;

  schedules: ChamberSchedule[];
  updateSchedule: (branch: string, updated: Partial<ChamberSchedule>) => void;
}

const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

export function DoctorAuthProvider({ children }: { children: React.ReactNode }) {
  const [doctor, setDoctor] = useState<DoctorProfile>({
    name: 'Dr. Prof. Shamsul Huda',
    specialty: 'Cardiology & Cardiovascular Diseases',
    title: 'MBBS, FCPS (Cardiology), FACC (USA)',
    regNumber: 'BMDC Reg # A-24819',
    currentBranch: 'Dhanmondi Branch',
    chamberStatus: 'in_chamber'
  });

  const [queue, setQueue] = useState<QueuePatient[]>(initialQueueList);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>(initialPendingReports);
  const [messages, setMessages] = useState<DoctorMessageThread[]>(initialDoctorMessages);
  const [schedules, setSchedules] = useState<ChamberSchedule[]>(initialSchedules);

  const setChamberStatus = (status: DoctorProfile['chamberStatus']) => {
    setDoctor((prev) => ({ ...prev, chamberStatus: status }));
  };

  const callPatient = (patientId: string) => {
    setQueue((prev) =>
      prev.map((q) => {
        if (q.id === patientId) {
          return {
            ...q,
            queueStatus: 'in_consultation',
            queueStatusLabel: 'In Consultation'
          };
        }
        if (q.queueStatus === 'in_consultation') {
          return {
            ...q,
            queueStatus: 'completed',
            queueStatusLabel: 'Completed'
          };
        }
        return q;
      })
    );
  };

  const completeConsultation = (patientId: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === patientId ? { ...q, queueStatus: 'completed', queueStatusLabel: 'Completed' } : q))
    );
  };

  const saveConsultation = (data: Omit<ConsultationRecord, 'id' | 'date' | 'careLoopCreated'>) => {
    const created: ConsultationRecord = {
      ...data,
      id: `cons_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      careLoopCreated: true
    };

    setConsultations((prev) => [created, ...prev]);
    completeConsultation(data.queueId);
    return created;
  };

  const reviewReport = (reportId: string, doctorNote: string) => {
    setPendingReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: 'reviewed', doctorNote } : r
      )
    );
  };

  const sendMessageReply = (threadId: string, text: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === threadId ? { ...m, lastMessage: `Doctor: ${text}`, unreadCount: 0 } : m))
    );
  };

  const updateSchedule = (branch: string, updated: Partial<ChamberSchedule>) => {
    setSchedules((prev) =>
      prev.map((s) => (s.branch === branch ? { ...s, ...updated } : s))
    );
  };

  return (
    <DoctorAuthContext.Provider
      value={{
        doctor,
        setChamberStatus,
        queue,
        callPatient,
        completeConsultation,
        consultations,
        saveConsultation,
        pendingReports,
        reviewReport,
        messages,
        sendMessageReply,
        schedules,
        updateSchedule
      }}
    >
      {children}
    </DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  const context = useContext(DoctorAuthContext);
  if (!context) {
    throw new Error('useDoctorAuth must be used within a DoctorAuthProvider');
  }
  return context;
}
