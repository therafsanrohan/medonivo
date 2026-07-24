import React from 'react';
import './globals.css';
import { StethoscopeIcon, UserIcon, CalendarIcon, FileTextIcon, BellIcon } from '@medonivo/icons';
import { tokens } from '@medonivo/design-tokens';

export const metadata = {
  title: 'Medonivo Care - Patient & Family Health Portal',
  description: 'Your intelligent personal and family health companion'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: tokens.colors.neutral[50],
          fontFamily: tokens.typography.fontFamily
        }}
      >
        {/* Header */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderBottom: `1px solid ${tokens.colors.neutral[200]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            <StethoscopeIcon size={24} color={tokens.colors.brand[600]} />
            <span
              style={{
                fontSize: tokens.typography.fontSize.lg,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.brand[900],
                letterSpacing: '-0.3px'
              }}
            >
              Medonivo Care
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
            <button
              aria-label="Notifications"
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: tokens.colors.neutral[500] }}
            >
              <BellIcon size={20} />
            </button>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: tokens.borderRadius.full,
                backgroundColor: tokens.colors.brand[100],
                color: tokens.colors.brand[600],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: tokens.typography.fontWeight.semibold,
                fontSize: tokens.typography.fontSize.xs
              }}
            >
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
            borderTop: `1px solid ${tokens.colors.neutral[200]}`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100
          }}
        >
          <a
            href="#"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: tokens.colors.brand[600],
              fontSize: '11px',
              gap: '2px',
              fontWeight: tokens.typography.fontWeight.semibold,
              textDecoration: 'none'
            }}
          >
            <StethoscopeIcon size={20} />
            <span>Home</span>
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: tokens.colors.neutral[500],
              fontSize: '11px',
              gap: '2px',
              textDecoration: 'none'
            }}
          >
            <CalendarIcon size={20} />
            <span>Appointments</span>
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: tokens.colors.neutral[500],
              fontSize: '11px',
              gap: '2px',
              textDecoration: 'none'
            }}
          >
            <FileTextIcon size={20} />
            <span>Reports</span>
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: tokens.colors.neutral[500],
              fontSize: '11px',
              gap: '2px',
              textDecoration: 'none'
            }}
          >
            <UserIcon size={20} />
            <span>Family</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
