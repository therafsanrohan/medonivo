'use client';

import React, { useState } from 'react';
import { usePatientAuth } from '../context/PatientAuthContext';
import { NeedsAttentionBanner } from '../components/NeedsAttentionBanner';
import { CareLoopCard } from '../components/CareLoopCard';
import { EmergencyCard } from '../components/EmergencyCard';
import { BookingModal } from '../components/BookingModal';
import { Doctor } from '../fixtures/patient-fixtures';
import {
  CalendarIcon,
  FileTextIcon,
  ShieldCheckIcon,
  UserIcon,
  StethoscopeIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlusIcon,
  ArrowRightIcon,
  ClockIcon
} from '@medonivo/icons';
import Link from 'next/link';

export default function CareHomePage() {
  const { activeMember, careLoops, medicines, appointments, toggleMedicineTaken, doctors } = usePatientAuth();
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const memberLoops = careLoops.filter((cl) => cl.memberId === activeMember.id && cl.status === 'active');
  const memberMeds = medicines.filter((m) => m.memberId === activeMember.id);
  const memberAppointments = appointments.filter((a) => a.memberId === activeMember.id && a.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* CarePass Status Hero Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-900 to-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3 py-1 rounded-full mb-2">
              {activeMember.carePassPlan}
            </span>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {activeMember.name} 👋
            </h1>
            <p className="text-xs text-sky-100/90 mt-1 max-w-lg leading-relaxed">
              Included consultations remaining: <strong className="text-amber-300 font-bold">{activeMember.includedConsultations} Free Slots</strong> this month with <strong className="text-emerald-300">{activeMember.diagnosticDiscountPercent}% off</strong> diagnostic tests.
            </p>
          </div>

          <Link
            href="/emergency"
            className="hidden sm:flex items-center gap-1.5 bg-white text-sky-900 hover:bg-sky-50 px-3.5 py-2 rounded-2xl text-xs font-bold transition shadow-sm"
          >
            <ShieldCheckIcon size={16} className="text-red-600" /> Emergency Pass
          </Link>
        </div>
      </div>

      {/* Needs Attention Smart Banner */}
      <NeedsAttentionBanner />

      {/* Quick Healthcare Action Bar */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Quick Healthcare Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/doctors"
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-sky-400 hover:shadow-md transition text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <CalendarIcon size={20} />
            </div>
            <span className="text-xs font-bold text-gray-800 block">Book Doctor</span>
            <span className="text-[10px] text-gray-400">Search &amp; Token</span>
          </Link>

          <Link
            href="/careloops"
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-sky-400 hover:shadow-md transition text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <StethoscopeIcon size={20} />
            </div>
            <span className="text-xs font-bold text-gray-800 block">Active CareLoops</span>
            <span className="text-[10px] text-gray-400">{memberLoops.length} Ongoing</span>
          </Link>

          <Link
            href="/medicines"
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-sky-400 hover:shadow-md transition text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <AlertCircleIcon size={20} />
            </div>
            <span className="text-xs font-bold text-gray-800 block">Medicine Schedule</span>
            <span className="text-[10px] text-gray-400">{memberMeds.filter(m => !m.takenToday).length} Pending</span>
          </Link>

          <Link
            href="/family"
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-sky-400 hover:shadow-md transition text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <UserIcon size={20} />
            </div>
            <span className="text-xs font-bold text-gray-800 block">Family Hub</span>
            <span className="text-[10px] text-gray-400">Switch Profiles</span>
          </Link>
        </div>
      </div>

      {/* Active CareLoops Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Active CareLoops ({memberLoops.length})
          </h2>
          <Link href="/careloops" className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1">
            View All <ArrowRightIcon size={14} />
          </Link>
        </div>

        {memberLoops.length > 0 ? (
          <div className="space-y-4">
            {memberLoops.map((loop) => (
              <CareLoopCard key={loop.id} careLoop={loop} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center">
            <StethoscopeIcon size={32} className="text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-700">No active CareLoops for {activeMember.name}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">Book a doctor consultation to start an automated care journey.</p>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Book Doctor Consultation
            </Link>
          </div>
        )}
      </div>

      {/* Today's Medicine Checklist */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Today&apos;s Medicine Schedule
          </h2>
          <Link href="/medicines" className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1">
            Manage Medicines <ArrowRightIcon size={14} />
          </Link>
        </div>

        {memberMeds.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5 shadow-xs">
            {memberMeds.map((med) => (
              <div
                key={med.id}
                onClick={() => toggleMedicineTaken(med.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-sky-50/50 border border-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={med.takenToday}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <div>
                    <h4 className={`text-xs font-bold ${med.takenToday ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {med.name} ({med.dosage})
                    </h4>
                    <span className="text-[11px] text-gray-500">{med.frequency}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  med.takenToday ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {med.takenToday ? 'Taken' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center text-xs text-gray-500">
            No prescribed medicines logged for {activeMember.name}.
          </div>
        )}
      </div>

      {/* Active Appointments & Queue Status */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Upcoming Appointments &amp; Queue Status
          </h2>
          <Link href="/doctors" className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1">
            Book New <PlusIcon size={14} />
          </Link>
        </div>

        {memberAppointments.length > 0 ? (
          <div className="space-y-3">
            {memberAppointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    Token #{apt.queueToken}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-1">{apt.doctorName}</h3>
                  <p className="text-xs text-gray-500">{apt.specialty} • {apt.branch}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-1 flex items-center gap-1">
                    <ClockIcon size={14} className="text-sky-600" /> {apt.date} at {apt.slot}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Self Check-in verified for Token #${apt.queueToken} at ${apt.branch}`)}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  Digital Check-in
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center text-xs text-gray-500">
            No upcoming appointments scheduled for {activeMember.name}.
          </div>
        )}
      </div>

      {/* Booking Modal (if opened) */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
        />
      )}
    </div>
  );
}
