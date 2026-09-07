'use client';

import React, { useState } from 'react';
import { FamilyMember } from '../fixtures/patient-fixtures';
import { ShieldCheckIcon, PhoneIcon, EyeIcon, EyeOffIcon, QrCodeIcon } from '@medonivo/icons';

interface EmergencyCardProps {
  member: FamilyMember;
}

export function EmergencyCard({ member }: EmergencyCardProps) {
  const [showSensitive, setShowSensitive] = useState(true);

  return (
    <div className="bg-gradient-to-br from-red-600 via-red-700 to-rose-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
            <ShieldCheckIcon size={14} /> Emergency Health Pass
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">{member.name}</h2>
          <p className="text-xs text-red-100 font-medium">{member.relation} Profile • {member.age} Yrs • {member.gender}</p>
        </div>

        {/* QR Code Demo */}
        <div className="bg-white p-2.5 rounded-2xl shadow-md flex flex-col items-center">
          <QrCodeIcon size={64} className="text-gray-900" />
          <span className="text-[9px] font-bold text-gray-700 mt-1 uppercase tracking-wider">Scan for CarePass</span>
        </div>
      </div>

      {/* Primary Medical Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-red-200 uppercase tracking-wider block">Blood Group</span>
          <span className="text-2xl font-extrabold text-white">{member.bloodGroup}</span>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-red-200 uppercase tracking-wider block">CarePass Tier</span>
          <span className="text-sm font-bold text-amber-300 block truncate">{member.carePassPlan}</span>
        </div>
      </div>

      {/* Sensitive Medical Info */}
      <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-red-100 uppercase tracking-wider">Known Allergies & Conditions</span>
          <button
            onClick={() => setShowSensitive(!showSensitive)}
            className="text-xs text-red-200 hover:text-white flex items-center gap-1 font-semibold"
          >
            {showSensitive ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
            {showSensitive ? 'Hide' : 'Show'}
          </button>
        </div>

        {showSensitive ? (
          <div className="space-y-2">
            <div>
              <span className="text-[11px] text-red-200 block">Allergies:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {member.allergies.map((alg) => (
                  <span key={alg} className="text-xs bg-red-500/50 text-white font-semibold px-2.5 py-0.5 rounded-md border border-white/20">
                    {alg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-red-200 block">Chronic Conditions:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {member.chronicConditions.map((cond) => (
                  <span key={cond} className="text-xs bg-white/20 text-white font-semibold px-2.5 py-0.5 rounded-md">
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-red-200 italic py-1">
            Medical history hidden for privacy. Click Show to reveal.
          </div>
        )}
      </div>

      {/* Emergency Contact CTA */}
      <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between border border-white/20">
        <div>
          <span className="text-[10px] font-bold text-red-200 uppercase tracking-wider block">Primary Emergency Contact</span>
          <span className="text-xs font-bold text-white">{member.emergencyContact}</span>
        </div>
        <a
          href={`tel:${member.emergencyContact.replace(/[^0-9+]/g, '')}`}
          className="bg-white text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition"
        >
          <PhoneIcon size={16} /> Call ICE
        </a>
      </div>
    </div>
  );
}
