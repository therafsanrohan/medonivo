import React from 'react';
import { tokens } from '@medonivo/design-tokens';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export const metadata = {
  title: 'Medonivo Workspace - Hospital Operations OS',
  description: 'Clinical operations, receptionist check-in, live queue, billing & diagnostics'
};

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tokens.colors.neutral[50],
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
}
