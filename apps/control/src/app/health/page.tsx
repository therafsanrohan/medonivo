'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useControlAuth } from '../../context/ControlAuthContext';
import type { ServiceStatus, SystemServiceFixture } from '../../fixtures/dev-fixtures';

const STATUS_CFG: Record<ServiceStatus, { color: string; bg: string; label: string }> = {
  Operational: { color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', label: 'Operational' },
  Degraded: { color: '#FBBF24', bg: 'rgba(251,191,36,0.1)', label: 'Degraded' },
  Down: { color: '#F87171', bg: 'rgba(248,113,113,0.1)', label: 'Down' },
};

const INCIDENTS = [
  { id: 1, date: 'Aug 28, 2026', title: 'BullMQ queue spike — auto-scale triggered', services: ['BullMQ Job Queue'], duration: '23 min', resolved: true },
  { id: 2, date: 'Aug 12, 2026', title: 'PostgreSQL read replica lag > 500ms', services: ['PostgreSQL Cluster'], duration: '8 min', resolved: true },
  { id: 3, date: 'Jul 30, 2026', title: 'Supabase Auth elevated latency', services: ['Supabase Auth'], duration: '41 min', resolved: true },
  { id: 4, date: 'Jul 18, 2026', title: 'CDN origin cache miss spike', services: ['CDN (Cloudflare)'], duration: '5 min', resolved: true },
  { id: 5, date: 'Jun 22, 2026', title: 'Redis OOM — eviction policy triggered', services: ['Redis Cache'], duration: '12 min', resolved: true },
];

type ServiceWithHistory = SystemServiceFixture & { history: number[] };

function ServiceCard({ svc }: { svc: ServiceWithHistory }) {
  const cfg = STATUS_CFG[svc.status];
  const max = Math.max(...svc.history, 1);
  const min = Math.min(...svc.history);
  const range = max - min || 1;

  const W = 120, H = 32;
  const pts = svc.history.map((v, i) => {
    const x = (i / (svc.history.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <div style={{
      backgroundColor: '#111827', border: `1px solid ${cfg.color}22`,
      borderRadius: '14px', padding: '20px',
      boxShadow: `0 0 20px ${cfg.color}08`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#F1F5F9', marginBottom: '3px' }}>{svc.name}</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>{svc.region}</div>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '6px', backgroundColor: cfg.bg, color: cfg.color, letterSpacing: '0.5px' }}>
          {cfg.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        <div style={{ backgroundColor: '#0D1526', borderRadius: '8px', padding: '8px 10px' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Uptime</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: svc.uptimePct >= 99.9 ? '#4ADE80' : '#FBBF24', marginTop: '2px' }}>{svc.uptimePct}%</div>
        </div>
        <div style={{ backgroundColor: '#0D1526', borderRadius: '8px', padding: '8px 10px' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Latency</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: svc.latencyMs < 50 ? '#4ADE80' : svc.latencyMs < 100 ? '#FBBF24' : '#F87171', marginTop: '2px' }}>
            {svc.latencyMs}<span style={{ fontSize: '10px', fontWeight: 400, color: '#64748B' }}>ms</span>
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ marginBottom: '6px' }}>
        <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '4px' }}>Latency trend (live)</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <path
            d={`M ${pts.join(' L ')}`}
            fill="none"
            stroke={cfg.color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {pts.length > 0 && (() => {
            const last = pts[pts.length - 1].split(',').map(Number);
            return <circle cx={last[0]} cy={last[1]} r="2.5" fill={cfg.color} />;
          })()}
        </svg>
      </div>

      <div style={{ fontSize: '9px', color: '#475569' }}>Last checked: {svc.lastChecked}</div>
    </div>
  );
}

export default function HealthPage() {
  const { systemServices, metrics } = useControlAuth();

  const initHistory = useCallback(() =>
    systemServices.map(s => ({
      ...s,
      history: Array.from({ length: 20 }, () => Math.max(1, s.latencyMs + Math.floor((Math.random() - 0.5) * s.latencyMs * 0.4))),
    })), [systemServices]);

  const [services, setServices] = useState<ServiceWithHistory[]>(initHistory);

  useEffect(() => {
    const id = setInterval(() => {
      setServices(prev => prev.map(s => {
        const newLatency = Math.max(1, s.latencyMs + Math.floor((Math.random() - 0.5) * s.latencyMs * 0.3));
        return { ...s, latencyMs: newLatency, history: [...s.history.slice(1), newLatency] };
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const operationalCount = services.filter(s => s.status === 'Operational').length;
  const degradedCount = services.filter(s => s.status === 'Degraded').length;
  const downCount = services.filter(s => s.status === 'Down').length;

  const overallStatus = downCount > 0 ? 'PARTIAL OUTAGE' : degradedCount > 0 ? 'DEGRADED PERFORMANCE' : 'ALL SYSTEMS OPERATIONAL';
  const overallColor = downCount > 0 ? '#F87171' : degradedCount > 0 ? '#FBBF24' : '#4ADE80';

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
          System Health Monitor
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
          Live service status &bull; Updates every 3 seconds
        </p>
      </div>

      {/* Overall status banner */}
      <div style={{
        backgroundColor: '#111827', border: `1px solid ${overallColor}33`,
        borderRadius: '14px', padding: '18px 22px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '50%',
          backgroundColor: overallColor,
          boxShadow: `0 0 12px ${overallColor}`,
          animation: overallColor === '#4ADE80' ? 'pulse 2s infinite' : 'none',
        }} />
        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: overallColor, letterSpacing: '-0.3px' }}>{overallStatus}</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            {operationalCount} operational &bull; {degradedCount} degraded &bull; {downCount} down &bull; {metrics.platformUptimePct}% uptime last 90 days
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {services.map(svc => <ServiceCard key={svc.id} svc={svc} />)}
      </div>

      {/* Incident History */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2A3A', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Incident History — Last 90 Days
        </div>
        {INCIDENTS.map((inc, i) => (
          <div
            key={inc.id}
            style={{
              padding: '14px 20px', borderBottom: i < INCIDENTS.length - 1 ? '1px solid #1A2540' : 'none',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0' }}>{inc.title}</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                {inc.services.join(', ')} &bull; Duration: {inc.duration}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{inc.date}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#4ADE80', marginTop: '2px' }}>RESOLVED</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
