'use client';

import React, { useMemo } from 'react';
import { useControlAuth } from '../../context/ControlAuthContext';

const PAY_COLORS: Record<string, { bg: string; text: string }> = {
  Paid: { bg: 'rgba(74,222,128,0.1)', text: '#4ADE80' },
  Overdue: { bg: 'rgba(248,113,113,0.1)', text: '#F87171' },
  Pending: { bg: 'rgba(251,191,36,0.1)', text: '#FBBF24' },
};

export default function BillingPage() {
  const { tenants, metrics, revenueTimeseries, markInvoicePaid } = useControlAuth();

  const totalOutstanding = useMemo(() => tenants.reduce((a, t) => a + t.outstandingBDT, 0), [tenants]);
  const paidThisMonth = useMemo(() => tenants.filter(t => t.paymentStatus === 'Paid' && t.monthlyFeeBDT > 0).reduce((a, t) => a + t.monthlyFeeBDT, 0), [tenants]);
  const prevMRR = revenueTimeseries[revenueTimeseries.length - 2]?.mrrBDT ?? 0;
  const currentMRR = revenueTimeseries[revenueTimeseries.length - 1]?.mrrBDT ?? 0;
  const mrrDelta = prevMRR > 0 ? (((currentMRR - prevMRR) / prevMRR) * 100).toFixed(1) : '0';

  const invoices = useMemo(() =>
    tenants.filter(t => t.outstandingBDT > 0 || t.paymentStatus === 'Pending'),
    [tenants]
  );

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
          Billing &amp; Revenue
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
          Platform financial overview and invoice management
        </p>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Current MRR', value: `BDT ${currentMRR.toLocaleString()}`, sub: `+${mrrDelta}% vs last month`, accent: '#F472B6' },
          { label: 'Annual Run Rate', value: metrics.annualRecurringRevenueBDT, sub: 'Projected ARR', accent: '#A78BFA' },
          { label: 'Paid This Month', value: `BDT ${paidThisMonth.toLocaleString()}`, sub: `${tenants.filter(t => t.paymentStatus === 'Paid').length} tenants paid`, accent: '#4ADE80' },
          { label: 'Outstanding', value: `BDT ${totalOutstanding.toLocaleString()}`, sub: `${invoices.length} invoices pending`, accent: totalOutstanding > 0 ? '#F87171' : '#4ADE80' },
        ].map(card => (
          <div key={card.label} style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{card.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: card.accent, letterSpacing: '-0.5px' }}>{card.value}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Upgrade Revenue Forecast */}
      <div style={{ backgroundColor: '#111827', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '14px', padding: '18px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#A78BFA,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9', marginBottom: '2px' }}>Revenue Upgrade Opportunity</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            If Popular Medical + Labaid + Ibn Sina upgrade to Enterprise Cloud: estimated <span style={{ color: '#A78BFA', fontWeight: 700 }}>+BDT 3,05,000 MRR</span>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2A3A', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Revenue Breakdown — All Tenants
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2A3A' }}>
                {['Tenant', 'Plan', 'Monthly Fee', 'Outstanding', 'Payment Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tenants.map((t, i) => {
                const pay = PAY_COLORS[t.paymentStatus] ?? PAY_COLORS.Paid;
                return (
                  <tr key={t.id} style={{ borderBottom: i < tenants.length - 1 ? '1px solid #1A2540' : 'none' }}>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#F1F5F9', fontSize: '13px' }}>{t.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{t.city}</div>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: '#94A3B8' }}>{t.saasPlan}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 700, color: '#E2E8F0' }}>
                      {t.monthlyFeeBDT === 0 ? <span style={{ color: '#64748B' }}>Free Trial</span> : `BDT ${t.monthlyFeeBDT.toLocaleString()}`}
                    </td>
                    <td style={{ padding: '13px 16px', color: t.outstandingBDT > 0 ? '#F87171' : '#4ADE80', fontWeight: 600 }}>
                      {t.outstandingBDT > 0 ? `BDT ${t.outstandingBDT.toLocaleString()}` : '—'}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: pay.bg, color: pay.text }}>
                        {t.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      {t.outstandingBDT > 0 && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => markInvoicePaid(t.id)}
                            style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Mark Paid
                          </button>
                          <button style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #1E2A3A', backgroundColor: 'transparent', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
                            Remind
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Queue */}
      {invoices.length > 0 && (
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#F87171', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            &#9888; Unpaid Invoice Queue ({invoices.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {invoices.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#0D1526', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{t.saasPlan} &bull; {t.city}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#F87171' }}>BDT {(t.outstandingBDT || t.monthlyFeeBDT).toLocaleString()}</div>
                  <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>{t.paymentStatus}</div>
                </div>
                <button
                  onClick={() => markInvoicePaid(t.id)}
                  style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Mark Paid
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
