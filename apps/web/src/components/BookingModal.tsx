'use client';

import React, { useState } from 'react';
import { Doctor } from '../fixtures/patient-fixtures';
import { usePatientAuth } from '../context/PatientAuthContext';
import { CalendarIcon, ClockIcon, CheckCircleIcon, UserIcon, XIcon, ShieldCheckIcon } from '@medonivo/icons';

interface BookingModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export function BookingModal({ doctor, onClose }: BookingModalProps) {
  const { members, activeMemberId, bookAppointment } = usePatientAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedMemberId, setSelectedMemberId] = useState<string>(activeMemberId);
  const [reason, setReason] = useState<string>('');
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  if (!doctor) return null;

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedSlot) {
      alert('Please select an available appointment slot.');
      return;
    }
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const selectedMem = members.find((m) => m.id === selectedMemberId) || members[0];
      const result = bookAppointment({
        memberId: selectedMem.id,
        memberName: selectedMem.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        branch: doctor.branch,
        date: 'Tomorrow',
        slot: selectedSlot
      });
      setCreatedBooking(result);
      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white p-5 flex justify-between items-center shrink-0">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              Step {step} of 3 • Doctor Booking
            </span>
            <h3 className="text-lg font-bold mt-1">{doctor.name}</h3>
            <p className="text-xs text-sky-200">{doctor.specialty} • {doctor.branch}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <CalendarIcon size={18} className="text-sky-600" /> 1. Choose Available Slot (Tomorrow)
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Consultation Fee: <strong className="text-gray-800">৳{doctor.consultationFee} BDT</strong> (CarePass Discounts Applied)
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {doctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleSlotSelect(slot)}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                      selectedSlot === slot
                        ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/30'
                        : 'border-gray-200 hover:border-sky-300 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ClockIcon size={14} className="text-sky-600" /> {slot}
                    </span>
                    {selectedSlot === slot && <CheckCircleIcon size={16} className="text-sky-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <UserIcon size={18} className="text-sky-600" /> 2. Patient & Symptom Details
              </h4>
              
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select Patient Profile:
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {members.map((mem) => (
                  <button
                    key={mem.id}
                    onClick={() => setSelectedMemberId(mem.id)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition ${
                      selectedMemberId === mem.id
                        ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{mem.name}</div>
                    <div className="text-[10px] text-gray-500">{mem.relation} ({mem.age} Yrs)</div>
                  </button>
                ))}
              </div>

              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Reason for Visit / Main Symptoms:
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Chest tightness, blood pressure follow-up, general checkup..."
                className="w-full h-24 p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
          )}

          {step === 3 && createdBooking && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon size={36} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Appointment Confirmed!</h4>
              <p className="text-xs text-gray-500 mb-6">
                Digital Token generated for {createdBooking.memberName}
              </p>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center mb-6">
                <span className="text-xs text-sky-700 uppercase font-semibold tracking-wider block mb-1">Queue Token Number</span>
                <span className="text-3xl font-black text-sky-900 tracking-tight">{createdBooking.queueToken}</span>
                <div className="text-xs text-sky-800 font-medium mt-2">
                  {createdBooking.date} at {createdBooking.slot} • {createdBooking.branch}
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <ShieldCheckIcon size={16} className="text-emerald-600" />
                SMS & CarePass notifications dispatched.
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
          {step < 3 ? (
            <>
              <button
                onClick={() => (step > 1 ? setStep((step - 1) as any) : onClose())}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleNextStep}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-md"
              >
                {step === 1 ? 'Continue' : 'Confirm & Book Slot'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md"
            >
              Done & Return to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
