'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDoctorAuth } from '../../../../context/DoctorAuthContext';
import { PrescriptionForm } from '../../../../components/PrescriptionForm';
import { EPrescriptionModal } from '../../../../components/EPrescriptionModal';
import { PrescribedMedicine, ConsultationRecord } from '../../../../fixtures/doctor-workspace-fixtures';
import { StethoscopeIcon, ArrowLeftIcon, CheckCircleIcon, PlusIcon, FileTextIcon, AlertCircleIcon } from '@medonivo/icons';

export default function ConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const { queue, doctor, saveConsultation } = useDoctorAuth();

  const queueId = params?.id as string;
  const patient = queue.find((q) => q.id === queueId) || queue[0];

  // Form State
  const [bpSystolic, setBpSystolic] = useState(130);
  const [bpDiastolic, setBpDiastolic] = useState(85);
  const [pulse, setPulse] = useState(76);
  const [weightKg, setWeightKg] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [tempF, setTempF] = useState(98.6);

  const [diagnosis, setDiagnosis] = useState('Essential Hypertension (Controlled)');
  const [clinicalNotes, setClinicalNotes] = useState('Patient reports occasional mild dizziness in morning. Continue low-salt diet.');

  const [medicines, setMedicines] = useState<PrescribedMedicine[]>([
    {
      id: 'med_101',
      name: 'Telmisartan 40mg',
      dosage: '1 Tablet',
      timing: '1-0-0',
      foodRelation: 'After Food',
      durationDays: 30,
      instructions: 'Take in the morning after breakfast'
    }
  ]);

  const [recommendedTests, setRecommendedTests] = useState<string[]>(['Serum Creatinine & Electrolytes']);
  const [testInput, setTestInput] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-10-06');

  // E-Prescription Modal State
  const [createdConsultation, setCreatedConsultation] = useState<ConsultationRecord | null>(null);

  const handleAddTest = () => {
    if (testInput.trim()) {
      setRecommendedTests([...recommendedTests, testInput.trim()]);
      setTestInput('');
    }
  };

  const handleRemoveTest = (test: string) => {
    setRecommendedTests(recommendedTests.filter((t) => t !== test));
  };

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();

    const record: ConsultationRecord = {
      id: `rx_${Date.now().toString().slice(-6)}`,
      queueId: patient.id,
      patientName: patient.patientName,
      date: new Date().toISOString().split('T')[0],
      vitals: {
        bpSystolic,
        bpDiastolic,
        pulse,
        weightKg,
        spo2,
        tempF
      },
      clinicalNotes,
      diagnosis,
      medicines,
      recommendedTests,
      followUpDate,
      careLoopCreated: true
    };

    saveConsultation({
      queueId: patient.id,
      patientName: patient.patientName,
      vitals: record.vitals,
      clinicalNotes,
      diagnosis,
      medicines,
      recommendedTests,
      followUpDate
    });

    setCreatedConsultation(record);
  };

  const handleModalClose = () => {
    setCreatedConsultation(null);
    router.push('/');
  };

  return (
    <div className="space-y-6">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeftIcon size={16} /> Exit Consultation
        </button>
        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          Token #{patient.token} • {patient.patientName} ({patient.age} Yrs)
        </span>
      </div>

      {/* Patient Overview Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 text-white rounded-3xl p-6 shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-sky-500/20 text-sky-200 px-3 py-1 rounded-full mb-2 inline-block">
              {patient.carePassLabel}
            </span>
            <h1 className="text-2xl font-bold tracking-tight">{patient.patientName}</h1>
            <p className="text-xs text-sky-200 mt-0.5">
              MRN/Phone: {patient.mrnPhone} &bull; Chief Complaint: &ldquo;{patient.chiefComplaint}&rdquo;
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 block">Lead Physician</span>
            <span className="text-xs font-bold text-white block">{doctor.name}</span>
          </div>
        </div>

        {/* Known Allergies Alert Chip */}
        {patient.allergies.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs">
            <AlertCircleIcon size={16} className="text-amber-400 shrink-0" />
            <span className="font-bold text-amber-200">Patient Allergies:</span>
            <div className="flex gap-1.5">
              {patient.allergies.map((alg) => (
                <span key={alg} className="bg-red-500/30 text-red-100 border border-red-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {alg}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmitConsultation} className="space-y-6">
        {/* Section 1: Vitals */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            1. Patient Vitals
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">BP Systolic</label>
              <input
                type="number"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">BP Diastolic</label>
              <input
                type="number"
                value={bpDiastolic}
                onChange={(e) => setBpDiastolic(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Pulse (bpm)</label>
              <input
                type="number"
                value={pulse}
                onChange={(e) => setPulse(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">SpO2 (%)</label>
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Temp (°F)</label>
              <input
                type="number"
                step="0.1"
                value={tempF}
                onChange={(e) => setTempF(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Diagnosis & Notes */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            2. Clinical Diagnosis &amp; Notes
          </h3>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Primary Diagnosis</label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Clinical Impressions &amp; Lifestyle Guidance</label>
            <textarea
              rows={3}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Section 3: E-Prescription Builder with Allergy Safety */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            3. E-Prescription Builder &amp; Allergy Cross-Checking
          </h3>
          <PrescriptionForm
            medicines={medicines}
            onChange={setMedicines}
            patientAllergies={patient.allergies}
          />
        </div>

        {/* Section 4: Recommended Lab Tests & CareLoop Follow-up */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            4. Recommended Lab Tests &amp; CareLoop Follow-up Date
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Recommended Diagnostic Tests</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="e.g. Echocardiogram, Lipid Profile..."
                className="flex-1 p-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={handleAddTest}
                className="px-4 py-2.5 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-900 transition"
              >
                + Add Test
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recommendedTests.map((t) => (
                <span key={t} className="bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-2">
                  {t}
                  <button type="button" onClick={() => handleRemoveTest(t)} className="text-red-500 hover:text-red-700 font-black">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Follow-up Consultation Date</label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full sm:w-64 p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Submit & Generate CareLoop CTA */}
        <div className="p-4 bg-sky-900 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold">Ready to Complete Consultation?</h4>
            <p className="text-xs text-sky-200">
              Submitting will issue the digital e-prescription &amp; auto-generate CareLoop tasks for {patient.patientName}.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircleIcon size={18} /> Submit Consultation &amp; Preview Rx
          </button>
        </div>
      </form>

      {/* Digital E-Prescription Modal Preview */}
      {createdConsultation && (
        <EPrescriptionModal
          consultation={createdConsultation}
          doctorName={doctor.name}
          doctorReg={doctor.regNumber}
          doctorSpecialty={doctor.specialty}
          branch={doctor.currentBranch}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
