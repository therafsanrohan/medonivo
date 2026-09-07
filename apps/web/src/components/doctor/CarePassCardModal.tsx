'use client';

import React, { useState } from 'react';
import { Card, Button, StatusBadge } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';
import { ShieldCheckIcon } from '@medonivo/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CarePassCardModal({ isOpen, onClose }: Props) {
  const [memberNumber, setMemberNumber] = useState('CP-884291');
  const [verifiedMember, setVerifiedMember] = useState<any>({
    patientName: 'Kazi Farhan',
    tier: 'Gold Tier',
    includedConsultations: 3,
    diagnosticDiscountPercent: 20,
    validUntil: '2027-08-16'
  });

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: tokens.spacing.md
    }}>
      <Card style={{ width: '100%', maxWidth: '440px', padding: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheckIcon size={24} color={tokens.colors.brand[600]} />
            <h2 style={{ fontSize: tokens.typography.fontSize.lg, fontWeight: tokens.typography.fontWeight.bold, margin: 0, color: tokens.colors.neutral[900] }}>
              CarePass Digital Health Card
            </h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
        </div>

        {/* Digital Membership Pass UI */}
        <div style={{
          background: 'linear-gradient(135deg, #075985 0%, #0369A1 100%)',
          color: '#FFFFFF',
          borderRadius: tokens.borderRadius.lg,
          padding: tokens.spacing.lg,
          marginBottom: tokens.spacing.md,
          boxShadow: '0 10px 15px -3px rgba(3, 105, 161, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>
              Medonivo Health Pass
            </span>
            <span style={{ backgroundColor: '#FDE68A', color: '#92400E', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              {verifiedMember.tier}
            </span>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>
            {verifiedMember.patientName}
          </h3>
          <p style={{ fontSize: '13px', opacity: 0.85, margin: '0 0 16px 0', fontFamily: 'monospace' }}>
            ID: {memberNumber}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '12px', fontSize: '12px' }}>
            <div>
              <span style={{ display: 'block', opacity: 0.7 }}>Consultations Left</span>
              <strong>{verifiedMember.includedConsultations} Free Calls</strong>
            </div>
            <div>
              <span style={{ display: 'block', opacity: 0.7 }}>Test Discount</span>
              <strong>{verifiedMember.diagnosticDiscountPercent}% OFF</strong>
            </div>
          </div>
        </div>

        <Button onClick={onClose} variant="primary" fullWidth>
          Done / Close
        </Button>
      </Card>
    </div>
  );
}
