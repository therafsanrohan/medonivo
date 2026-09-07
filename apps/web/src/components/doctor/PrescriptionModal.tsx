'use client';

import React, { useState } from 'react';
import { Card, Button, Input } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';
import { FileTextIcon } from '@medonivo/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function PrescriptionModal({ isOpen, onClose }: Props) {
  const [patientName, setPatientName] = useState('Rahim Uddin');
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension');
  const [bp, setBp] = useState('120/80');
  const [medicines, setMedicines] = useState([
    { name: 'Tab. Napa Extra 500mg', dosage: '1 + 0 + 1', duration: '5 Days', instructions: 'After meals' },
    { name: 'Tab. Seclo 20mg', dosage: '1 + 0 + 0', duration: '14 Days', instructions: 'Before breakfast' }
  ]);

  if (!isOpen) return null;

  const handleIssueRx = () => {
    alert(`E-Prescription successfully issued & digitally signed for ${patientName}`);
    onClose();
  };

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
      <Card style={{ width: '100%', maxWidth: '540px', padding: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextIcon size={24} color={tokens.colors.brand[600]} />
            <h2 style={{ fontSize: tokens.typography.fontSize.lg, fontWeight: tokens.typography.fontWeight.bold, margin: 0, color: tokens.colors.neutral[900] }}>
              Issue Clinical E-Prescription (Rx)
            </h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md, marginBottom: tokens.spacing.md }}>
          <div>
            <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
              Patient Name
            </label>
            <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
              Vitals (Blood Pressure)
            </label>
            <Input value={bp} onChange={(e) => setBp(e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: tokens.spacing.md }}>
          <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
            Clinical Diagnosis
          </label>
          <Input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        </div>

        {/* Rx Medicine List */}
        <h4 style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '8px', color: tokens.colors.neutral[800] }}>
          Prescribed Medications (Rx)
        </h4>

        {medicines.map((m, idx) => (
          <div key={idx} style={{
            backgroundColor: tokens.colors.neutral[100],
            padding: tokens.spacing.sm,
            borderRadius: tokens.borderRadius.md,
            marginBottom: '8px',
            fontSize: tokens.typography.fontSize.xs,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong style={{ color: tokens.colors.brand[900] }}>{m.name}</strong>
              <span style={{ color: tokens.colors.neutral[600], display: 'block' }}>
                Dosage: {m.dosage} ({m.instructions})
              </span>
            </div>
            <span style={{ fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.brand[700] }}>
              {m.duration}
            </span>
          </div>
        ))}

        <div style={{ display: 'flex', gap: tokens.spacing.md, marginTop: tokens.spacing.lg }}>
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleIssueRx} fullWidth>
            Sign &amp; Dispatch Rx
          </Button>
        </div>
      </Card>
    </div>
  );
}
