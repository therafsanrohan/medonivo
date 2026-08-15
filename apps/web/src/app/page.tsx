'use client';

import React from 'react';
import { Button, Card } from '@medonivo/ui';
import { BuildingIcon, ShieldCheckIcon, CalendarIcon } from '@medonivo/icons';
import { tokens } from '@medonivo/design-tokens';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: tokens.colors.neutral[900] }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '24px 8%',
        borderBottom: `1px solid ${tokens.colors.neutral[200]}`,
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 100
      }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.brand[700], letterSpacing: '-0.5px' }}>
          Medonivo
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ textDecoration: 'none', color: tokens.colors.neutral[600], fontWeight: 500 }}>Features</a>
          <a href="#about" style={{ textDecoration: 'none', color: tokens.colors.neutral[600], fontWeight: 500 }}>About</a>
          <Button variant="primary" onClick={() => window.location.href = 'http://localhost:3001/login'}>
            Staff Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '120px 8%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: `linear-gradient(180deg, ${tokens.colors.neutral[50]} 0%, #ffffff 100%)`
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          backgroundColor: tokens.colors.brand[50],
          color: tokens.colors.brand[700],
          borderRadius: '99px',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '32px'
        }}>
          ✨ Next-Generation Health OS
        </div>
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          letterSpacing: '-1.5px',
          maxWidth: '900px',
          margin: '0 0 24px 0',
          color: '#0F172A'
        }}>
          The Intelligent <br />
          <span style={{ color: tokens.colors.brand[600] }}>Healthcare Platform</span>
        </h1>
        <p style={{
          fontSize: '20px',
          color: tokens.colors.neutral[500],
          maxWidth: '600px',
          lineHeight: 1.5,
          margin: '0 0 48px 0'
        }}>
          One Patient. One Journey. Every Branch. Unify your hospital operations, digital queuing, and patient records in a single, lightning-fast platform.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="primary" size="lg" onClick={() => window.location.href = 'http://localhost:3001/login'}>
            Enter Workspace
          </Button>
          <Button variant="outline" size="lg">
            Request Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 8%', backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.5px', margin: '0 0 16px 0' }}>
            Built for Modern Hospitals
          </h2>
          <p style={{ fontSize: '18px', color: tokens.colors.neutral[500] }}>
            Everything you need to run clinical operations seamlessly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: tokens.colors.brand[50], color: tokens.colors.brand[600], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <BuildingIcon size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Multi-Branch Architecture</h3>
            <p style={{ color: tokens.colors.neutral[500], lineHeight: 1.6 }}>
              Route patients across different branches dynamically. Track performance and queues for Central, North, and South campuses globally.
            </p>
          </Card>

          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: tokens.colors.status.info.bg, color: tokens.colors.status.info.text, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <CalendarIcon size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Live Patient Queues</h3>
            <p style={{ color: tokens.colors.neutral[500], lineHeight: 1.6 }}>
              Eliminate waiting room chaos. Digital check-ins and real-time consultation tracking keep doctors and patients in sync.
            </p>
          </Card>

          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: tokens.colors.status.success.bg, color: tokens.colors.status.success.text, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheckIcon size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>CarePass Verify</h3>
            <p style={{ color: tokens.colors.neutral[500], lineHeight: 1.6 }}>
              Secure identity and membership verification built-in. Recognize loyal patients and apply benefits instantly at the desk.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: tokens.colors.neutral[900], color: tokens.colors.neutral[400], padding: '48px 8%', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px', marginBottom: '16px' }}>
          Medonivo
        </div>
        <p style={{ marginBottom: '24px' }}>© 2026 Medonivo Health Systems. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="#" style={{ color: tokens.colors.neutral[400], textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: tokens.colors.neutral[400], textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: tokens.colors.neutral[400], textDecoration: 'none' }}>Security</a>
        </div>
      </footer>
    </div>
  );
}
