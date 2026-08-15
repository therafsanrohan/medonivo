import React from 'react';

import {
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
  StethoscopeIcon,
  BellIcon,
  ShieldCheckIcon
} from '@medonivo/icons';
import { tokens } from '@medonivo/design-tokens';


export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
        {/* Desktop / Tablet Side Navigation */}
        <aside
          style={{
            width: '240px',
            backgroundColor: tokens.colors.neutral[900],
            color: tokens.colors.neutral[50],
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}
        >
          {/* Logo & Tenant Header */}
          <div
            style={{
              padding: '18px 20px',
              borderBottom: `1px solid ${tokens.colors.neutral[800]}`,
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing.xs
            }}
          >
            <StethoscopeIcon size={24} color={tokens.colors.brand[500]} />
            <div>
              <span style={{ fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.bold, color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>
                Medonivo OS
              </span>
              <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.neutral[400] }}>Square Hospitals Ltd.</span>
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
                borderRadius: tokens.borderRadius.md,
                backgroundColor: tokens.colors.neutral[800],
                color: tokens.colors.brand[500],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                textDecoration: 'none'
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
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
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
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
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
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
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
                borderRadius: tokens.borderRadius.md,
                color: tokens.colors.neutral[400],
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                textDecoration: 'none'
              }}
            >
              <ShieldCheckIcon size={18} />
              <span>CarePass Verify</span>
            </a>
          </nav>

          {/* Branch Info Footer */}
          <div style={{ padding: '16px', borderTop: `1px solid ${tokens.colors.neutral[800]}`, fontSize: tokens.typography.fontSize.xs, color: tokens.colors.neutral[500] }}>
            <div style={{ fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.neutral[300] }}>Branch: Central Dhaka</div>
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
              borderBottom: `1px solid ${tokens.colors.neutral[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
              <BuildingIcon size={18} color={tokens.colors.neutral[500]} />
              <span style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.neutral[700] }}>
                Branch: Main Campus (Dhaka Central)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
              <button aria-label="Notifications" style={{ border: 'none', background: 'none', cursor: 'pointer', color: tokens.colors.neutral[500] }}>
                <BellIcon size={20} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                <div style={{ width: '32px', height: '32px', borderRadius: tokens.borderRadius.full, backgroundColor: tokens.colors.neutral[100], color: tokens.colors.neutral[700], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: tokens.typography.fontWeight.semibold, fontSize: tokens.typography.fontSize.xs }}>
                  DR
                </div>
                <div style={{ fontSize: tokens.typography.fontSize.xs }}>
                  <div style={{ fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.neutral[900] }}>Dr. Tanvir Rahman</div>
                  <div style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.neutral[500] }}>Medical Practitioner</div>
                </div>
              </div>
            </div>
          </header>

          <main style={{ flex: 1, padding: tokens.spacing.lg }}>{children}</main>
        </div>
    </div>
  );
}
