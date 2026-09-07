'use client';

import React from 'react';
import { CareLoop } from '../fixtures/patient-fixtures';
import { usePatientAuth } from '../context/PatientAuthContext';
import { StethoscopeIcon, CheckCircleIcon, ClockIcon, ArrowRightIcon } from '@medonivo/icons';
import Link from 'next/link';

export function CareLoopCard({ careLoop }: { careLoop: CareLoop }) {
  const { toggleCareTaskStatus } = usePatientAuth();
  const completedCount = careLoop.tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md mb-1.5">
            {careLoop.doctorSpecialty} CareLoop
          </span>
          <h3 className="text-base font-bold text-gray-900 leading-snug">{careLoop.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <StethoscopeIcon size={14} className="text-gray-400" /> Lead: {careLoop.doctorName}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          careLoop.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {careLoop.status === 'active' ? 'Active Journey' : 'Completed'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-xs font-semibold mb-1 text-gray-600">
          <span>Overall Progress ({completedCount}/{careLoop.tasks.length} Steps)</span>
          <span className="text-sky-700 font-bold">{careLoop.progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-300"
            style={{ width: `${careLoop.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task Snapshot */}
      <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
        {careLoop.tasks.map((task) => {
          const isDone = task.status === 'completed';
          const isOverdue = task.status === 'overdue';
          return (
            <div
              key={task.id}
              onClick={() => toggleCareTaskStatus(careLoop.id, task.id)}
              className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-sky-300 transition"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}} // handled by parent onClick
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className={`text-xs font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                isDone
                  ? 'bg-emerald-50 text-emerald-700'
                  : isOverdue
                  ? 'bg-red-50 text-red-700'
                  : 'bg-amber-50 text-amber-700'
              }`}>
                {isDone ? 'Done' : isOverdue ? 'Overdue' : task.dueDate}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <ClockIcon size={14} /> Est. Completion: {careLoop.expectedEndDate}
        </span>
        <Link
          href={`/careloops/${careLoop.id}`}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
        >
          View CareLoop <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
