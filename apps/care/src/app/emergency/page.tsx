'use client';

import React from 'react';
import { usePatientAuth } from '../../context/PatientAuthContext';
import { EmergencyCard } from '../../components/EmergencyCard';
import { ShieldCheckIcon, UserIcon } from '@medonivo/icons';

export default function EmergencyPage() {
  const { members, activeMemberId, setActiveMemberId, activeMember } = usePatientAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded">
          Emergency Passport
        </span>
        <h1 className="text-xl font-bold text-gray-900 mt-1">
          Digital Emergency Health Card &amp; QR
        </h1>
        <p className="text-xs text-gray-500 mt-0.5 mb-4">
          Instant access to critical medical data, blood group, allergies, and ICE contacts for first responders.
        </p>

        {/* Profile Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold">Member Card:</span>
          <div className="flex flex-wrap gap-1.5">
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMemberId(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  m.id === activeMemberId
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m.name} ({m.relation})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Card Display */}
      <EmergencyCard member={activeMember} />
    </div>
  );
}
