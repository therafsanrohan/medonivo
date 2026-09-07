import React, { useState } from 'react';
import { Modal, Input, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AppointmentModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking
    onSubmit({ patientName: name, mrnPhone: phone, date });
    setName('');
    setPhone('');
    setDate('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book New Appointment">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
        <Input 
          label="Patient Full Name" 
          placeholder="e.g. John Doe" 
          required 
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input 
          label="Phone Number" 
          placeholder="+880..." 
          required 
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Input 
          label="Appointment Date" 
          type="date"
          required 
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
          <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
            Doctor
          </label>
          <select style={{ padding: '8px 12px', borderRadius: tokens.borderRadius.md, border: `1px solid ${tokens.colors.neutral[300]}`, outline: 'none', backgroundColor: '#FFF' }}>
            <option>Dr. Arman Hossain (Cardiology)</option>
            <option>Dr. Sarah Ahmed (General Medicine)</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Book Appointment</Button>
        </div>
      </form>
    </Modal>
  );
};
