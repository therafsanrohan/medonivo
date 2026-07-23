'use client';

import React from 'react';
import { Card, Button, StatusBadge } from '@medonivo/ui';
import { mockControlMetrics, mockControlTenants } from '../fixtures/dev-fixtures';

export default function ControlDashboardPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px', margin: '0 0 4px 0' }}>
            Medonivo Super Admin Control
          </h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
            Manage SaaS hospital onboarding, global CarePass benefit configuration, and platform metrics.
          </p>
        </div>

        <Button variant="primary">+ Onboard New Hospital Tenant</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Active Hospital Tenants</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#38BDF8', marginTop: '4px' }}>
            {mockControlMetrics.activeTenants}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Active Hospital Branches</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
            {mockControlMetrics.activeBranches}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Total CarePass Members</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#4ADE80', marginTop: '4px' }}>
            {mockControlMetrics.carePassMembers.toLocaleString()}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>SaaS Monthly Recurring (MRR)</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#FACC15', marginTop: '4px' }}>
            {mockControlMetrics.monthlyRecurringRevenueBDT}
          </div>
        </Card>
      </div>

      <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', backgroundColor: '#0F172A', fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>
          Registered Hospital Tenants &amp; Subscriptions
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left', color: '#F8FAFC' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 20px' }}>Tenant Name</th>
              <th style={{ padding: '12px 20px' }}>Branches</th>
              <th style={{ padding: '12px 20px' }}>SaaS Plan</th>
              <th style={{ padding: '12px 20px' }}>Status</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockControlTenants.map((tenant) => (
              <tr key={tenant.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>{tenant.name}</td>
                <td style={{ padding: '14px 20px', color: '#94A3B8' }}>{tenant.branchesCount} Branches</td>
                <td style={{ padding: '14px 20px', color: '#38BDF8' }}>{tenant.saasPlan}</td>
                <td style={{ padding: '14px 20px' }}>
                  <StatusBadge status="success" label={tenant.statusLabel} />
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <Button size="sm" variant="outline">Manage Tenant</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
