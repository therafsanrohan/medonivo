'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePatientAuth } from '@/context/PatientAuthContext';
import { CareLoopTimeline } from '@/components/CareLoopTimeline';
import { StethoscopeIcon, ArrowLeftIcon, CheckCircleIcon, CalendarIcon } from '@medonivo/icons';
import Link from 'next/link';

export default function CareLoopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { careLoops, members } = usePatientAuth();

  const loopId = params?.id as string;
  const loop = careLoops.find((cl) => cl.id === loopId);

  if (!loop) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
        <h2 className="text-base font-bold text-gray-800">CareLoop Not Found</h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">The requested care journey does not exist or was removed.</p>
        <Link href="/careloops" className="text-xs font-bold text-sky-600 hover:underline">
          Return to CareLoops
        </Link>
      </div>
    );
  }

  const member = members.find((m) => m.id === loop.memberId) || members[0];
  const completedTasks = loop.tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeftIcon size={16} /> Back to CareLoops
      </button>

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 px-3 py-1 rounded-full mb-2 inline-block">
              {loop.doctorSpecialty} CareLoop
            </span>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{loop.title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              Patient: <strong className="text-gray-800">{member.name}</strong> ({member.relation}) • Started {loop.startDate}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-center sm:text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Overall Adherence</span>
            <span className="text-2xl font-black text-sky-600">{loop.progressPercent}%</span>
            <span className="text-[11px] text-gray-500 block font-medium">{completedTasks} of {loop.tasks.length} Steps Complete</span>
          </div>
        </div>

        {/* Lead Care Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <StethoscopeIcon size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Lead Physician</span>
              <span className="text-sm font-bold text-gray-900">{loop.doctorName}</span>
            </div>
          </div>

          <Link
            href="/doctors"
            className="text-xs font-bold text-sky-600 hover:bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition"
          >
            Message Care Team
          </Link>
        </div>
      </div>

      {/* Interactive Timeline Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">
            Interactive Care Task Timeline
          </h2>
          <span className="text-xs text-gray-400 font-semibold">
            Click step markers to toggle completion
          </span>
        </div>

        <CareLoopTimeline loopId={loop.id} tasks={loop.tasks} />
      </div>
    </div>
  );
}
