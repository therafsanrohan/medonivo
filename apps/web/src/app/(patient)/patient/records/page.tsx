'use client';

import React, { useState } from 'react';
import { usePatientAuth } from '@/context/PatientAuthContext';
import { FileTextIcon, PlusIcon, UploadCloudIcon, SearchIcon, StethoscopeIcon } from '@medonivo/icons';

export default function RecordsPage() {
  const { activeMember, records, addHealthRecord } = usePatientAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'prescription' | 'lab_report' | 'hospital_summary' | 'vaccination'>('lab_report');
  const [facilityName, setFacilityName] = useState('Dhanmondi Central Diagnostics');
  const [doctorName, setDoctorName] = useState('');

  const memberRecords = records.filter((r) => r.memberId === activeMember.id);
  const filteredRecords = memberRecords.filter((r) => selectedCategory === 'all' || r.category === selectedCategory);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHealthRecord({
      memberId: activeMember.id,
      title,
      category,
      date: new Date().toISOString().split('T')[0],
      facilityName,
      doctorName: doctorName || undefined,
      fileSize: '1.2 MB'
    });

    setTitle('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
            Digital Health Vault
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            Health Records &amp; Documents
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Prescriptions, lab reports, discharge summaries, and vaccination certificates for {activeMember.name}.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm shrink-0"
        >
          <UploadCloudIcon size={16} /> Upload Record
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Documents' },
          { key: 'prescription', label: 'Prescriptions' },
          { key: 'lab_report', label: 'Lab Reports' },
          { key: 'hospital_summary', label: 'Hospital Summaries' },
          { key: 'vaccination', label: 'Vaccination Cards' }
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat.key
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((rec) => (
            <div key={rec.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
                    {rec.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-gray-400 font-semibold">{rec.date}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 leading-snug">{rec.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Facility: <strong className="text-gray-700">{rec.facilityName}</strong>
                </p>
                {rec.doctorName && (
                  <p className="text-xs text-gray-500">
                    Prescribed by: <strong className="text-gray-700">{rec.doctorName}</strong>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-semibold">{rec.fileSize || 'PDF Document'}</span>
                <button
                  onClick={() => alert(`Opening preview for ${rec.title}`)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 border border-sky-200 hover:bg-sky-50 px-3 py-1.5 rounded-xl transition"
                >
                  View Record
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 col-span-2">
            <FileTextIcon size={36} className="text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No records found</h3>
            <p className="text-xs text-gray-500 mt-1">Upload prescriptions or lab reports to attach them to your CareLoops.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Upload Medical Document</h3>
            <p className="text-xs text-gray-500 mb-4">Add a new record for {activeMember.name}.</p>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Echocardiogram Report"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                >
                  <option value="lab_report">Lab Report</option>
                  <option value="prescription">Prescription</option>
                  <option value="hospital_summary">Hospital Discharge Summary</option>
                  <option value="vaccination">Vaccination Record</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Clinic / Hospital Facility</label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Doctor Name (Optional)</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Prof. Shamsul Huda"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              {/* Simulated File Drag Drop Box */}
              <div className="border-2 border-dashed border-sky-200 bg-sky-50/50 rounded-2xl p-4 text-center">
                <UploadCloudIcon size={24} className="text-sky-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-sky-900 block">Drag &amp; drop PDF/Image here</span>
                <span className="text-[10px] text-sky-700">Simulated upload enabled</span>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
