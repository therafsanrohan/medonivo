'use client';

import React, { useState } from 'react';
import { usePatientAuth } from '@/context/PatientAuthContext';
import { CareLoopCard } from '@/components/CareLoopCard';
import { StethoscopeIcon, PlusIcon } from '@medonivo/icons';
import Link from 'next/link';

export default function CareLoopsPage() {
  const { activeMember, careLoops } = usePatientAuth();
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const memberLoops = careLoops.filter((cl) => cl.memberId === activeMember.id);
  const filteredLoops = memberLoops.filter((cl) => cl.status === tab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
            Care Journeys
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            CareLoops for {activeMember.name}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Continuous treatment pathways, medical tasks, and doctor-guided recovery milestones.
          </p>
        </div>

        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm shrink-0"
        >
          <PlusIcon size={16} /> New CareLoop via Consultation
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab('active')}
          className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
            tab === 'active'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Active CareLoops ({memberLoops.filter((cl) => cl.status === 'active').length})
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
            tab === 'completed'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Completed ({memberLoops.filter((cl) => cl.status === 'completed').length})
        </button>
      </div>

      {/* CareLoops Grid */}
      {filteredLoops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLoops.map((loop) => (
            <CareLoopCard key={loop.id} careLoop={loop} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <StethoscopeIcon size={36} className="text-gray-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-gray-800">No {tab} CareLoops found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            {tab === 'active'
              ? 'CareLoops are automatically generated when doctors prescribe treatment plans during consultations.'
              : 'Completed treatment programs will be archived here for your health records.'}
          </p>
        </div>
      )}
    </div>
  );
}
