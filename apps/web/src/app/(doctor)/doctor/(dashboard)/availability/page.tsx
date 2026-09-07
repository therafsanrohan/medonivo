'use client';

import React from 'react';
import { useDoctorAuth } from '@/context/doctor/DoctorAuthContext';
import { CalendarIcon, CheckCircleIcon, AlertCircleIcon } from '@medonivo/icons';

export default function AvailabilityPage() {
  const { schedules, updateSchedule } = useDoctorAuth();

  const dayOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (branch: string, day: string) => {
    const schedule = schedules.find((s) => s.branch === branch);
    if (!schedule) return;
    const days = schedule.days.includes(day)
      ? schedule.days.filter((d) => d !== day)
      : [...schedule.days, day];
    updateSchedule(branch, { days });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
          Scheduling & Slot Management
        </span>
        <h1 className="text-xl font-bold text-gray-900 mt-1">Chamber Schedule & Availability</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure your consultation hours, available days, slot duration, and patient booking capacity per branch.
        </p>
      </div>

      {/* Schedule Cards per Branch */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.branch} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">{schedule.branch}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Current hours: {schedule.hours}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  schedule.isAcceptingBookings
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {schedule.isAcceptingBookings ? 'Accepting Bookings' : 'Bookings Closed'}
                </span>
                <button
                  onClick={() => updateSchedule(schedule.branch, { isAcceptingBookings: !schedule.isAcceptingBookings })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    schedule.isAcceptingBookings
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {schedule.isAcceptingBookings ? 'Close Bookings' : 'Open Bookings'}
                </button>
              </div>
            </div>

            {/* Day Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-700 mb-2">Available Days</label>
              <div className="flex flex-wrap gap-2">
                {dayOptions.map((day) => {
                  const isSelected = schedule.days.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(schedule.branch, day)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-sky-400'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot Duration & Max Patients */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Slot Duration (Minutes)
                </label>
                <select
                  value={schedule.slotDurationMinutes}
                  onChange={(e) => updateSchedule(schedule.branch, { slotDurationMinutes: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none bg-white"
                >
                  <option value={10}>10 min (Quick Follow-up)</option>
                  <option value={15}>15 min (Standard)</option>
                  <option value={20}>20 min (Detailed Consultation)</option>
                  <option value={30}>30 min (Complex Case)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Max Patients Per Session
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={schedule.maxPatientsPerDay}
                  onChange={(e) => updateSchedule(schedule.branch, { maxPatientsPerDay: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                />
              </div>
            </div>

            {/* Chamber Hours Range */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Chamber Hours</label>
              <input
                type="text"
                defaultValue={schedule.hours}
                onBlur={(e) => updateSchedule(schedule.branch, { hours: e.target.value })}
                placeholder="e.g. 04:00 PM - 08:00 PM"
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Summary Badge */}
            <div className="mt-4 p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-xs font-medium text-sky-900 flex items-center gap-2">
              <CalendarIcon size={16} className="text-sky-600 shrink-0" />
              <span>
                Running <strong>{schedule.days.join(', ')}</strong> for <strong>{schedule.hours}</strong> with <strong>{schedule.slotDurationMinutes}-min</strong> slots (max <strong>{schedule.maxPatientsPerDay} patients/session</strong>).
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
