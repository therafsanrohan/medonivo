import React, { useState } from 'react';
import { Modal, Input, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  patientName?: string;
}

export const BillingModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, patientName = '' }) => {
  const [name, setName] = useState(patientName);
  const [consultationFee, setConsultationFee] = useState('800');
  const [testFee, setTestFee] = useState('0');
  const [discount, setDiscount] = useState('100'); // CarePass Silver default discount
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  const subtotal = (parseFloat(consultationFee) || 0) + (parseFloat(testFee) || 0);
  const total = Math.max(0, subtotal - (parseFloat(discount) || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      patientName: name || patientName,
      subtotal,
      discount: parseFloat(discount) || 0,
      total,
      paymentMethod,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Patient Invoice & Billing">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
        <Input 
          label="Patient Name" 
          placeholder="e.g. Rafsan Hasan" 
          required 
          value={name || patientName}
          onChange={e => setName(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
          <Input 
            label="Consultation Fee (BDT)" 
            type="number"
            required 
            value={consultationFee}
            onChange={e => setConsultationFee(e.target.value)}
          />
          <Input 
            label="Diagnostics / Lab Add-on (BDT)" 
            type="number"
            value={testFee}
            onChange={e => setTestFee(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
          <Input 
            label="CarePass Discount (BDT)" 
            type="number"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
            <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
              Payment Method
            </label>
            <select 
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: tokens.borderRadius.md, border: `1px solid ${tokens.colors.neutral[300]}`, outline: 'none', backgroundColor: '#FFF' }}
            >
              <option value="bkash">bKash (MFS)</option>
              <option value="nagad">Nagad (MFS)</option>
              <option value="cash">Cash</option>
              <option value="card">Credit / Debit Card</option>
              <option value="carepass_credit">CarePass Wallet Credit</option>
            </select>
          </div>
        </div>

        <div style={{
          backgroundColor: tokens.colors.neutral[100],
          padding: tokens.spacing.md,
          borderRadius: tokens.borderRadius.md,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: tokens.typography.fontWeight.semibold, color: tokens.colors.neutral[700] }}>
            Total Receivable:
          </span>
          <span style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.brand[600] }}>
            BDT {total.toFixed(2)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Collect & Generate Invoice</Button>
        </div>
      </form>
    </Modal>
  );
};
