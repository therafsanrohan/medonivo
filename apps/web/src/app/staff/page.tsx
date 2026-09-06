'use client';

import React, { useState } from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { StaffUser } from '../../fixtures/org-fixtures';
import { UserIcon, ShieldCheckIcon, PlusIcon } from '@medonivo/icons';

export default function StaffPage() {
  const { staffList, updateStaffRole } = useOrgAuth();
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredStaff = roleFilter === 'All'
    ? staffList
    : staffList.filter((s) => s.role === roleFilter);

  const roles = ['All', 'Hospital Owner', 'Clinical Director', 'Credential Officer', 'Desk Receptionist'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
            Role-Based Access Control
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Staff Roles &amp; Permissions Directory</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage administrative personnel, assign operational privileges, and audit staff activity.
          </p>
        </div>
      </div>

      {/* Role Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-3.5 py-1.5 rounded-xl border transition ${
              roleFilter === r
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-gray-700 border-gray-200 hover:border-slate-300'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Staff Roster Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-4 pl-6">Staff Member</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Department</th>
              <th className="p-4">Assigned Branch</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-slate-50/60 transition">
                <td className="p-4 pl-6">
                  <span className="font-bold text-slate-900 block">{staff.name}</span>
                  <span className="text-[11px] text-gray-400">{staff.email}</span>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 font-bold px-2.5 py-1 rounded-xl text-[11px]">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4 text-gray-700 font-semibold">{staff.department}</td>
                <td className="p-4 text-gray-600">{staff.assignedBranch}</td>
                <td className="p-4">
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {staff.lastActive}
                  </span>
                </td>
                <td className="p-4 pr-6 text-right">
                  <select
                    value={staff.role}
                    onChange={(e) => updateStaffRole(staff.id, e.target.value as any)}
                    className="p-1.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 bg-white outline-none"
                  >
                    <option value="Hospital Owner">Hospital Owner</option>
                    <option value="Clinical Director">Clinical Director</option>
                    <option value="Credential Officer">Credential Officer</option>
                    <option value="Desk Receptionist">Desk Receptionist</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
