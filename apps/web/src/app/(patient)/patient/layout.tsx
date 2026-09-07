'use client';

import React from 'react';
import { StethoscopeIcon, UserIcon, CalendarIcon, FileTextIcon, BellIcon, HomeIcon, ShieldCheckIcon, AlertCircleIcon, PlusIcon } from '@medonivo/icons';
import { PatientAuthProvider, usePatientAuth } from '@/context/PatientAuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

function NavigationHeader() {
  const { members, activeMemberId, setActiveMemberId, activeMember, needsAttentionCount } = usePatientAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-xs">
      <div className="flex items-center gap-3">
        <Link href="/patient" className="flex items-center gap-2 font-bold text-sky-900 text-lg tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
            <StethoscopeIcon size={20} />
          </div>
          <span>Medonivo Care</span>
        </Link>
      </div>

      {/* Family Member Profile Selector Dropdown */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
          <UserIcon size={16} className="text-sky-600" />
          <select
            value={activeMemberId}
            onChange={(e) => setActiveMemberId(e.target.value)}
            className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-1"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.relation})
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/patient/emergency"
          className="relative p-2 text-red-600 hover:bg-red-50 rounded-full transition"
          title="Emergency Health Card"
        >
          <ShieldCheckIcon size={20} />
        </Link>

        {needsAttentionCount > 0 && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        )}
      </div>
    </header>
  );
}

function BottomNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/patient', label: 'Home', icon: HomeIcon },
    { href: '/patient/careloops', label: 'CareLoops', icon: StethoscopeIcon },
    { href: '/patient/doctors', label: 'Doctors', icon: CalendarIcon },
    { href: '/patient/medicines', label: 'Medicines', icon: AlertCircleIcon },
    { href: '/patient/records', label: 'Records', icon: FileTextIcon },
    { href: '/patient/family', label: 'Family', icon: UserIcon }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-40 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition ${
              isActive ? 'text-sky-600 font-bold' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon size={20} className={isActive ? 'scale-110 transition-transform' : ''} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PatientAuthProvider>
      <div className="bg-slate-50 text-slate-900 font-sans antialiased flex flex-col min-h-screen">
        <NavigationHeader />
        <main className="flex-1 pb-20 max-w-4xl mx-auto w-full p-4 sm:p-6">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <BottomNavbar />
      </div>
    </PatientAuthProvider>
  );
}
