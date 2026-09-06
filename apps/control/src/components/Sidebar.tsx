'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useControlAuth } from '../context/ControlAuthContext';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function OverviewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function TenantsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function CarePassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function BillingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function HealthIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { href: '/', label: 'Overview', icon: <OverviewIcon /> },
  { href: '/tenants', label: 'Hospital Tenants', icon: <TenantsIcon /> },
  { href: '/carepass', label: 'CarePass Plans', icon: <CarePassIcon /> },
  { href: '/billing', label: 'Billing & Revenue', icon: <BillingIcon /> },
  { href: '/audit', label: 'Audit Logs', icon: <AuditIcon /> },
  { href: '/health', label: 'System Health', icon: <HealthIcon /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { adminName, adminRole, adminInitials, platformStatus } = useControlAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside style={{
      width: '252px',
      minWidth: '252px',
      backgroundColor: '#080E1C',
      borderRight: '1px solid #1A2540',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px', borderBottom: '1px solid #1A2540' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.3px' }}>
              Medonivo
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#38BDF8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Control Hub
            </div>
          </div>
        </div>
        {/* Platform Status */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          backgroundColor: platformStatus === 'OPERATIONAL' ? 'rgba(74,222,128,0.08)' : 'rgba(251,191,36,0.08)',
          border: `1px solid ${platformStatus === 'OPERATIONAL' ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}`,
          borderRadius: '6px', padding: '4px 8px', marginTop: '4px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: platformStatus === 'OPERATIONAL' ? '#4ADE80' : '#FBBF24',
            boxShadow: `0 0 6px ${platformStatus === 'OPERATIONAL' ? '#4ADE80' : '#FBBF24'}`,
          }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: platformStatus === 'OPERATIONAL' ? '#4ADE80' : '#FBBF24', letterSpacing: '0.5px' }}>
            {platformStatus === 'OPERATIONAL' ? 'ALL SYSTEMS NORMAL' : 'DEGRADED'}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: active ? 'rgba(56,189,248,0.12)' : 'transparent',
                color: active ? '#38BDF8' : '#64748B',
                fontSize: '13.5px',
                fontWeight: active ? 600 : 500,
                textDecoration: 'none',
                transition: 'all 0.15s',
                border: active ? '1px solid rgba(56,189,248,0.2)' : '1px solid transparent',
              }}
            >
              <span style={{ opacity: active ? 1 : 0.7 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'Hospital Tenants' && (
                <span style={{
                  marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
                  backgroundColor: '#1E2A3A', color: '#94A3B8',
                  padding: '1px 6px', borderRadius: '10px',
                }}>8</span>
              )}
              {item.label === 'Billing & Revenue' && (
                <span style={{
                  marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
                  backgroundColor: 'rgba(251,191,36,0.15)', color: '#FBBF24',
                  padding: '1px 6px', borderRadius: '10px',
                }}>3</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid #1A2540' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #38BDF8, #6366F1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: 'white',
          }}>
            {adminInitials}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#E2E8F0' }}>{adminName}</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>{adminRole}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
