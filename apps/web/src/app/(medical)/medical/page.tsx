'use client';

import React, { useMemo } from 'react';
import { useControlAuth } from '@/context/medical/ControlAuthContext';

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub: string; accent: string }) {
  return (
    <div style={{
      backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px',
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px',
    }}>
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
      <span style={{ fontSize: '26px', fontWeight: 800, color: accent, letterSpacing: '-1px', lineHeight: 1.1 }}>{value}</span>
      <span style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{sub}</span>
    </div>
  );
}

const SEV_COLORS: Record<string, { bg: string; text: string }> = {
  INFO: { bg: 'rgba(56,189,248,0.1)', text: '#38BDF8' },
  WARNING: { bg: 'rgba(251,191,36,0.1)', text: '#FBBF24' },
  CRITICAL: { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
};

const ACTOR_COLORS: Record<string, string> = {
  Admin: '#A78BFA', Doctor: '#34D399', Patient: '#60A5FA', System: '#94A3B8',
};

export default function OverviewPage() {
  const { metrics, revenueTimeseries, auditEvents, tenants } = useControlAuth();

  // SVG sparkline
  const sparkline = useMemo(() => {
    const data = revenueTimeseries;
    const W = 320, H = 72;
    const vals = data.map(d => d.mrrBDT);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pts = data.map((d, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((d.mrrBDT - min) / (max - min)) * (H - 10) - 5;
      return `${x},${y}`;
    });
    const linePath = `M ${pts.join(' L ')}`;
    const areaPath = `M 0,${H} L ${pts.join(' L ')} L ${W},${H} Z`;
    return { linePath, areaPath, pts, data };
  }, [revenueTimeseries]);

  // Tenant health by status
  const healthMap = {
    good: tenants.filter(t => t.paymentStatus === 'Paid' && t.statusLabel === 'Verified Active').length,
    warning: tenants.filter(t => t.paymentStatus === 'Pending' || t.statusLabel === 'Onboarding').length,
    danger: tenants.filter(t => t.paymentStatus === 'Overdue' || t.statusLabel === 'Suspended').length,
    trial: tenants.filter(t => t.statusLabel === 'Trial').length,
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
          Platform Command Center
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
          Real-time overview of all Medonivo SaaS tenants, revenue, and platform health.
        </p>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <StatCard label="Active Tenants" value={metrics.activeTenants} sub="Across all plans" accent="#38BDF8" />
        <StatCard label="Clinical Branches" value={metrics.activeBranches} sub="Provisioned & active" accent="#4ADE80" />
        <StatCard label="CarePass Members" value={metrics.carePassMembers.toLocaleString()} sub="4 plan tiers" accent="#FBBF24" />
        <StatCard label="Monthly Recurring Revenue" value={metrics.monthlyRecurringRevenueBDT} sub="+2.4% vs last month" accent="#F472B6" />
        <StatCard label="Doctor Utilisation" value={`${metrics.avgDoctorUtilisationPct}%`} sub="Avg across all branches" accent="#A78BFA" />
        <StatCard label="Platform Uptime" value={`${metrics.platformUptimePct}%`} sub="Last 90 days" accent="#34D399" />
      </div>

      {/* Middle row: Sparkline + Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* MRR Sparkline */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                MRR Trend
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F472B6', letterSpacing: '-0.5px' }}>
                {metrics.monthlyRecurringRevenueBDT}
              </div>
              <div style={{ fontSize: '11px', color: '#4ADE80', marginTop: '2px' }}>
                &#8593; ARR: {metrics.annualRecurringRevenueBDT}
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#475569', textAlign: 'right' }}>
              Last 12 months
            </div>
          </div>

          <svg width="100%" viewBox={`0 0 320 72`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F472B6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparkline.areaPath} fill="url(#mrrGrad)" />
            <path d={sparkline.linePath} fill="none" stroke="#F472B6" strokeWidth="2" strokeLinejoin="round" />
            {sparkline.pts.map((pt, i) => {
              const [x, y] = pt.split(',').map(Number);
              const isLast = i === sparkline.pts.length - 1;
              return isLast ? (
                <circle key={i} cx={x} cy={y} r="4" fill="#F472B6" stroke="#0A0F1E" strokeWidth="2" />
              ) : null;
            })}
          </svg>

          {/* Month labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {sparkline.data.filter((_, i) => i % 3 === 0 || i === sparkline.data.length - 1).map(d => (
              <span key={d.month} style={{ fontSize: '9px', color: '#475569' }}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            Recent Platform Activity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditEvents.slice(0, 8).map(evt => {
              const sev = SEV_COLORS[evt.severity] ?? SEV_COLORS.INFO;
              return (
                <div key={evt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: sev.text, marginTop: '5px', flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {evt.event}
                    </div>
                    <div style={{ fontSize: '10px', color: '#475569', marginTop: '1px' }}>
                      <span style={{ color: ACTOR_COLORS[evt.actorType] }}>{evt.actor}</span>
                      {' '}&bull;{' '}
                      {new Date(evt.timestamp).toLocaleString('en-BD', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '2px 6px',
                    borderRadius: '4px', backgroundColor: sev.bg, color: sev.text,
                    flexShrink: 0, letterSpacing: '0.5px',
                  }}>
                    {evt.severity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tenant Health Matrix */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Tenant Health Matrix
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { label: 'Healthy', count: healthMap.good, color: '#4ADE80' },
              { label: 'Attention', count: healthMap.warning, color: '#FBBF24' },
              { label: 'Critical', count: healthMap.danger, color: '#F87171' },
              { label: 'Trial', count: healthMap.trial, color: '#94A3B8' },
            ].map(h => (
              <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: h.color, display: 'inline-block' }} />
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>{h.label}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: h.color }}>{h.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {tenants.map(t => {
            const color = t.paymentStatus === 'Overdue' || t.statusLabel === 'Suspended' ? '#F87171'
              : t.statusLabel === 'Trial' ? '#94A3B8'
              : t.paymentStatus === 'Pending' || t.statusLabel === 'Onboarding' ? '#FBBF24'
              : '#4ADE80';
            return (
              <div key={t.id} style={{
                backgroundColor: '#0D1526', border: `1px solid ${color}22`,
                borderRadius: '10px', padding: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#E2E8F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.name.replace(' Ltd.', '').replace(' Hospital', '').replace(' Medical', '')}
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>
                  {t.branchesCount} branches &bull; {t.saasPlan}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                  {t.statusLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
