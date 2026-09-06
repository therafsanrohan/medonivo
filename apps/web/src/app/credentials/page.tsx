'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { ShieldCheckIcon, CheckCircleIcon, FileTextIcon } from '@medonivo/icons';

export default function CredentialsPage() {
  const { credentialReviews, reviewCredential } = useOrgAuth();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  const filteredItems = credentialReviews.filter((item) => item.status === selectedTab);

  const handleReviewAction = (id: string, action: 'approved' | 'rejected') => {
    const note = reviewNotes[id]?.trim() || (action === 'approved' ? 'BMDC registration verified successfully.' : 'Credential document missing required signature.');
    reviewCredential(id, action, note);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
            Medical HR &amp; Governance
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Doctor Credentials &amp; BMDC Verification Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Audit physician registration certificates, medical degrees, and national ID cards before granting chamber access.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-center min-w-[90px]">
            <span className="text-[10px] font-bold uppercase text-amber-800 block">Pending</span>
            <span className="text-xl font-black text-amber-900">
              {credentialReviews.filter((c) => c.status === 'pending').length}
            </span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center min-w-[90px]">
            <span className="text-[10px] font-bold uppercase text-emerald-800 block">Approved</span>
            <span className="text-xl font-black text-emerald-900">
              {credentialReviews.filter((c) => c.status === 'approved').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 text-xs font-bold">
        <button
          onClick={() => setSelectedTab('pending')}
          className={`pb-3 px-4 transition border-b-2 ${
            selectedTab === 'pending' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Pending Review ({credentialReviews.filter((c) => c.status === 'pending').length})
        </button>
        <button
          onClick={() => setSelectedTab('approved')}
          className={`pb-3 px-4 transition border-b-2 ${
            selectedTab === 'approved' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Approved ({credentialReviews.filter((c) => c.status === 'approved').length})
        </button>
        <button
          onClick={() => setSelectedTab('rejected')}
          className={`pb-3 px-4 transition border-b-2 ${
            selectedTab === 'rejected' ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Rejected ({credentialReviews.filter((c) => c.status === 'rejected').length})
        </button>
      </div>

      {/* Review Queue Items */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                      {item.specialty}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Submitted: {item.submittedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{item.doctorName}</h3>
                  <p className="text-xs text-gray-500">
                    BMDC Reg: <strong className="text-gray-800">{item.bmdcRegNumber}</strong> &bull; Graduated: {item.medicalCollege} ({item.gradYear})
                  </p>
                </div>

                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase shrink-0 ${
                  item.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Submitted Documents Inspection List */}
              <div>
                <span className="text-xs font-bold text-gray-700 block mb-2">Uploaded Governance Documents ({item.documents.length})</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.documents.map((doc, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center justify-between">
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-gray-900 block truncate">{doc.title}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">{doc.type} Document</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                        ✓ Valid
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {item.status === 'pending' ? (
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Verification Remarks / Notes</label>
                    <input
                      type="text"
                      value={reviewNotes[item.id] || ''}
                      onChange={(e) => setReviewNotes({ ...reviewNotes, [item.id]: e.target.value })}
                      placeholder="e.g. BMDC license active & verified against central registry."
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReviewAction(item.id, 'approved')}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs"
                    >
                      ✓ Approve Credentials &amp; Grant Chamber Access
                    </button>
                    <button
                      onClick={() => handleReviewAction(item.id, 'rejected')}
                      className="px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs transition"
                    >
                      Reject Application
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Auditor Remarks</span>
                  <p className="text-gray-800 font-medium">{item.reviewNotes || 'No audit remarks entered.'}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center shadow-xs">
            <CheckCircleIcon size={36} className="text-emerald-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No {selectedTab} credential applications</h3>
            <p className="text-xs text-gray-500 mt-1">All doctor credential applications in this queue have been audited.</p>
          </div>
        )}
      </div>
    </div>
  );
}
