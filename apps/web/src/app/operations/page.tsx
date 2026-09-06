'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { CalendarIcon, ClockIcon, AlertCircleIcon, CheckCircleIcon } from '@medonivo/icons';

export default function OperationsPage() {
  const { branchSchedules } = useOrgAuth();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setActiveAlert(broadcastMessage.trim());
    setBroadcastMessage('');
    alert('Hospital Broadcast Alert sent to all active receptionist desks & digital queue displays!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
            Live Chamber Operations
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Multi-Branch Schedule &amp; Queue Operations</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor real-time patient traffic, chamber delays, and broadcast emergency notifications across campuses.
          </p>
        </div>
        <button
          onClick={() => {
            const msg = prompt('Enter hospital broadcast message for queue displays:');
            if (msg) setActiveAlert(msg);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
        >
          📢 Broadcast Alert
        </button>
      </div>

      {/* Broadcast Alert Banner if active */}
      {activeAlert && (
        <div className="bg-amber-500 text-slate-950 border-2 border-amber-400 p-4 rounded-3xl flex justify-between items-center shadow-md animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-lg">📢</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block">Active Campus Broadcast</span>
              <p className="text-xs font-black">{activeAlert}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveAlert(null)}
            className="text-xs font-bold bg-slate-950 text-white px-3 py-1 rounded-xl"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Branch Schedules Matrix */}
      <div className="space-y-4">
        {branchSchedules.map((b) => (
          <div key={b.branchName} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-sky-50 text-sky-800 px-2 py-0.5 rounded">
                  {b.location}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">{b.branchName}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Est. Queue Delay</span>
                  <span className={`text-sm font-black ${b.queueDelayMinutes > 15 ? 'text-red-600' : 'text-emerald-600'}`}>
                    ~{b.queueDelayMinutes} Minutes
                  </span>
                </div>
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase ${
                  b.status === 'normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {b.status}
                </span>
              </div>
            </div>

            {/* Chamber Utilization Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Daily Chamber Check-ins Throughput</span>
                <span className="text-sky-700">{b.checkedInToday} / {b.totalCapacityToday} Tokens Issued ({Math.round((b.checkedInToday / b.totalCapacityToday) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    (b.checkedInToday / b.totalCapacityToday) > 0.85 ? 'bg-amber-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${Math.round((b.checkedInToday / b.totalCapacityToday) * 100)}%` }}
                />
              </div>
            </div>

            {/* Session Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Active Sessions Today</span>
                <strong className="text-slate-900">{b.activeSessions} Chambers Operating</strong>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Reception Desks</span>
                <strong className="text-blue-700">3 Desk Operators Active</strong>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Emergency Override</span>
                <strong className="text-emerald-700">✓ Ready</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
