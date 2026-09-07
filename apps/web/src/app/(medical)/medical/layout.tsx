import React from 'react';
import { ControlAuthProvider } from '@/context/medical/ControlAuthContext';
import { Sidebar } from '@/components/medical/Sidebar';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export const metadata = {
  title: 'Medonivo Control — Platform Super Admin',
  description: 'Hospital SaaS tenant management, CarePass subscriptions, billing analytics & system health',
};

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0A0F1E', color: '#F1F5F9' }}>
      <ControlAuthProvider>
        <Sidebar />
        {/* Main viewport */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
          {/* Top bar */}
          <header style={{
            height: '52px',
            backgroundColor: '#080E1C',
            borderBottom: '1px solid #1A2540',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                medonivo.health / control
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '11px', color: '#4ADE80', fontWeight: 700, letterSpacing: '0.5px' }}>
                SUPER ADMIN SESSION
              </div>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #38BDF8, #6366F1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer',
              }}>
                FT
              </div>
            </div>
          </header>
          {/* Page content */}
          <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#0A0F1E' }}>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </ControlAuthProvider>
    </div>
  );
}
