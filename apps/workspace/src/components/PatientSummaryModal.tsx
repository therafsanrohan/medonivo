'use client';

import React, { useState } from 'react';
import { QueuePatient } from '../fixtures/doctor-workspace-fixtures';
import { XIcon, ShieldCheckIcon, UserIcon, AlertCircleIcon, StethoscopeIcon, CalendarIcon, FileTextIcon } from '@medonivo/icons';

interface PatientSummaryModalProps {
  patient: QueuePatient | null;
  onClose: () => void;
  onStartConsultation: (patient: QueuePatient) => void;
}

export function PatientSummaryModal({ patient, onClose, onStartConsultation }: PatientSummaryModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'careloops' | 'history'>('overview');

  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 text-white p-5 flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-sky-500/20 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-400/30">
              Token #{patient.token} • {patient.carePassLabel}
            </span>
            <h3 className="text-xl font-bold mt-1">{patient.patientName}</h3>
            <p className="text-xs text-sky-200">{patient.gender} • {patient.age} Yrs • Phone: {patient.mrnPhone}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition font-bold"
          >
            ✕
          </button>
        </div>

        {/* Multi-Tab Navigation Bar */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-4 text-xs font-bold text-gray-500">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 transition border-b-2 ${
              activeTab === 'overview'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            Clinical Overview
          </button>
          <button
            onClick={() => setActiveTab('careloops')}
            className={`py-3 px-4 transition border-b-2 ${
              activeTab === 'careloops'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            Active CareLoops
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 transition border-b-2 ${
              activeTab === 'history'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            Rx &amp; Vitals History
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Chief Complaints */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Today&apos;s Chief Complaint
                </span>
                <p className="text-xs font-bold text-amber-950 leading-relaxed">
                  &ldquo;{patient.chiefComplaint}&rdquo;
                </p>
              </div>

              {/* Allergies & Conditions Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 block mb-1">
                    Known Allergies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.length > 0 ? (
                      patient.allergies.map((alg) => (
                        <span key={alg} className="text-[11px] bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                          ⚠️ {alg}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">No allergies recorded</span>
                    )}
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block mb-1">
                    Chronic Conditions
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {patient.chronicConditions.length > 0 ? (
                      patient.chronicConditions.map((cond) => (
                        <span key={cond} className="text-[11px] bg-sky-700 text-white font-bold px-2 py-0.5 rounded">
                          {cond}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">None logged</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Vitals Indicator */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-400 block">Baseline Blood Pressure</span>
                  <span className="text-sm font-extrabold text-white">134 / 86 mmHg</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Pulse &amp; SpO2</span>
                  <span className="text-sm font-extrabold text-white">74 bpm &bull; 98%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'careloops' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-emerald-950">Post-Angioplasty Recovery &amp; Rehab</h4>
                  <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Active &bull; 75% Adherence
                  </span>
                </div>
                <p className="text-[11px] text-emerald-900 font-medium">
                  30-Day CareLoop tracking daily blood pressure logs, anti-platelet compliance, and cardiology review.
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl text-[11px] text-gray-700 border border-emerald-100">
                  📌 <strong>Next Milestone:</strong> Serum Creatinine &amp; Lipid Profile test scheduled for 2026-09-10.
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-sky-950">Type-2 Diabetes Management</h4>
                  <span className="text-[10px] font-extrabold bg-sky-600 text-white px-2 py-0.5 rounded">
                    Active &bull; 90% Adherence
                  </span>
                </div>
                <p className="text-[11px] text-sky-900 font-medium">
                  Ongoing glycemic control tracking morning fasting blood sugar and HbA1c 3-month reviews.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3 text-xs">
              <div className="border border-gray-200 rounded-2xl p-3.5 space-y-1 bg-gray-50/50">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Telmisartan 40mg (1-0-0)</span>
                  <span className="text-sky-700">Aug 14, 2026</span>
                </div>
                <p className="text-[11px] text-gray-500">Prescribed by Dr. Arman Hossain &bull; 30 Days Duration</p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-3.5 space-y-1 bg-gray-50/50">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Clopidogrel 75mg (0-0-1)</span>
                  <span className="text-sky-700">Aug 14, 2026</span>
                </div>
                <p className="text-[11px] text-gray-500">Prescribed by Dr. Arman Hossain &bull; 90 Days Duration</p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-3.5 space-y-1 bg-gray-50/50">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Rosuvastatin 10mg (0-0-1)</span>
                  <span className="text-sky-700">Jul 02, 2026</span>
                </div>
                <p className="text-[11px] text-gray-500">Prescribed by Dr. Arman Hossain &bull; Continued</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
          >
            Close Summary
          </button>
          <button
            onClick={() => onStartConsultation(patient)}
            className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            <StethoscopeIcon size={16} /> Open Consultation Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
