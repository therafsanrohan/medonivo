'use client';

import React from 'react';
import { DoctorAuthProvider, useDoctorAuth } from '../../context/DoctorAuthContext';
import {
  StethoscopeIcon,
  UserIcon,
  CalendarIcon,
  FileTextIcon,
  BellIcon,
  HomeIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  ClockIcon
} from '@medonivo/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarNav() {
  const pathname = usePathname();
  const { doctor, setChamberStatus, pendingReports, messages } = useDoctorAuth();

  const unreadMessagesCount = messages.reduce((acc, m) => acc + m.unreadCount, 0);
  const pendingReportsCount = pendingReports.filter((r) => r.status === 'pending_review').length;

  const navItems = [
    { href: '/', label: 'Live Queue & Home', icon: HomeIcon },
    { href: '/careloops', label: 'Patient CareLoops', icon: StethoscopeIcon },
    { href: '/reports', label: 'Report Reviews', icon: FileTextIcon, badge: pendingReportsCount },
    { href: '/messages', label: 'Patient Messages', icon: AlertCircleIcon, badge: unreadMessagesCount },
    { href: '/availability', label: 'Chamber Schedule', icon: CalendarIcon }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Workspace Brand Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-sky-600 flex items-center justify-center font-bold text-white shadow-md">
            <StethoscopeIcon size={22} />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">Medonivo Clinical</span>
            <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider block">Doctor Workspace</span>
          </div>
        </div>

        {/* Doctor Chamber Status Card */}
        <div className="p-4 m-4 bg-slate-800/80 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              doctor.chamberStatus === 'in_chamber' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`} />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {doctor.chamberStatus.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs font-bold text-white truncate">{doctor.name}</p>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">{doctor.currentBranch}</p>

          <select
            value={doctor.chamberStatus}
            onChange={(e) => setChamberStatus(e.target.value as any)}
            className="w-full mt-3 p-1.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold outline-none"
          >
            <option value="in_chamber">Active In Chamber</option>
            <option value="on_break">On Break</option>
            <option value="offline">Offline / Closed</option>
          </select>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-sky-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        {doctor.regNumber} • Medonivo v2.4
      </div>
    </aside>
  );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
        <DoctorAuthProvider>
          <div className="flex w-full min-h-screen">
            <SidebarNav />
            <main className="flex-1 p-6 max-w-6xl mx-auto overflow-y-auto">
              {children}
            </main>
          </div>
        </DoctorAuthProvider>
      </body>
    </html>
  );
}
