'use client';

import React from 'react';
import { ConsultationRecord } from '../fixtures/doctor-workspace-fixtures';
import { CheckCircleIcon, FileTextIcon, StethoscopeIcon } from '@medonivo/icons';

interface EPrescriptionModalProps {
  consultation: ConsultationRecord;
  doctorName: string;
  doctorReg: string;
  doctorSpecialty: string;
  branch: string;
  onClose: () => void;
}

export function EPrescriptionModal({
  consultation,
  doctorName,
  doctorReg,
  doctorSpecialty,
  branch,
  onClose
}: EPrescriptionModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-gray-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Notification Bar */}
        <div className="bg-emerald-600 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircleIcon size={18} />
            <span>Consultation Saved &bull; E-Prescription Issued &bull; CareLoop Active</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-emerald-100 font-black text-sm"
          >
            Close
          </button>
        </div>

        {/* E-Prescription Document Canvas */}
        <div className="p-8 space-y-6 text-gray-900 bg-white" id="printable-prescription">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-sky-700 tracking-widest uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Official Digital Prescription
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{doctorName}</h2>
              <p className="text-xs font-bold text-gray-600">{doctorSpecialty}</p>
              <p className="text-[11px] text-gray-500">BMDC Reg No: {doctorReg} &bull; {branch}</p>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl">
                <StethoscopeIcon size={16} className="text-sky-700" /> MEDONIVO CARE
              </div>
              <p className="text-[11px] font-bold text-gray-500 mt-1">Rx Ref: #{consultation.id}</p>
              <p className="text-[11px] text-gray-400">Date: {consultation.date}</p>
            </div>
          </div>

          {/* Patient Details Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Patient Name</span>
              <strong className="text-slate-900">{consultation.patientName}</strong>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Follow-up Date</span>
              <strong className="text-sky-700">{consultation.followUpDate}</strong>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Vitals (BP / Pulse)</span>
              <strong className="text-slate-800">
                {consultation.vitals.bpSystolic}/{consultation.vitals.bpDiastolic} mmHg &bull; {consultation.vitals.pulse} bpm
              </strong>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Weight / SpO2</span>
              <strong className="text-slate-800">
                {consultation.vitals.weightKg} kg &bull; {consultation.vitals.spo2}%
              </strong>
            </div>
          </div>

          {/* Clinical Impression / Diagnosis */}
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Diagnosis &amp; Remarks</span>
            <p className="text-sm font-bold text-slate-900 bg-amber-50/60 border border-amber-200 p-3 rounded-xl">
              {consultation.diagnosis}
            </p>
            {consultation.clinicalNotes && (
              <p className="text-xs text-gray-600 italic px-1 mt-1">&ldquo;{consultation.clinicalNotes}&rdquo;</p>
            )}
          </div>

          {/* Rx Medication Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-gray-200 pb-1">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 flex items-center gap-1">
                <FileTextIcon size={16} /> Rx Prescribed Medications ({consultation.medicines.length})
              </span>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Medicine</th>
                    <th className="p-3">Dose &amp; Timing</th>
                    <th className="p-3">Food</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {consultation.medicines.map((med, idx) => (
                    <tr key={med.id} className="hover:bg-slate-50">
                      <td className="p-3 text-gray-400 font-bold">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {med.name}
                        {med.instructions && (
                          <span className="block text-[10px] text-gray-500 font-normal italic">{med.instructions}</span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-sky-700">{med.timing} ({med.dosage})</td>
                      <td className="p-3 text-gray-700">{med.foodRelation}</td>
                      <td className="p-3 font-semibold text-slate-800">{med.durationDays} Days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Tests & CareLoop Task Summary */}
          {consultation.recommendedTests.length > 0 && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-black uppercase text-sky-900 block">Recommended Diagnostics &amp; Lab Tests</span>
              <div className="flex flex-wrap gap-2">
                {consultation.recommendedTests.map((t) => (
                  <span key={t} className="bg-white text-sky-800 border border-sky-300 font-bold px-3 py-1 rounded-xl text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification QR Footer */}
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 text-white font-mono text-[9px] flex items-center justify-center p-1 rounded-xl text-center leading-tight">
                QR VERIFIED
              </div>
              <div>
                <p className="font-bold text-gray-800">Digitally Verified via Medonivo Network</p>
                <p className="text-[10px]">Patients can view this Rx in their Care Pass portal</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Doctor Signature</span>
              <span className="font-serif italic font-bold text-slate-900 text-sm">{doctorName}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 border-t border-gray-200 p-4 flex gap-3 justify-end">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-slate-700 font-bold text-xs hover:bg-gray-100 transition"
          >
            Print Prescription
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs transition shadow-sm"
          >
            Done &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
