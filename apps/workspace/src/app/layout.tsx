import React from 'react';
import './globals.css';
import { tokens } from '@medonivo/design-tokens';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata = {
  title: 'Medonivo Workspace - Hospital Operations OS',
  description: 'Clinical operations, receptionist check-in, live queue, billing & diagnostics'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          backgroundColor: tokens.colors.neutral[50],
          fontFamily: tokens.typography.fontFamily,
          margin: 0,
        }}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
