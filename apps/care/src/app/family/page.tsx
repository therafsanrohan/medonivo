'use client';

import React, { useState } from 'react';
import { usePatientAuth } from '../../context/PatientAuthContext';
import { UserIcon, PlusIcon, ShieldCheckIcon, CheckCircleIcon, HeartIcon } from '@medonivo/icons';
import { EmergencyCard } from '../../components/EmergencyCard';

export default function FamilyPage() {
  const { members, activeMemberId, setActiveMemberId, addFamilyMember } = usePatientAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Spouse');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [emergencyContact, setEmergencyContact] = useState('+880 1700-000000');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFamilyMember({
      name,
      relation,
      age: parseInt(age) || 30,
      gender,
      bloodGroup,
      avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      carePassPlan: 'CarePass Family Member',
      includedConsultations: 2,
      diagnosticDiscountPercent: 15,
      emergencyContact,
      allergies: [],
      chronicConditions: []
    });

    setName('');
    setShowAddModal(false);
  };

  const activeMem = members.find((m) => m.id === activeMemberId) || members[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded">
            Family Health Hub
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            Family Profiles &amp; Dependent Care
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Switch between family member accounts to manage separate CareLoops, medicines, and prescriptions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm shrink-0"
        >
          <PlusIcon size={16} /> Add Family Member
        </button>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((mem) => {
          const isActive = mem.id === activeMemberId;
          return (
            <div
              key={mem.id}
              onClick={() => setActiveMemberId(mem.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-900 text-white border-purple-900 shadow-lg scale-102'
                  : 'bg-white text-gray-900 border-gray-200 hover:border-purple-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${
                    isActive ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {mem.avatar}
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-purple-700 text-white px-2.5 py-0.5 rounded-full border border-purple-500">
                      Active Profile
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold leading-tight">{mem.name}</h3>
                <p className={`text-xs mt-0.5 ${isActive ? 'text-purple-200' : 'text-gray-500'}`}>
                  {mem.relation} • {mem.age} Yrs • Blood {mem.bloodGroup}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t text-xs flex justify-between items-center ${
                isActive ? 'border-purple-800 text-purple-200' : 'border-gray-100 text-gray-500'
              }`}>
                <span>{mem.carePassPlan}</span>
                <span className="font-bold">{isActive ? 'Selected' : 'Switch →'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Card Preview for Active Member */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">
          Emergency Health Card for {activeMem.name}
        </h2>
        <EmergencyCard member={activeMem} />
      </div>

      {/* Add Family Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Add Family Member</h3>
            <p className="text-xs text-gray-500 mb-4">Register a dependent relative to track their medical care.</p>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Suraiya Begum"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Relation</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Child">Child / Dependent</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Emergency Contact Phone</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
