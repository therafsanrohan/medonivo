'use client';

import React from 'react';
import { CareLoopTask } from '../fixtures/patient-fixtures';
import { usePatientAuth } from '../context/PatientAuthContext';
import { CheckCircleIcon, ClockIcon, AlertCircleIcon, FileTextIcon, StethoscopeIcon } from '@medonivo/icons';

interface CareLoopTimelineProps {
  loopId: string;
  tasks: CareLoopTask[];
}

export function CareLoopTimeline({ loopId, tasks }: CareLoopTimelineProps) {
  const { toggleCareTaskStatus } = usePatientAuth();

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
      {tasks.map((task, index) => {
        const isDone = task.status === 'completed';
        const isOverdue = task.status === 'overdue';
        const isDueToday = task.status === 'due_today';

        let iconBg = 'bg-gray-100 text-gray-400 border-gray-300';
        if (isDone) iconBg = 'bg-emerald-500 text-white border-emerald-500';
        else if (isOverdue) iconBg = 'bg-red-500 text-white border-red-500';
        else if (isDueToday) iconBg = 'bg-amber-500 text-white border-amber-500';

        return (
          <div key={task.id} className="relative flex items-start gap-4 group">
            {/* Timeline Circle */}
            <div
              onClick={() => toggleCareTaskStatus(loopId, task.id)}
              className={`absolute -left-[27px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition ${iconBg}`}
            >
              {isDone ? <CheckCircleIcon size={14} /> : <span className="text-xs font-bold">{index + 1}</span>}
            </div>

            {/* Task Card Content */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm group-hover:border-sky-300 transition">
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Step {index + 1} • {task.type.replace('_', ' ')}
                  </span>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : isOverdue
                    ? 'bg-red-100 text-red-800'
                    : isDueToday
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-sky-50 text-sky-700'
                }`}>
                  {isDone ? 'Completed' : isOverdue ? 'Overdue' : isDueToday ? 'Due Today' : `Target: ${task.dueDate}`}
                </span>
              </div>

              <h4 className={`text-sm font-bold ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </h4>

              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span>Assigned: <strong className="text-gray-700">{task.assignee}</strong></span>
              </div>

              {task.notes && (
                <div className="mt-2.5 bg-sky-50/60 text-sky-900 text-xs p-2.5 rounded-lg border border-sky-100">
                  <strong className="font-semibold block mb-0.5">Clinical Note:</strong>
                  {task.notes}
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleCareTaskStatus(loopId, task.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                    isDone
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-sky-600 text-white hover:bg-sky-700'
                  }`}
                >
                  {isDone ? 'Mark as Incomplete' : 'Mark Step as Completed'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
