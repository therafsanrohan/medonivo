'use client';

import React from 'react';
import { usePatientAuth } from '../../context/PatientAuthContext';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, StethoscopeIcon, FlameIcon } from '@medonivo/icons';

export default function MedicinesPage() {
  const { activeMember, medicines, toggleMedicineTaken } = usePatientAuth();

  const memberMeds = medicines.filter((m) => m.memberId === activeMember.id);
  const takenCount = memberMeds.filter((m) => m.takenToday).length;
  const adherencePercent = memberMeds.length > 0 ? Math.round((takenCount / memberMeds.length) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
            Medication Schedule
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            Prescribed Medicines for {activeMember.name}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Daily dosage checklist, pill timing reminders, and adherence streak tracking.
          </p>
        </div>

        {/* Adherence Widget */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center shrink-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
            Today&apos;s Adherence
          </span>
          <span className="text-2xl font-black text-amber-900">{adherencePercent}%</span>
          <span className="text-[11px] text-amber-700 font-medium block">
            {takenCount} of {memberMeds.length} Doses Logged
          </span>
        </div>
      </div>

      {/* Medicines Checklist */}
      <div className="space-y-3">
        {memberMeds.length > 0 ? (
          memberMeds.map((med) => (
            <div
              key={med.id}
              className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                med.takenToday
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={med.takenToday}
                  onChange={() => toggleMedicineTaken(med.id)}
                  className="w-6 h-6 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-base font-bold ${med.takenToday ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {med.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">
                      {med.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {med.frequency} • Prescribed by <strong className="text-gray-800">{med.prescribedBy}</strong>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {med.timing.map((t) => (
                      <span key={t} className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Streak</span>
                  <span className="text-xs font-black text-amber-600 flex items-center gap-0.5">
                    <FlameIcon size={14} /> {med.streakDays} Days
                  </span>
                </div>

                <button
                  onClick={() => toggleMedicineTaken(med.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                    med.takenToday
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {med.takenToday ? 'Marked as Taken' : 'Mark Taken'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200">
            <AlertCircleIcon size={36} className="text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No prescribed medicines found</h3>
            <p className="text-xs text-gray-500 mt-1">Prescriptions issued during consultations automatically populate here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
