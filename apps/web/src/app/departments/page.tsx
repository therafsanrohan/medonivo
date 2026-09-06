'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { BuildingIcon, UserIcon, PlusIcon, StethoscopeIcon } from '@medonivo/icons';

export default function DepartmentsPage() {
  const { departments, addDepartment } = useOrgAuth();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [headDoctor, setHeadDoctor] = useState('Prof. Dr. Arman Hossain');
  const [totalDoctors, setTotalDoctors] = useState(4);
  const [activeChambers, setActiveChambers] = useState(2);
  const [bedCapacity, setBedCapacity] = useState(30);

  const handleAddDeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptName.trim() || !deptCode.trim()) return;

    addDepartment({
      name: deptName.trim(),
      code: deptCode.trim().toUpperCase(),
      headDoctor,
      totalDoctors: Number(totalDoctors) || 1,
      activeChambers: Number(activeChambers) || 1,
      bedCapacity: Number(bedCapacity) || 10
    });

    alert(`Department "${deptName}" created successfully!`);
    setIsAddModalOpen(false);
    setDeptName('');
    setDeptCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded">
            Infrastructure &amp; Capacity
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Clinical Departments &amp; Inpatient Beds</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure hospital specialty units, head of department assignments, chamber counts, and bed allocations.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <PlusIcon size={16} /> + New Department Unit
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded">
                  CODE: {dept.code}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1.5">{dept.name}</h3>
                <p className="text-xs text-gray-500">Head of Dept: <strong className="text-gray-800">{dept.headDoctor}</strong></p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                🏥
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Affiliated Doctors</span>
                <strong className="text-slate-900 text-base font-black">{dept.totalDoctors} Physicians</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Active Chambers</span>
                <strong className="text-blue-700 text-base font-black">{dept.activeChambers} Rooms</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Inpatient Beds</span>
                <strong className="text-purple-700 text-base font-black">{dept.bedCapacity} Beds</strong>
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-2xl text-xs font-medium text-purple-900 flex justify-between items-center">
              <span>Monthly Patient Throughput: <strong>{dept.monthlyThroughput} consultations</strong></span>
              <button className="text-purple-700 font-bold hover:underline">Edit Config →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddDeptSubmit}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Create Clinical Specialty Unit</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 font-bold hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  placeholder="e.g. Nephrology & Kidney Care"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Dept Code</label>
                <input
                  type="text"
                  required
                  value={deptCode}
                  onChange={(e) => setDeptCode(e.target.value)}
                  placeholder="e.g. NEPH"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Head of Department</label>
              <input
                type="text"
                required
                value={headDoctor}
                onChange={(e) => setHeadDoctor(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Physicians</label>
                <input
                  type="number"
                  value={totalDoctors}
                  onChange={(e) => setTotalDoctors(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Chambers</label>
                <input
                  type="number"
                  value={activeChambers}
                  onChange={(e) => setActiveChambers(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bed Capacity</label>
                <input
                  type="number"
                  value={bedCapacity}
                  onChange={(e) => setBedCapacity(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
              >
                Create Department
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
