import React from 'react';
import './globals.css';
import { StethoscopeIcon, UserIcon, CalendarIcon, FileTextIcon, BellIcon } from '@medonivo/icons';

export const metadata = {
  title: 'Medonivo Care - Patient & Family Health Portal',
  description: 'Your intelligent personal and family health companion'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
        {/* Header */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StethoscopeIcon size={24} color="#0369A1" />
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#0C4A6E', letterSpacing: '-0.3px' }}>
              Medonivo Care
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button aria-label="Notifications" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748B' }}>
              <BellIcon size={20} />
            </button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E0EFFE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px' }}>
              PT
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ flex: 1, paddingBottom: '70px', maxWidth: '1024px', margin: '0 auto', width: '100%' }}>
          {children}
        </main>

        {/* Responsive Mobile Bottom Navigation */}
        <nav
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100
          }}
        >
          <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0369A1', fontSize: '11px', gap: '2px', fontWeight: 600 }}>
            <StethoscopeIcon size={20} />
            <span>Home</span>
          </a>
          <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748B', fontSize: '11px', gap: '2px' }}>
            <CalendarIcon size={20} />
            <span>Appointments</span>
          </a>
          <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748B', fontSize: '11px', gap: '2px' }}>
            <FileTextIcon size={20} />
            <span>Reports</span>
          </a>
          <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748B', fontSize: '11px', gap: '2px' }}>
            <UserIcon size={20} />
            <span>Family</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
