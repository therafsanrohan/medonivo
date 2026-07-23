import React from 'react';
import './globals.css';
import {
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
  StethoscopeIcon,
  BellIcon,
  ShieldCheckIcon
} from '@medonivo/icons';

export const metadata = {
  title: 'Medonivo Workspace - Hospital Operations OS',
  description: 'Clinical operations, receptionist check-in, live queue, billing & diagnostics'
};

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#F8FAFC' }}>
        {/* Desktop / Tablet Side Navigation */}
        <aside
          style={{
            width: '240px',
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}
        >
          {/* Logo & Tenant Header */}
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <StethoscopeIcon size={24} color="#0284C7" />
            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>
                Medonivo OS
              </span>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Square Hospitals Ltd.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <CalendarIcon size={18} />
              <span>Reception & Queue</span>
            </a>

            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <UserIcon size={18} />
              <span>Patients</span>
            </a>

            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <StethoscopeIcon size={18} />
              <span>Doctors & Schedules</span>
            </a>

            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <FileTextIcon size={18} />
              <span>Diagnostics & Lab</span>
            </a>

            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <ShieldCheckIcon size={18} />
              <span>CarePass Verify</span>
            </a>
          </nav>

          {/* Branch Info Footer */}
          <div style={{ padding: '16px', borderTop: '1px solid #1E293B', fontSize: '12px', color: '#64748B' }}>
            <div style={{ fontWeight: 600, color: '#CBD5E1' }}>Branch: Central Dhaka</div>
            <div>Shift: Morning (08:00 - 16:00)</div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          {/* Top Bar */}
          <header
            style={{
              height: '60px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BuildingIcon size={18} color="#64748B" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                Branch: Main Campus (Dhaka Central)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button aria-label="Notifications" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748B' }}>
                <BellIcon size={20} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px' }}>
                  DR
                </div>
                <div style={{ fontSize: '13px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Dr. Tanvir Rahman</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Medical Practitioner</div>
                </div>
              </div>
            </div>
          </header>

          <main style={{ flex: 1, padding: '24px' }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
