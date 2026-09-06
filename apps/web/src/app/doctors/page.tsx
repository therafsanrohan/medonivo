'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { OrgDoctor } from '../../fixtures/org-fixtures';
import { SearchIcon, UserIcon, ShieldCheckIcon, PlusIcon, StethoscopeIcon } from '@medonivo/icons';

export default function DoctorsPage() {
  const { doctors, selectedBranch, inviteDoctor } = useOrgAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<OrgDoctor | null>(null);

  // Invite Doctor Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteSpecialty, setInviteSpecialty] = useState('Cardiology');
  const [inviteRegNumber, setInviteRegNumber] = useState('BMDC-A-99');
  const [inviteBranch, setInviteBranch] = useState('Dhanmondi Central Campus');
  const [inviteFee, setInviteFee] = useState(1200);

  const specialties = ['All', 'Cardiology', 'Endocrinology', 'Orthopedics', 'Neurology', 'Pediatrics'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesBranch = selectedBranch === 'All Campuses' || doc.branch.toLowerCase().includes(selectedBranch.toLowerCase().split(' ')[0]);
    const matchesSpecialty = specialtyFilter === 'All' || doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSpecialty && matchesSearch;
  });

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteRegNumber.trim()) return;

    inviteDoctor({
      name: inviteName.trim(),
      specialty: inviteSpecialty,
      regNumber: inviteRegNumber.trim(),
      branch: inviteBranch,
      department: inviteSpecialty,
      status: 'pending_verification',
      statusLabel: 'Pending Credentials Check',
      consultationFee: Number(inviteFee) || 1200,
      bmdcVerified: false
    });

    alert(`Invitation sent to ${inviteName}! Added to roster pending BMDC verification.`);
    setIsInviteModalOpen(false);
    setInviteName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
            Physician Management
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Hospital Doctor Directory</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage affiliated doctors, check BMDC credential status, and assign chamber hours across campuses.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <PlusIcon size={16} /> Onboard New Doctor
        </button>
      </div>

      {/* Filters Row */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <SearchIcon size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor name, BMDC number, specialty..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-500 shrink-0">Specialty:</span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition shrink-0 border ${
                specialtyFilter === spec
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs hover:border-blue-300 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 font-black text-sm flex items-center justify-center">
                    {doc.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{doc.name}</h3>
                    <p className="text-xs text-blue-700 font-semibold">{doc.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>BMDC Registration:</span>
                  <strong className="text-slate-900">{doc.regNumber}</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Assigned Branch:</span>
                  <strong className="text-slate-800 truncate max-w-[130px]">{doc.branch}</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Consultation Fee:</span>
                  <strong className="text-emerald-700">BDT {doc.consultationFee}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                doc.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800'
                  : doc.status === 'on_leave'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800 animate-pulse'
              }`}>
                {doc.statusLabel}
              </span>

              <button
                onClick={() => setSelectedDoctor(doc)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedDoctor.department}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-1">{selectedDoctor.name}</h2>
                <p className="text-xs text-gray-500">{selectedDoctor.specialty}</p>
              </div>
              <button onClick={() => setSelectedDoctor(null)} className="text-gray-400 font-bold hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between">
                <span className="text-gray-500 font-bold">BMDC License:</span>
                <span className="font-extrabold text-slate-900">{selectedDoctor.regNumber}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between">
                <span className="text-gray-500 font-bold">Verification Status:</span>
                <span className={`font-bold ${selectedDoctor.bmdcVerified ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {selectedDoctor.bmdcVerified ? '✓ BMDC Verified' : 'Pending Audit'}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between">
                <span className="text-gray-500 font-bold">Patients Consulted (This Month):</span>
                <span className="font-extrabold text-blue-700">{selectedDoctor.patientsThisMonth} Patients</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-full py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard New Doctor Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateInvite}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Onboard New Physician to Network</h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-400 font-bold hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Doctor Name</label>
              <input
                type="text"
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="e.g. Dr. Sabrina Parveen"
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">BMDC Reg Number</label>
                <input
                  type="text"
                  required
                  value={inviteRegNumber}
                  onChange={(e) => setInviteRegNumber(e.target.value)}
                  placeholder="BMDC-A-99012"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Specialty</label>
                <select
                  value={inviteSpecialty}
                  onChange={(e) => setInviteSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Branch</label>
                <select
                  value={inviteBranch}
                  onChange={(e) => setInviteBranch(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                >
                  <option value="Dhanmondi Central Campus">Dhanmondi Campus</option>
                  <option value="Uttara Branch">Uttara Branch</option>
                  <option value="Banani Specialty Wing">Banani Wing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Consultation Fee (BDT)</label>
                <input
                  type="number"
                  value={inviteFee}
                  onChange={(e) => setInviteFee(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
              >
                Send Onboarding Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
