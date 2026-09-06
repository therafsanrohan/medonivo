'use client';

import React, { useState, useMemo } from 'react';
import { useControlAuth } from '../../context/ControlAuthContext';
import type { AuditSeverity, AuditCategory, ActorType } from '../../fixtures/dev-fixtures';

const SEV: Record<AuditSeverity, { bg: string; text: string }> = {
  INFO: { bg: 'rgba(56,189,248,0.12)', text: '#38BDF8' },
  WARNING: { bg: 'rgba(251,191,36,0.12)', text: '#FBBF24' },
  CRITICAL: { bg: 'rgba(248,113,113,0.12)', text: '#F87171' },
};
const ACTOR_COLOR: Record<ActorType, string> = {
  Admin: '#A78BFA', Doctor: '#34D399', Patient: '#60A5FA', System: '#94A3B8',
};
const CAT_ICON: Record<AuditCategory, string> = {
  Auth: '🔐', Tenant: '🏥', Billing: '💳', CarePass: '🛡️', System: '⚙️', Security: '🚨',
};

function downloadCSV(rows: ReturnType<typeof useControlAuth>['auditEvents']) {
  const header = 'ID,Timestamp,Actor,Actor Type,Event,Category,Severity,Detail\n';
  const body = rows.map(r =>
    [r.id, r.timestamp, r.actor, r.actorType, r.event, r.category, r.severity, `"${r.detail}"`].join(',')
  ).join('\n');
  const blob = new Blob([header + body], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'medonivo_audit_log.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function AuditPage() {
  const { auditEvents } = useControlAuth();
  const [sevFilter, setSevFilter] = useState<AuditSeverity | 'All'>('All');
  const [catFilter, setCatFilter] = useState<AuditCategory | 'All'>('All');
  const [actorFilter, setActorFilter] = useState<ActorType | 'All'>('All');

  const filtered = useMemo(() => auditEvents.filter(e => {
    const matchSev = sevFilter === 'All' || e.severity === sevFilter;
    const matchCat = catFilter === 'All' || e.category === catFilter;
    const matchActor = actorFilter === 'All' || e.actorType === actorFilter;
    return matchSev && matchCat && matchActor;
  }), [auditEvents, sevFilter, catFilter, actorFilter]);

  const filterBtn = (active: boolean, color?: string) => ({
    padding: '5px 12px', borderRadius: '7px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' as const,
    backgroundColor: active ? (color ? `${color}22` : 'rgba(56,189,248,0.15)') : 'transparent',
    color: active ? (color ?? '#38BDF8') : '#64748B',
    border: `1px solid ${active ? (color ?? '#38BDF8') + '44' : '#1E2A3A'}`,
  });

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
            Audit Logs
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {filtered.length} events &bull; Complete platform activity trail
          </p>
        </div>
        <button
          onClick={() => downloadCSV(filtered)}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '9px', border: '1px solid #1E2A3A', backgroundColor: '#111827', color: '#94A3B8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginRight: '4px' }}>Severity</span>
          {(['All', 'INFO', 'WARNING', 'CRITICAL'] as const).map(s => (
            <button key={s} onClick={() => setSevFilter(s)} style={filterBtn(sevFilter === s, s === 'INFO' ? '#38BDF8' : s === 'WARNING' ? '#FBBF24' : s === 'CRITICAL' ? '#F87171' : undefined)}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ width: '1px', height: '20px', backgroundColor: '#1E2A3A' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginRight: '4px' }}>Category</span>
          {(['All', 'Auth', 'Tenant', 'Billing', 'CarePass', 'System', 'Security'] as const).map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={filterBtn(catFilter === c)}>{c}</button>
          ))}
        </div>
        <div style={{ width: '1px', height: '20px', backgroundColor: '#1E2A3A' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginRight: '4px' }}>Actor</span>
          {(['All', 'Admin', 'Doctor', 'Patient', 'System'] as const).map(a => (
            <button key={a} onClick={() => setActorFilter(a)} style={filterBtn(actorFilter === a, a !== 'All' ? ACTOR_COLOR[a as ActorType] : undefined)}>{a}</button>
          ))}
        </div>
      </div>

      {/* Event Timeline */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ maxHeight: '640px', overflowY: 'auto' }}>
          {filtered.map((evt, i) => {
            const sev = SEV[evt.severity];
            const actorColor = ACTOR_COLOR[evt.actorType];
            const catIcon = CAT_ICON[evt.category];
            return (
              <div
                key={evt.id}
                style={{
                  display: 'flex', gap: '16px', padding: '16px 20px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #1A2540' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                {/* Timeline dot + connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3px', flexShrink: 0 }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    backgroundColor: sev.text,
                    boxShadow: `0 0 8px ${sev.text}66`,
                    flexShrink: 0,
                  }} />
                  {i < filtered.length - 1 && (
                    <div style={{ width: '1px', flex: 1, minHeight: '28px', backgroundColor: '#1E2A3A', marginTop: '4px' }} />
                  )}
                </div>

                {/* Category icon */}
                <div style={{ fontSize: '18px', flexShrink: 0, width: '24px', textAlign: 'center', paddingTop: '1px' }}>{catIcon}</div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9' }}>{evt.event}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '5px', backgroundColor: sev.bg, color: sev.text, letterSpacing: '0.5px' }}>
                      {evt.severity}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#475569', padding: '2px 7px', borderRadius: '5px', backgroundColor: '#0D1526' }}>
                      {evt.category}
                    </span>
                    {evt.tenantId && (
                      <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>{evt.tenantId}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>{evt.detail}</div>
                  <div style={{ fontSize: '10px', color: '#475569' }}>
                    <span style={{ color: actorColor, fontWeight: 600 }}>{evt.actor}</span>
                    {' '}&bull;{' '}
                    <span style={{ fontSize: '10px', color: '#64748B', padding: '1px 6px', borderRadius: '4px', backgroundColor: `${actorColor}15`, marginLeft: '2px' }}>{evt.actorType}</span>
                    {' '}&bull;{' '}
                    {new Date(evt.timestamp).toLocaleString('en-BD', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
              No events match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
