'use client';

import React, { useState, useMemo } from 'react';
import { useControlAuth } from '@/context/medical/ControlAuthContext';
import type { ControlTenantFixture, PaymentStatus, SaasPlan, TenantStatus } from '@/fixtures/medical/dev-fixtures';

const PLAN_COLORS: Record<string, string> = {
  'Trial': '#64748B', 'Starter': '#34D399', 'Growth': '#38BDF8',
  'Enterprise Cloud': '#A78BFA', 'Enterprise Plus': '#FBBF24',
};
const PAY_COLORS: Record<string, { bg: string; text: string }> = {
  Paid: { bg: 'rgba(74,222,128,0.1)', text: '#4ADE80' },
  Overdue: { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
  Pending: { bg: 'rgba(251,191,36,0.1)', text: '#FBBF24' },
};
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Verified Active': { bg: 'rgba(74,222,128,0.1)', text: '#4ADE80' },
  'Suspended': { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
  'Onboarding': { bg: 'rgba(56,189,248,0.1)', text: '#38BDF8' },
  'Trial': { bg: 'rgba(100,116,139,0.15)', text: '#94A3B8' },
};

const WIZARD_STEPS = ['Organisation', 'Plan & Branches', 'Confirm'];

function Label({ text }: { text: string }) {
  return <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>{text}</span>;
}
function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: '100%', padding: '9px 12px', borderRadius: '8px',
        backgroundColor: '#0D1526', border: '1px solid #1E2A3A',
        color: '#F1F5F9', fontSize: '13px', outline: 'none',
      }}
    />
  );
}

export default function TenantsPage() {
  const { tenants, suspendTenant, activateTenant, onboardTenant, markInvoicePaid } = useControlAuth();
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [drawerTenant, setDrawerTenant] = useState<ControlTenantFixture | null>(null);
  const [showOnboard, setShowOnboard] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', city: '', slug: '', plan: 'Growth' as SaasPlan, branches: '1', adminEmail: '' });

  const filtered = useMemo(() => tenants.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.id.includes(q) || t.city.toLowerCase().includes(q);
    const matchPlan = planFilter === 'All' || t.saasPlan === planFilter;
    const matchStatus = statusFilter === 'All' || t.statusLabel === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  }), [tenants, search, planFilter, statusFilter]);

  const handleOnboard = () => {
    onboardTenant({
      id: `tnt_${form.slug}`,
      name: form.name,
      slug: form.slug,
      city: form.city,
      branchesCount: parseInt(form.branches) || 1,
      doctorsCount: 0,
      carePassSubscribers: 0,
      saasPlan: form.plan,
      monthlyFeeBDT: form.plan === 'Trial' ? 0 : form.plan === 'Starter' ? 45000 : form.plan === 'Growth' ? 85000 : form.plan === 'Enterprise Cloud' ? 220000 : 420000,
      outstandingBDT: 0,
      paymentStatus: 'Paid' as PaymentStatus,
      statusLabel: 'Onboarding' as TenantStatus,
    });
    setShowOnboard(false);
    setStep(0);
    setForm({ name: '', city: '', slug: '', plan: 'Growth', branches: '1', adminEmail: '' });
  };

  const filterBtnStyle = (active: boolean) => ({
    padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    backgroundColor: active ? 'rgba(56,189,248,0.15)' : '#111827',
    color: active ? '#38BDF8' : '#64748B',
    border: active ? '1px solid rgba(56,189,248,0.3)' : '1px solid #1E2A3A',
  });

  return (
    <div style={{ padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
            Hospital Tenants
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {tenants.length} provisioned healthcare workspaces
          </p>
        </div>
        <button
          onClick={() => setShowOnboard(true)}
          style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
            color: 'white', fontSize: '13px', fontWeight: 700,
          }}
        >
          + Onboard New Tenant
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tenants..."
          style={{
            padding: '8px 14px', borderRadius: '8px', backgroundColor: '#111827',
            border: '1px solid #1E2A3A', color: '#F1F5F9', fontSize: '13px', width: '240px', outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['All', 'Trial', 'Starter', 'Growth', 'Enterprise Cloud', 'Enterprise Plus'].map(p => (
            <button key={p} onClick={() => setPlanFilter(p)} style={filterBtnStyle(planFilter === p)}>{p}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
          {['All', 'Verified Active', 'Onboarding', 'Trial', 'Suspended'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={filterBtnStyle(statusFilter === s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2A3A' }}>
                {['Tenant', 'Plan', 'Branches / Doctors', 'CarePass', 'Monthly Fee', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => {
                const pay = PAY_COLORS[t.paymentStatus] ?? PAY_COLORS.Paid;
                const stat = STATUS_COLORS[t.statusLabel] ?? STATUS_COLORS['Verified Active'];
                return (
                  <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1A2540' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{t.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{t.id} &bull; {t.city}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: PLAN_COLORS[t.saasPlan] ?? '#94A3B8' }}>
                        {t.saasPlan}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>
                      {t.branchesCount} / {t.doctorsCount}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>
                      {t.carePassSubscribers.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>
                      {t.monthlyFeeBDT === 0 ? 'Free Trial' : `BDT ${t.monthlyFeeBDT.toLocaleString()}`}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: pay.bg, color: pay.text }}>
                        {t.paymentStatus}
                      </span>
                      {t.outstandingBDT > 0 && (
                        <div style={{ fontSize: '10px', color: '#F87171', marginTop: '2px' }}>
                          {`BDT ${t.outstandingBDT.toLocaleString()} due`}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: stat.bg, color: stat.text }}>
                        {t.statusLabel}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
                        <button
                          onClick={() => setDrawerTenant(t)}
                          style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #1E2A3A', backgroundColor: '#0D1526', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Details
                        </button>
                        {t.outstandingBDT > 0 && (
                          <button
                            onClick={() => markInvoicePaid(t.id)}
                            style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Mark Paid
                          </button>
                        )}
                        {t.statusLabel !== 'Suspended' ? (
                          <button
                            onClick={() => suspendTenant(t.id)}
                            style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(248,113,113,0.1)', color: '#F87171', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => activateTenant(t.id)}
                            style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerTenant && (
        <div
          onClick={() => setDrawerTenant(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '400px', backgroundColor: '#111827', borderLeft: '1px solid #1E2A3A', padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#F1F5F9' }}>{drawerTenant.name}</h2>
              <button onClick={() => setDrawerTenant(null)} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '20px', cursor: 'pointer' }}>&#215;</button>
            </div>
            <div style={{ backgroundColor: '#0D1526', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Tenant ID', value: drawerTenant.id },
                { label: 'Slug', value: drawerTenant.slug },
                { label: 'City', value: drawerTenant.city },
                { label: 'Plan', value: drawerTenant.saasPlan },
                { label: 'Branches', value: drawerTenant.branchesCount },
                { label: 'Doctors', value: drawerTenant.doctorsCount },
                { label: 'Total MRNs', value: drawerTenant.patientMRNTotal.toLocaleString() },
                { label: 'CarePass Subscribers', value: drawerTenant.carePassSubscribers.toLocaleString() },
                { label: 'Monthly Fee', value: drawerTenant.monthlyFeeBDT === 0 ? 'Free Trial' : `BDT ${drawerTenant.monthlyFeeBDT.toLocaleString()}` },
                { label: 'Outstanding', value: `BDT ${drawerTenant.outstandingBDT.toLocaleString()}` },
                { label: 'Payment', value: drawerTenant.paymentStatus },
                { label: 'Status', value: drawerTenant.statusLabel },
                { label: 'Last Activity', value: drawerTenant.lastActivity },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{row.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#E2E8F0' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Onboard Modal */}
      {showOnboard && (
        <div
          onClick={() => setShowOnboard(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '500px', backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #1E2A3A', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#F1F5F9' }}>Onboard New Hospital Tenant</h2>
              <button onClick={() => setShowOnboard(false)} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '20px', cursor: 'pointer' }}>&#215;</button>
            </div>

            {/* Step Indicator */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {WIZARD_STEPS.map((s, i) => (
                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                  <div style={{
                    height: '3px', borderRadius: '2px', width: '100%',
                    backgroundColor: i <= step ? '#38BDF8' : '#1E2A3A',
                    transition: 'background-color 0.2s',
                  }} />
                  <span style={{ fontSize: '10px', color: i === step ? '#38BDF8' : '#64748B', fontWeight: i === step ? 700 : 500 }}>{s}</span>
                </div>
              ))}
            </div>

            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><Label text="Hospital / Organisation Name" /><Input value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. Apollo Hospitals Bangladesh" /></div>
                <div><Label text="City" /><Input value={form.city} onChange={v => setForm(f => ({ ...f, city: v }))} placeholder="e.g. Dhaka" /></div>
                <div><Label text="Tenant Slug (unique ID)" /><Input value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v.toLowerCase().replace(/\s+/g, '_') }))} placeholder="e.g. apollo" /></div>
              </div>
            )}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <Label text="SaaS Plan" />
                  <select
                    value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value as SaasPlan }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: '#0D1526', border: '1px solid #1E2A3A', color: '#F1F5F9', fontSize: '13px', outline: 'none' }}
                  >
                    {['Trial', 'Starter', 'Growth', 'Enterprise Cloud', 'Enterprise Plus'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div><Label text="Initial Branches" /><Input value={form.branches} onChange={v => setForm(f => ({ ...f, branches: v }))} placeholder="1" /></div>
                <div><Label text="Admin Email" /><Input value={form.adminEmail} onChange={v => setForm(f => ({ ...f, adminEmail: v }))} placeholder="admin@hospital.com" /></div>
              </div>
            )}
            {step === 2 && (
              <div style={{ backgroundColor: '#0D1526', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>Confirm Tenant Details</div>
                {[
                  { label: 'Name', value: form.name || '—' },
                  { label: 'City', value: form.city || '—' },
                  { label: 'Slug', value: form.slug || '—' },
                  { label: 'Plan', value: form.plan },
                  { label: 'Branches', value: form.branches },
                  { label: 'Admin Email', value: form.adminEmail || '—' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{r.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#E2E8F0' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <button
                onClick={() => step > 0 ? setStep(s => s - 1) : setShowOnboard(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #1E2A3A', backgroundColor: 'transparent', color: '#94A3B8', fontSize: '13px', cursor: 'pointer' }}
              >
                {step > 0 ? 'Back' : 'Cancel'}
              </button>
              <button
                onClick={() => step < 2 ? setStep(s => s + 1) : handleOnboard()}
                style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                {step < 2 ? 'Next' : 'Onboard Tenant'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
