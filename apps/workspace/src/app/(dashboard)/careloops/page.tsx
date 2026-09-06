'use client';

import React, { useState } from 'react';
import { useDoctorAuth } from '../../../context/DoctorAuthContext';
import { StethoscopeIcon, CheckCircleIcon, AlertCircleIcon, PlusIcon, ArrowRightIcon } from '@medonivo/icons';
import Link from 'next/link';

export default function DoctorCareLoopsPage() {
  const { queue, consultations } = useDoctorAuth();

  const activeCareLoops = [
    {
      id: 'cl_101',
      patientName: 'Jahangir Hossain',
      title: 'Post-Angioplasty Recovery & Cardiac Rehab',
      progressPercent: 70,
      nextTaskDue: 'Echocardiogram follow-up (Today)',
      urgency: 'high',
      completedTasks: 3,
      totalTasks: 5
    },
    {
      id: 'cl_102',
      patientName: 'Arman Hossain',
      title: 'Hypertension Management & Lifestyle Program',
      progressPercent: 40,
      nextTaskDue: 'Kidney function test (Overdue)',
      urgency: 'high',
      completedTasks: 2,
      totalTasks: 5
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
            Care Journey Management
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Patient CareLoops Under Your Care</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor active treatment programs, patient adherence, and upcoming milestone tasks.
          </p>
        </div>
        <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-sky-600 block">Active Programs</span>
          <span className="text-2xl font-black text-sky-900">{activeCareLoops.length}</span>
        </div>
      </div>

      {/* CareLoops List */}
      <div className="space-y-4">
        {activeCareLoops.map((loop) => (
          <div key={loop.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    loop.urgency === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {loop.urgency === 'high' ? 'Needs Attention' : 'On Track'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug">{loop.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <StethoscopeIcon size={14} className="text-gray-400" /> Patient: <strong className="text-gray-700">{loop.patientName}</strong>
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className="text-2xl font-black text-sky-700">{loop.progressPercent}%</span>
                <span className="text-[11px] text-gray-500 block">{loop.completedTasks}/{loop.totalTasks} Steps</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-sky-600 rounded-full transition-all"
                style={{ width: `${loop.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className={`flex items-center gap-1 font-semibold ${
                loop.urgency === 'high' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                <AlertCircleIcon size={14} /> Next: {loop.nextTaskDue}
              </span>
              <Link
                href={`/consultation/${loop.id}`}
                className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1"
              >
                Manage CareLoop <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Consultations Summary */}
      {consultations.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Recently Submitted Consultations ({consultations.length})
          </h2>
          <div className="space-y-3">
            {consultations.map((c) => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{c.patientName}</h4>
                  <p className="text-[11px] text-gray-500">Diagnosis: {c.diagnosis} • {c.medicines.length} medicines prescribed</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <CheckCircleIcon size={16} /> CareLoop Generated
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
