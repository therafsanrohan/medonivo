import React, { useState } from 'react';
import { Modal, Input, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const DiagnosticOrderModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [testName, setTestName] = useState('CBC with ESR');
  const [category, setCategory] = useState('pathology');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      patientName,
      testName,
      category,
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      status: 'Requested'
    });
    setPatientName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Diagnostic Lab Order">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
        <Input 
          label="Patient Name" 
          placeholder="e.g. Sultana Parveen" 
          required 
          value={patientName}
          onChange={e => setPatientName(e.target.value)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
          <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
            Category
          </label>
          <select 
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: tokens.borderRadius.md, border: `1px solid ${tokens.colors.neutral[300]}`, outline: 'none', backgroundColor: '#FFF' }}
          >
            <option value="pathology">Pathology / Blood Work</option>
            <option value="radiology">Radiology (X-Ray, USG, MRI)</option>
            <option value="cardiology">Cardiology (ECG, Echo)</option>
          </select>
        </div>

        <Input 
          label="Test Name / Panel" 
          placeholder="e.g. Lipid Profile, Chest X-Ray PA" 
          required 
          value={testName}
          onChange={e => setTestName(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Submit Lab Order</Button>
        </div>
      </form>
    </Modal>
  );
};
