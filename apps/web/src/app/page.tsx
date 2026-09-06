'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../context/OrgAuthContext';
import Link from 'next/link';
import {
  BuildingIcon,
  UserIcon,
  ShieldCheckIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon
} from '@medonivo/icons';

export default function OrgOverviewPage() {
  const {
    hospitalName,
    selectedBranch,
    doctors,
    credentialReviews,
    departments,
    branchSchedules
  } = useOrgAuth();

  const filteredDoctors = selectedBranch === 'All Campuses'
    ? doctors
    : doctors.filter((d) => d.branch.toLowerCase().includes(selectedBranch.toLowerCase().split(' ')[0]));

  const activeDoctorsCount = filteredDoctors.filter((d) => d.status === 'active').length;
  const pendingCredsCount = credentialReviews.filter((c) => c.status === 'pending').length;
  const totalBeds = departments.reduce((acc, d) => acc + d.bedCapacity, 0);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full mb-2 inline-block">
            Hospital Operations Command Center &bull; {selectedBranch}
          </span>
          <h1 className="text-2xl font-bold tracking-tight">{hospitalName}</h1>
          <p className="text-xs text-blue-200 mt-1">
            Managing 3 Multi-specialty Campuses &bull; 24 Clinical Chambers &bull; {doctors.length} Affiliated Physicians
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/doctors"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            + Invite Doctor
          </Link>
          <Link
            href="/credentials"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition"
          >
            Review Credentials ({pendingCredsCount})
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Doctors on Duty</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{activeDoctorsCount} / {filteredDoctors.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">✓ All chambers active</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Check-ins Today</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">366</span>
          <span className="text-[10px] text-blue-600 font-bold mt-1 block">+14% vs yesterday</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Capacity Utilisation</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">82%</span>
          <span className="text-[10px] text-gray-500 font-medium mt-1 block">Peak: 04:00 PM - 07:00 PM</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Pending Credentials</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCredsCount}</span>
          <span className="text-[10px] text-amber-600 font-bold mt-1 block">Needs BMDC audit</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Hospital Bed Count</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">{totalBeds} Beds</span>
          <span className="text-[10px] text-gray-500 font-medium mt-1 block">Across 4 departments</span>
        </div>
      </div>

      {/* Live Branch Status Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900">Hospital Branch Activity Matrix</h2>
          <span className="text-xs text-blue-600 font-bold">Live Auto-sync (30s)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchSchedules.map((b) => (
            <div key={b.branchName} className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{b.branchName}</h3>
                  <p className="text-xs text-gray-500">{b.location}</p>
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  b.status === 'normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {b.status === 'normal' ? 'Normal' : 'High Traffic'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Active Sessions</span>
                  <strong className="text-gray-800">{b.activeSessions} Chambers</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Checked-in Today</span>
                  <strong className="text-blue-700">{b.checkedInToday} / {b.totalCapacityToday}</strong>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-gray-700 flex justify-between items-center">
                <span>Avg Chamber Wait: <strong>{b.queueDelayMinutes} mins</strong></span>
                <Link href="/operations" className="text-blue-600 font-bold hover:underline">Manage →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Credential Audit Warning Banner */}
      {pendingCredsCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-black text-lg shrink-0">
              🪪
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">Action Required: {pendingCredsCount} Doctor Credential Review Pending</h3>
              <p className="text-xs text-amber-900">
                Ensure all newly onboarded physicians have verified BMDC registration before granting chamber access.
              </p>
            </div>
          </div>
          <Link
            href="/credentials"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shrink-0 shadow-xs"
          >
            Review Applications →
          </Link>
        </div>
      )}
    </div>
  );
}
