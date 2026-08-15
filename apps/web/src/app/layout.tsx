import React from 'react';
import './globals.css';
import { tokens } from '@medonivo/design-tokens';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata = {
  title: 'Medonivo - The Intelligent Healthcare Platform',
  description: 'One Patient. One Journey. Every Branch.'
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
