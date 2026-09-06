'use client';

import React, { useState } from 'react';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import { PatientSummaryModal } from '../../components/PatientSummaryModal';
import { QueuePatient } from '../../fixtures/doctor-workspace-fixtures';
import { useRouter } from 'next/navigation';
import {
  StethoscopeIcon,
  SearchIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  PlusIcon
} from '@medonivo/icons';
import Link from 'next/link';

export default function WorkspaceDashboardPage() {
  const router = useRouter();
  const { doctor, queue, callPatient, pendingReports, messages } = useDoctorAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientForSummary, setSelectedPatientForSummary] = useState<QueuePatient | null>(null);

  const activeWaitingQueue = queue.filter((q) => q.queueStatus === 'waiting').length;
  const inConsultationPatient = queue.find((q) => q.queueStatus === 'in_consultation');
  const completedCount = queue.filter((q) => q.queueStatus === 'completed').length;
  const pendingReportCount = pendingReports.filter((r) => r.status === 'pending_review').length;

  const filteredQueue = queue.filter(
    (q) =>
      q.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.mrnPhone.includes(searchQuery)
  );

  const handleStartConsultation = (patient: QueuePatient) => {
    callPatient(patient.id);
    setSelectedPatientForSummary(null);
    router.push(`/consultation/${patient.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full mb-2 inline-block">
            {doctor.currentBranch} • Active Chamber Session
          </span>
          <h1 className="text-2xl font-bold tracking-tight">
            {doctor.name}
          </h1>
          <p className="text-xs text-sky-200 mt-1">
            {doctor.specialty} • {doctor.regNumber}
          </p>
        </div>

        {inConsultationPatient ? (
          <div className="bg-amber-500/20 border border-amber-400/40 p-3.5 rounded-2xl text-center sm:text-right shrink-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">Current Patient In Chamber</span>
            <span className="text-base font-black text-white">{inConsultationPatient.patientName} ({inConsultationPatient.token})</span>
            <button
              onClick={() => router.push(`/consultation/${inConsultationPatient.id}`)}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-sm transition block w-full sm:w-auto"
            >
              Resume Consultation →
            </button>
          </div>
        ) : (
          <div className="bg-emerald-500/20 border border-emerald-400/40 p-3.5 rounded-2xl text-center shrink-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block">Chamber Status</span>
            <span className="text-sm font-bold text-white block">Ready for Next Patient</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Today&apos;s Patients</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{queue.length}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-sky-600 uppercase font-bold tracking-wider block">Waiting in Chamber</span>
          <span className="text-2xl font-black text-sky-600 mt-1 block">{activeWaitingQueue}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider block">Consulted Today</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{completedCount}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-amber-600 uppercase font-bold tracking-wider block">Pending Reports</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingReportCount}</span>
        </div>
      </div>

      {/* Chamber Queue Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-gray-200 bg-gray-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Chamber Consultation Queue ({doctor.currentBranch})
            </h2>
            <p className="text-xs text-gray-500">
              Click patient row to view clinical summary or launch consultation workspace.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token, name, phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/70 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5 pl-5">Token</th>
                <th className="p-3.5">Patient Name</th>
                <th className="p-3.5">Age/Gender</th>
                <th className="p-3.5">CarePass</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-sky-50/50 transition">
                  <td className="p-3.5 pl-5 font-black text-sky-800 text-sm">{item.token}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => setSelectedPatientForSummary(item)}
                      className="font-bold text-gray-900 hover:text-sky-700 text-left hover:underline"
                    >
                      {item.patientName}
                    </button>
                    <span className="block text-[11px] text-gray-500 truncate max-w-xs">{item.chiefComplaint}</span>
                  </td>
                  <td className="p-3.5 text-gray-700 font-medium">{item.age} Yrs • {item.gender}</td>
                  <td className="p-3.5">
                    <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {item.carePassLabel}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`font-extrabold px-2.5 py-1 rounded-full text-[10px] ${
                      item.queueStatus === 'in_consultation'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : item.queueStatus === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {item.queueStatusLabel}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPatientForSummary(item)}
                      className="px-3 py-1.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                      Summary
                    </button>
                    {item.queueStatus !== 'completed' && (
                      <button
                        onClick={() => handleStartConsultation(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold transition shadow-xs"
                      >
                        {item.queueStatus === 'in_consultation' ? 'Consultation' : 'Call & Start'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Clinical Summary Modal */}
      {selectedPatientForSummary && (
        <PatientSummaryModal
          patient={selectedPatientForSummary}
          onClose={() => setSelectedPatientForSummary(null)}
          onStartConsultation={handleStartConsultation}
        />
      )}
    </div>
  );
}
