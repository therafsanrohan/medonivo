'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, StatusBadge } from '@medonivo/ui';
import { mockControlMetrics, mockControlTenants, ControlTenantFixture } from '../fixtures/dev-fixtures';
import { createClient } from '../utils/supabase/client';

export default function ControlDashboardPage() {
  const [tenants, setTenants] = useState<ControlTenantFixture[]>(mockControlTenants);
  const [metrics, setMetrics] = useState(mockControlMetrics);

  useEffect(() => {
    const supabase = createClient();
    async function loadControlData() {
      try {
        const { data } = await supabase
          .from('tenants')
          .select('*');

        if (data && data.length > 0) {
          setTenants(data.map((t: any) => ({
            id: t.id,
            name: t.name,
            branchesCount: 1,
            saasPlan: 'Enterprise SaaS',
            statusLabel: 'Verified Active'
          })));
        }
      } catch (err) {
        console.error('Control App fetch error:', err);
      }
    }

    loadControlData();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px', margin: '0 0 4px 0' }}>
            Hospital SaaS Tenant Management
          </h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
            Provision hospital workspaces, monitor system-wide RLS isolation policies, and manage CarePass subscriptions.
          </p>
        </div>
        <Button variant="primary">+ Onboard New Hospital Tenant</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Active Hospital Tenants</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#38BDF8', marginTop: '4px' }}>
            {metrics.activeTenants}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Total Clinical Branches</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#4ADE80', marginTop: '4px' }}>
            {metrics.activeBranches}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Active CarePass Members</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#FBBF24', marginTop: '4px' }}>
            {metrics.carePassMembers}
          </div>
        </Card>

        <Card style={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFFFFF' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Monthly Platform Revenue</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#F472B6', marginTop: '4px' }}>
            {metrics.monthlyRecurringRevenueBDT}
          </div>
        </Card>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden', backgroundColor: '#1E293B', borderColor: '#334155' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', backgroundColor: '#0F172A', fontWeight: 600, fontSize: '14px', color: '#E2E8F0' }}>
          Provisioned Healthcare Workspaces
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left', color: '#E2E8F0' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 20px' }}>Tenant Code</th>
              <th style={{ padding: '12px 20px' }}>Hospital Name</th>
              <th style={{ padding: '12px 20px' }}>Branches</th>
              <th style={{ padding: '12px 20px' }}>Plan</th>
              <th style={{ padding: '12px 20px' }}>Status</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t: ControlTenantFixture) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: '#38BDF8' }}>{t.id}</td>
                <td style={{ padding: '14px 20px', fontWeight: 600, color: '#FFFFFF' }}>{t.name}</td>
                <td style={{ padding: '14px 20px', color: '#CBD5E1' }}>{t.branchesCount} Branches</td>
                <td style={{ padding: '14px 20px', color: '#CBD5E1' }}>{t.saasPlan}</td>
                <td style={{ padding: '14px 20px' }}>
                  <StatusBadge status="success" label={t.statusLabel} />
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <Button size="sm" variant="outline" onClick={() => alert(`Viewing tenant configuration for ${t.name}`)}>
                    Manage Tenant
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
