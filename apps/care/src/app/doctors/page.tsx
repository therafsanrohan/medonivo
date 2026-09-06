/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { usePatientAuth } from '../../context/PatientAuthContext';
import { Doctor } from '../../fixtures/patient-fixtures';
import { BookingModal } from '../../components/BookingModal';
import { CalendarIcon, SearchIcon, StethoscopeIcon, StarIcon, MapPinIcon, ClockIcon } from '@medonivo/icons';

export default function DoctorsPage() {
  const { doctors, appointments, activeMember } = usePatientAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const specialties = ['All', 'Cardiology', 'Internal Medicine', 'Pediatrics & Child Health', 'Endocrinology & Diabetes'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.branch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
          Doctor Directory &amp; Booking
        </span>
        <h1 className="text-xl font-bold text-gray-900 mt-1">
          Search Doctors &amp; Reserve Digital Queue Tokens
        </h1>
        <p className="text-xs text-gray-500 mt-0.5 mb-4">
          Book verified specialists across Medonivo clinics with CarePass discounts applied.
        </p>

        {/* Search & Specialty Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor name, specialty, branch..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-700 outline-none bg-white"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex gap-4 items-start mb-3">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {doc.specialty}
                    </span>
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                      <StarIcon size={12} /> {doc.rating} ({doc.reviewCount})
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{doc.name}</h3>
                  <p className="text-[11px] text-gray-500">{doc.qualification}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <MapPinIcon size={14} className="text-gray-400" />
                  <span>Branch: <strong className="text-gray-800">{doc.branch}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ClockIcon size={14} className="text-gray-400" />
                  <span>Available: <strong className="text-gray-800">{doc.availableDays.join(', ')}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Consultation Fee</span>
                <span className="text-sm font-black text-gray-900">৳{doc.consultationFee} BDT</span>
              </div>
              <button
                onClick={() => setSelectedDoctorForBooking(doc)}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
        />
      )}
    </div>
  );
}
