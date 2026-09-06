'use client';

import React, { useState } from 'react';
import { useDoctorAuth } from '../../../context/DoctorAuthContext';
import { CheckCircleIcon, AlertCircleIcon, FileTextIcon } from '@medonivo/icons';

export default function ReportsPage() {
  const { pendingReports, reviewReport } = useDoctorAuth();
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});
  const [selectedTab, setSelectedTab] = useState<'pending' | 'reviewed'>('pending');

  const filteredReports = pendingReports.filter((r) => r.status === (selectedTab === 'pending' ? 'pending_review' : 'reviewed'));

  const handleSetNote = (id: string, val: string) => {
    setNoteInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleReviewReport = (id: string) => {
    const note = noteInputs[id]?.trim() || 'Reviewed. No additional remarks.';
    reviewReport(id, note);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">
            Diagnostic Report Hub
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Patient Lab Report Reviews</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review submitted lab results, add clinical interpretations, and trigger patient follow-ups.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-center">
            <span className="text-[10px] font-bold uppercase text-amber-700 block">Pending</span>
            <span className="text-xl font-black text-amber-900">
              {pendingReports.filter((r) => r.status === 'pending_review').length}
            </span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center">
            <span className="text-[10px] font-bold uppercase text-emerald-700 block">Reviewed</span>
            <span className="text-xl font-black text-emerald-900">
              {pendingReports.filter((r) => r.status === 'reviewed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setSelectedTab('pending')}
          className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
            selectedTab === 'pending' ? 'border-sky-600 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Pending Review ({pendingReports.filter((r) => r.status === 'pending_review').length})
        </button>
        <button
          onClick={() => setSelectedTab('reviewed')}
          className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
            selectedTab === 'reviewed' ? 'border-sky-600 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Reviewed ({pendingReports.filter((r) => r.status === 'reviewed').length})
        </button>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? filteredReports.map((report) => (
          <div key={report.id} className={`bg-white rounded-3xl border p-6 shadow-xs transition ${
            report.urgency === 'high' && report.status === 'pending_review'
              ? 'border-amber-300 ring-1 ring-amber-200'
              : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {report.urgency === 'high' && report.status === 'pending_review' && (
                    <span className="text-[10px] font-black bg-red-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Urgent Review
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{report.category}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{report.testTitle}</h3>
                <p className="text-xs text-gray-500">
                  Patient: <strong className="text-gray-700">{report.patientName}</strong> • Submitted: {report.submittedDate} • Facility: {report.facility}
                </p>
              </div>
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0 ${
                report.status === 'reviewed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {report.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
              </span>
            </div>

            {report.status === 'reviewed' && report.doctorNote ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-1">Doctor&apos;s Clinical Note</span>
                <p className="text-xs text-emerald-900 font-medium">{report.doctorNote}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-200 bg-gray-50/60 p-4 rounded-2xl text-center">
                  <FileTextIcon size={24} className="text-gray-300 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Lab report document preview (click to expand in production viewer)</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Add Clinical Interpretation / Doctor Note</label>
                  <textarea
                    rows={2}
                    value={noteInputs[report.id] || ''}
                    onChange={(e) => handleSetNote(report.id, e.target.value)}
                    placeholder="e.g. LDL slightly elevated at 142 mg/dL. Continue statin therapy and repeat in 3 months..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleReviewReport(report.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircleIcon size={16} /> Mark as Reviewed
                  </button>
                  <button
                    onClick={() => alert(`Follow-up task triggered for ${report.patientName}`)}
                    className="px-4 py-2.5 rounded-xl border border-sky-300 text-sky-700 text-xs font-bold hover:bg-sky-50 transition"
                  >
                    Trigger Patient Follow-up
                  </button>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center shadow-xs">
            <CheckCircleIcon size={36} className="text-emerald-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No {selectedTab} reports</h3>
            <p className="text-xs text-gray-500 mt-1">All submitted patient lab reports have been reviewed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
