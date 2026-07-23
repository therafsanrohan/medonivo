'use client';

import React from 'react';
import { Card, Button, StatusBadge, Input } from '@medonivo/ui';

export default function WorkspaceDashboardPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px', margin: '0 0 4px 0' }}>
            Reception and Live Patient Queue
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            Manage walk-in registrations, digital check-ins, consultation queues, and partial billing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline">+ Walk-in Patient</Button>
          <Button variant="primary">+ New Appointment</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{"Today's Total Appointments"}</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>48</div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Active Waiting Queue</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369A1', marginTop: '4px' }}>12</div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Completed Consultations</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#166534', marginTop: '4px' }}>29</div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>CarePass Eligibility Verified</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#92400E', marginTop: '4px' }}>18</div>
        </Card>
      </div>

      <Card style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Input placeholder="Search patient by Name, Phone, MRN, or Queue Token..." />
          </div>
          <Button variant="secondary">Filter Doctor</Button>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontWeight: 600, fontSize: '14px', color: '#334155' }}>
          Active Chamber Queue - Cardiology (Dr. Arman Hossain)
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 20px' }}>Token</th>
              <th style={{ padding: '12px 20px' }}>Patient Name</th>
              <th style={{ padding: '12px 20px' }}>MRN / Phone</th>
              <th style={{ padding: '12px 20px' }}>CarePass</th>
              <th style={{ padding: '12px 20px' }}>Status</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0369A1' }}>A-14</td>
              <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>Rafsan Hasan</td>
              <td style={{ padding: '14px 20px', color: '#64748B' }}>MRN-90218 - +8801700...</td>
              <td style={{ padding: '14px 20px' }}><StatusBadge status="success" label="Active (Silver)" /></td>
              <td style={{ padding: '14px 20px' }}><StatusBadge status="warning" label="Waiting in Chamber" /></td>
              <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                <Button size="sm" variant="primary">Call Patient</Button>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0369A1' }}>A-15</td>
              <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>Sultana Parveen</td>
              <td style={{ padding: '14px 20px', color: '#64748B' }}>MRN-90219 - +8801800...</td>
              <td style={{ padding: '14px 20px' }}><StatusBadge status="neutral" label="Non-Member" /></td>
              <td style={{ padding: '14px 20px' }}><StatusBadge status="info" label="Checked In" /></td>
              <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                <Button size="sm" variant="outline">Prepare Vitals</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
