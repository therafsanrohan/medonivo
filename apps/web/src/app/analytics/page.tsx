'use client';

import React from 'react';
import { useOrgAuth } from '../../context/OrgAuthContext';
import { BuildingIcon, UserIcon, ShieldCheckIcon, CalendarIcon } from '@medonivo/icons';

export default function AnalyticsPage() {
  const { hospitalName, departments } = useOrgAuth();

  const totalMonthlyConsults = departments.reduce((acc, d) => acc + d.monthlyThroughput, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
          Executive Reporting &amp; Intelligence
        </span>
        <h1 className="text-xl font-bold text-gray-900 mt-1">Hospital Analytics &amp; Utilization Trends</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Executive performance metrics, monthly patient volume, department revenue contributions, and chamber peak hours.
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Monthly Consult Volume</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{totalMonthlyConsults.toLocaleString()} Patients</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ +18% vs last month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Avg Consult Duration</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">14.5 Mins</span>
          <span className="text-[10px] text-gray-500 font-medium mt-1 block">Target: 15.0 mins</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">CarePass Retention</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">94.2%</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">High patient loyalty</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Patient Satisfaction</span>
          <span className="text-2xl font-black text-purple-600 mt-1 block">4.88 / 5.0</span>
          <span className="text-[10px] text-purple-600 font-bold mt-1 block">Based on 1,240 reviews</span>
        </div>
      </div>

      {/* Hourly Peak Check-ins Chart (Pure SVG) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Hourly Patient Check-in Distribution</h3>
            <p className="text-xs text-gray-500">Aggregated check-in volume across all 3 campuses today.</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Peak: 05:00 PM (84 Check-ins)
          </span>
        </div>

        <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2">
          {[
            { hour: '09 AM', count: 24 },
            { hour: '10 AM', count: 48 },
            { hour: '11 AM', count: 62 },
            { hour: '12 PM', count: 40 },
            { hour: '01 PM', count: 30 },
            { hour: '02 PM', count: 22 },
            { hour: '03 PM', count: 45 },
            { hour: '04 PM', count: 72 },
            { hour: '05 PM', count: 84 },
            { hour: '06 PM', count: 76 },
            { hour: '07 PM', count: 50 },
            { hour: '08 PM', count: 28 }
          ].map((bar) => {
            const heightPct = Math.round((bar.count / 84) * 100);
            return (
              <div key={bar.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[9px] font-bold text-gray-400 group-hover:text-blue-600">{bar.count}</span>
                <div
                  className="w-full bg-blue-600/80 group-hover:bg-blue-600 rounded-t-lg transition-all"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-[9px] font-bold text-gray-500">{bar.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Performance Breakdown */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Department Volume &amp; Capacity Share</h3>
        <div className="space-y-3">
          {departments.map((dept) => {
            const sharePct = Math.round((dept.monthlyThroughput / totalMonthlyConsults) * 100);
            return (
              <div key={dept.id} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-900">{dept.name} ({dept.code})</span>
                  <span className="text-blue-700">{dept.monthlyThroughput} consults/mo ({sharePct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${sharePct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
