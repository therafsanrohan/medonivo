import React from 'react';
import './globals.css';
import { BuildingIcon, ShieldCheckIcon, FileTextIcon, StethoscopeIcon } from '@medonivo/icons';
import { tokens } from '@medonivo/design-tokens';

import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata = {
  title: 'Medonivo Control - Platform Super Admin Panel',
  description: 'Hospital SaaS subscriptions, tenant verification, CarePass plans & system health'
};

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          backgroundColor: tokens.colors.neutral[900],
          color: tokens.colors.neutral[50],
          fontFamily: tokens.typography.fontFamily
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: '250px',
            backgroundColor: tokens.colors.neutral[900],
            borderRight: `1px solid ${tokens.colors.neutral[800]}`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              padding: '20px',
              borderBottom: `1px solid ${tokens.colors.neutral[800]}`,
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing.xs
            }}
          >
            <StethoscopeIcon size={24} color={tokens.colors.brand[500]} />
            <div>
              <span style={{ fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.bold, color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>
                Medonivo Control
              </span>
              <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.brand[500], fontWeight: tokens.typography.fontWeight.semibold }}>SUPER ADMIN HUB</span>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: tokens.borderRadius.md,
                backgroundColor: tokens.colors.neutral[800],
                color: tokens.colors.brand[500],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                textDecoration: 'none'
              }}
            >
              <BuildingIcon size={18} />
              <span>Hospital Tenants</span>
            </a>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
              }}
            >
              <ShieldCheckIcon size={18} />
              <span>CarePass Plans</span>
            </a>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
              }}
            >
              <FileTextIcon size={18} />
              <span>System Audit Logs</span>
            </a>
          </nav>
        </aside>

        {/* Content Viewport */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <header
            style={{
              height: '60px',
              backgroundColor: tokens.colors.neutral[900],
              borderBottom: `1px solid ${tokens.colors.neutral[800]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px'
            }}
          >
            <span style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.neutral[300] }}>
              Platform Operational Status: ALL SYSTEMS NORMAL
            </span>
            <div style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.brand[500], fontWeight: tokens.typography.fontWeight.semibold }}>
              Super Admin Session
            </div>
          </header>

          <main style={{ flex: 1, padding: tokens.spacing.lg }}>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </body>
    </html>
  );
}
