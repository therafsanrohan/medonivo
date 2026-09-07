'use client';

import React from 'react';
import { AlertCircleIcon, ArrowRightIcon, CheckCircleIcon } from '@medonivo/icons';
import { usePatientAuth } from '../context/PatientAuthContext';
import Link from 'next/link';

export function NeedsAttentionBanner() {
  const { activeMember, careLoops, medicines, appointments } = usePatientAuth();

  const memberLoops = careLoops.filter((cl) => cl.memberId === activeMember.id);
  const overdueTasks = memberLoops.flatMap((cl) => cl.tasks.map(t => ({ task: t, loop: cl }))).filter((item) => item.task.status === 'overdue');
  
  const memberMeds = medicines.filter((m) => m.memberId === activeMember.id);
  const pendingMeds = memberMeds.filter((m) => !m.takenToday);

  const memberAppointments = appointments.filter((a) => a.memberId === activeMember.id && a.status === 'scheduled');

  if (overdueTasks.length === 0 && pendingMeds.length === 0 && memberAppointments.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">
            <CheckCircleIcon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold">All Priority Actions Up-To-Date</h4>
            <p className="text-xs text-emerald-700">No overdue CareLoop tasks or pending medicines for {activeMember.name}.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <AlertCircleIcon size={20} className="text-amber-600 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">
            Needs Attention ({activeMember.name})
          </h3>
        </div>
        <span className="text-xs bg-amber-200 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full">
          {overdueTasks.length + pendingMeds.length} Priority Items
        </span>
      </div>

      <div className="space-y-2.5">
        {overdueTasks.map(({ task, loop }) => (
          <div key={task.id} className="bg-white border border-amber-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-gray-900">{task.title}</div>
                <div className="text-xs text-gray-500">Overdue in CareLoop: {loop.title}</div>
              </div>
            </div>
            <Link
              href={`/careloops/${loop.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 transition"
            >
              Action <ArrowRightIcon size={14} />
            </Link>
          </div>
        ))}

        {pendingMeds.slice(0, 2).map((med) => (
          <div key={med.id} className="bg-white border border-amber-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-gray-900">{med.name} ({med.dosage})</div>
                <div className="text-xs text-gray-500">{med.frequency} • Prescribed by {med.prescribedBy}</div>
              </div>
            </div>
            <Link
              href="/medicines"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition"
            >
              Take Medicine <ArrowRightIcon size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
