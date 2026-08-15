'use client';

import React from 'react';
import { Card, Input, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to dashboard directly. 
    // Sprint 3 will hook this up to Supabase Auth.
    router.push('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.neutral[50],
        padding: tokens.spacing.md,
      }}
    >
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: tokens.spacing.xl }}>
          <h1
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.colors.brand[700],
              margin: '0 0 8px 0',
            }}
          >
            Medonivo
          </h1>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSize.sm,
              color: tokens.colors.neutral[500],
              margin: 0,
            }}
          >
            Workspace & Clinical Operations
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
              <Input
                label="Email Address"
                type="email"
                placeholder="doctor@hospital.com"
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button type="submit" fullWidth size="lg">
              Sign In
            </Button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: tokens.spacing.sm }}>
              <a href="#" style={{ color: tokens.colors.brand[600], fontSize: tokens.typography.fontSize.sm, textDecoration: 'none', fontWeight: tokens.typography.fontWeight.medium }}>
                Forgot password?
              </a>
              <a href="#" style={{ color: tokens.colors.neutral[500], fontSize: tokens.typography.fontSize.sm, textDecoration: 'none', fontWeight: tokens.typography.fontWeight.medium }}>
                Request access
              </a>
            </div>
          </form>
        </Card>

        <p
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSize.xs,
            color: tokens.colors.neutral[400],
            textAlign: 'center',
            marginTop: tokens.spacing.lg,
          }}
        >
          Secure Access Only. Use authorized hospital credentials.
        </p>
      </div>
    </div>
  );
}
