import React, { useState } from 'react';
import { Modal, Input, Button } from '@medonivo/ui';
import { tokens } from '@medonivo/design-tokens';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const WalkInModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ patientName: name, mrnPhone: phone, carePassStatus: 'neutral', carePassLabel: 'Non-Member', queueStatus: 'info', queueStatusLabel: 'Checked In' });
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Walk-in Patient">
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
          <label style={{ fontSize: tokens.typography.fontSize.xs, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.neutral[700] }}>
            Assign Doctor / Department
          </label>
          <select style={{ padding: '8px 12px', borderRadius: tokens.borderRadius.md, border: `1px solid ${tokens.colors.neutral[300]}`, outline: 'none', backgroundColor: '#FFF' }}>
            <option>Dr. Arman Hossain (Cardiology)</option>
            <option>Dr. Sarah Ahmed (General Medicine)</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add to Queue</Button>
        </div>
      </form>
    </Modal>
  );
};
