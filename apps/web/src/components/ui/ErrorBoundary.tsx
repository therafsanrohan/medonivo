'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.colors.neutral[50],
          padding: tokens.spacing.md,
        }}>
          <Card>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <h2 style={{
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.status.error.text,
                fontSize: tokens.typography.fontSize.xl,
                marginBottom: tokens.spacing.sm
              }}>
                Something went wrong
              </h2>
              <p style={{
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.neutral[500],
                fontSize: tokens.typography.fontSize.sm,
                marginBottom: tokens.spacing.lg
              }}>
                An unexpected error occurred in the application. Please try reloading the page.
              </p>
              <Button onClick={() => window.location.reload()} fullWidth>
                Reload Page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
