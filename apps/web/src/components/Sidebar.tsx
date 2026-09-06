'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrgAuth } from '../context/OrgAuthContext';
import {
  BuildingIcon,
  UserIcon,
  ShieldCheckIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  SearchIcon,
  StethoscopeIcon
} from '@medonivo/icons';

export function Sidebar() {
  const pathname = usePathname();
  const { hospitalName, selectedBranch, setSelectedBranch, credentialReviews } = useOrgAuth();

  const pendingCredCount = credentialReviews.filter((c) => c.status === 'pending').length;

  const navItems = [
    { label: 'Overview Command Center', href: '/', icon: '📊' },
    { label: 'Doctors Directory', href: '/doctors', icon: '👨‍⚕️' },
    {
      label: 'Credentials Review',
      href: '/credentials',
      icon: '🪪',
      badge: pendingCredCount > 0 ? pendingCredCount : undefined
    },
    { label: 'Departments & Beds', href: '/departments', icon: '🏢' },
    { label: 'Schedules & Operations', href: '/operations', icon: '📅' },
    { label: 'Staff Roles & Access', href: '/staff', icon: '👥' },
    { label: 'Analytics & Utilization', href: '/analytics', icon: '📈' }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between p-4 border-r border-slate-800 shrink-0 select-none">
      <div className="space-y-6">
        {/* Hospital Branding Header */}
        <div className="p-3 bg-slate-850 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
              M
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase block">
                ORG WORKSPACE
              </span>
              <h2 className="text-xs font-bold text-white truncate max-w-[140px]">{hospitalName}</h2>
            </div>
          </div>

          {/* Branch Switcher Dropdown */}
          <div className="mt-3">
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Active Hospital Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Campuses">All Campuses (Global)</option>
              <option value="Dhanmondi Central Campus">Dhanmondi Campus</option>
              <option value="Uttara Branch">Uttara Branch</option>
              <option value="Banani Specialty Wing">Banani Wing</option>
            </select>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1 block">
            Operations Navigation
          </span>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin User Footer */}
      <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-black text-blue-400">
            SR
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">Syed Rafsan Rohan</span>
            <span className="text-[10px] text-blue-300 font-semibold block truncate">Hospital Owner</span>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>
    </aside>
  );
}
