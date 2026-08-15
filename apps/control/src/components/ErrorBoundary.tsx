'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Control App ErrorBoundary caught error:', error, errorInfo);
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
          <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ color: tokens.colors.status.error.text, marginBottom: tokens.spacing.sm }}>
              Control Portal Error
            </h2>
            <p style={{ color: tokens.colors.neutral[500], fontSize: tokens.typography.fontSize.sm, marginBottom: tokens.spacing.lg }}>
              An error occurred while rendering the Super Admin Control Center.
            </p>
            <Button onClick={() => window.location.reload()} fullWidth>
              Reload Control Center
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
