import React from 'react';
import './globals.css';
import { BuildingIcon, ShieldCheckIcon, FileTextIcon, StethoscopeIcon } from '@medonivo/icons';

export const metadata = {
  title: 'Medonivo Control - Platform Super Admin Panel',
  description: 'Hospital SaaS subscriptions, tenant verification, CarePass plans & system health'
};

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0F172A', color: '#F8FAFC' }}>
        {/* Sidebar */}
        <aside style={{ width: '250px', backgroundColor: '#020617', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <StethoscopeIcon size={24} color="#38BDF8" />
            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>
                Medonivo Control
              </span>
              <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 600 }}>SUPER ADMIN HUB</span>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', backgroundColor: '#1E293B', color: '#38BDF8', fontSize: '14px', fontWeight: 600 }}>
              <BuildingIcon size={18} />
              <span>Hospital Tenants</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}>
              <ShieldCheckIcon size={18} />
              <span>CarePass Plans</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}>
              <FileTextIcon size={18} />
              <span>System Audit Logs</span>
            </a>
          </nav>
        </aside>

        {/* Content Viewport */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <header style={{ height: '60px', backgroundColor: '#020617', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#CBD5E1' }}>Platform Operational Status: ALL SYSTEMS NORMAL</span>
            <div style={{ fontSize: '13px', color: '#38BDF8', fontWeight: 600 }}>Super Admin Session</div>
          </header>

          <main style={{ flex: 1, padding: '24px' }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
