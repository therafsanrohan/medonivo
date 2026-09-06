'use client';

import React, { useState } from 'react';
import { PrescribedMedicine, availableMedicineDatabase } from '../fixtures/doctor-workspace-fixtures';
import { PlusIcon, TrashIcon, AlertCircleIcon, CheckCircleIcon } from '@medonivo/icons';

interface PrescriptionFormProps {
  medicines: PrescribedMedicine[];
  onChange: (medicines: PrescribedMedicine[]) => void;
  patientAllergies?: string[];
}

export function PrescriptionForm({ medicines, onChange, patientAllergies = [] }: PrescriptionFormProps) {
  const [name, setName] = useState(availableMedicineDatabase[0]);
  const [customNameInput, setCustomNameInput] = useState('');
  const [useCustomName, setUseCustomName] = useState(false);
  const [dosage, setDosage] = useState('1 Tablet');
  const [timing, setTiming] = useState('1-0-1');
  const [foodRelation, setFoodRelation] = useState<'Before Food' | 'After Food' | 'With Food'>('After Food');
  const [durationDays, setDurationDays] = useState(14);
  const [instructions, setInstructions] = useState('Take with full glass of water');

  const selectedMedName = useCustomName ? customNameInput : name;

  // Allergy warning cross-checking logic
  const allergyWarning = patientAllergies.find((allergy) => {
    const medLower = selectedMedName.toLowerCase();
    const allergyLower = allergy.toLowerCase();
    return (
      medLower.includes(allergyLower) ||
      (allergyLower.includes('penicillin') && (medLower.includes('amoxicillin') || medLower.includes('ampicillin'))) ||
      (allergyLower.includes('sulfa') && medLower.includes('co-trimoxazole')) ||
      (allergyLower.includes('aspirin') && (medLower.includes('aspirin') || medLower.includes('ecosprin')))
    );
  });

  const handleAddMedicine = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedMedName.trim()) return;

    const newMed: PrescribedMedicine = {
      id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: selectedMedName.trim(),
      dosage,
      timing,
      foodRelation,
      durationDays: Number(durationDays) || 7,
      instructions
    };

    onChange([...medicines, newMed]);

    // Reset optional custom input
    if (useCustomName) setCustomNameInput('');
  };

  const handleRemoveMedicine = (id: string) => {
    onChange(medicines.filter((m) => m.id !== id));
  };

  const timingPresets = ['1-0-1', '1-0-0', '0-0-1', '1-1-1', '0-1-0'];
  const durationPresets = [7, 14, 30, 90];

  return (
    <div className="space-y-4">
      {/* Allergy Warning Alert if triggered */}
      {allergyWarning && (
        <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl flex items-start gap-3 text-red-900 shadow-sm animate-pulse">
          <AlertCircleIcon size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-700 block">Allergy Risk Alert</span>
            <p className="text-xs font-medium mt-0.5">
              Patient has a documented allergy to <strong className="font-extrabold underline">{allergyWarning}</strong>. Exercise extreme caution before prescribing <strong className="font-extrabold">{selectedMedName}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Add Medicine Form Card */}
      <div className="bg-sky-50/70 border border-sky-200 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
            <PlusIcon size={16} className="text-sky-600" /> Add Prescribed Medication
          </h4>
          <button
            type="button"
            onClick={() => setUseCustomName(!useCustomName)}
            className="text-[11px] font-bold text-sky-700 hover:underline"
          >
            {useCustomName ? 'Select from catalog' : '+ Custom drug formulation'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Medicine Name &amp; Strength</label>
            {useCustomName ? (
              <input
                type="text"
                value={customNameInput}
                onChange={(e) => setCustomNameInput(e.target.value)}
                placeholder="Enter drug name and dose..."
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold outline-none bg-white focus:ring-2 focus:ring-sky-500"
              />
            ) : (
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold outline-none bg-white focus:ring-2 focus:ring-sky-500"
              >
                {availableMedicineDatabase.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Dosage Form</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 1 Tablet / 5ml / 1 Capsule"
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold outline-none bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Quick Timing Chips */}
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Timing (M-A-N)</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {timingPresets.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTiming(t)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                  timing === t
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-sky-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Food Relation</label>
            <select
              value={foodRelation}
              onChange={(e) => setFoodRelation(e.target.value as any)}
              className="w-full p-2 rounded-xl border border-gray-300 text-xs font-bold outline-none bg-white focus:ring-2 focus:ring-sky-500"
            >
              <option value="After Food">After Food</option>
              <option value="Before Food">Before Food</option>
              <option value="With Food">With Food</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Duration (Days)</label>
            <input
              type="number"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full p-2 rounded-xl border border-gray-300 text-xs font-bold outline-none bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Duration Presets</label>
            <div className="flex gap-1">
              {durationPresets.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDurationDays(d)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                    durationDays === d
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Special Patient Instructions</label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Take with warm water in morning, do not stop abruptly..."
            className="w-full p-2 rounded-xl border border-gray-300 text-xs outline-none bg-white focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="button"
          onClick={handleAddMedicine}
          className="w-full py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
        >
          <PlusIcon size={16} /> Add to E-Prescription
        </button>
      </div>

      {/* Prescription Items List */}
      {medicines.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between">
            <span>Prescribed Items ({medicines.length})</span>
            <span className="text-[10px] text-gray-400">Rx Output Preview</span>
          </h4>
          {medicines.map((med, index) => (
            <div key={med.id} className="bg-white border border-gray-200 p-3.5 rounded-2xl flex justify-between items-center shadow-xs">
              <div>
                <span className="text-xs font-black text-gray-900">
                  {index + 1}. {med.name}
                </span>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  <strong className="text-sky-700">{med.timing}</strong> ({med.dosage}) &bull; <span className="font-semibold">{med.foodRelation}</span> &bull; {med.durationDays} Days
                </p>
                {med.instructions && (
                  <p className="text-[10px] text-gray-500 italic mt-0.5">Note: &ldquo;{med.instructions}&rdquo;</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMedicine(med.id)}
                className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition text-xs font-bold shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-xs text-gray-500">
          No medicines added yet. Select a medicine and click &ldquo;Add to E-Prescription&rdquo;.
        </div>
      )}
    </div>
  );
}
