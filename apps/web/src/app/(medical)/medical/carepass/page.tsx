'use client';

import React, { useState } from 'react';
import { useControlAuth } from '@/context/medical/ControlAuthContext';

function CheckIcon({ on, color }: { on: boolean; color: string }) {
  return on ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  );
}

export default function CarePassPage() {
  const { carePassPlans } = useControlAuth();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('20');
  const [expiry, setExpiry] = useState('30');
  const [maxUses, setMaxUses] = useState('500');
  const [generated, setGenerated] = useState<{code: string; discount: string; expiry: string; uses: string} | null>(null);

  const totalSubscribers = carePassPlans.reduce((a, p) => a + p.subscribers, 0);
  const totalMRR = carePassPlans.reduce((a, p) => a + p.arpuBDT * p.subscribers, 0);

  const handleGenerate = () => {
    if (!promoCode.trim()) return;
    setGenerated({ code: promoCode.toUpperCase(), discount, expiry, uses: maxUses });
  };

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
          CarePass Plans
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
          {totalSubscribers.toLocaleString()} total subscribers &bull; BDT {totalMRR.toLocaleString()} CarePass MRR
        </p>
      </div>

      {/* Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {carePassPlans.map(plan => (
          <div key={plan.id} style={{
            backgroundColor: '#111827',
            border: `1px solid ${plan.accentColor}33`,
            borderRadius: '16px', padding: '22px',
            boxShadow: `0 0 30px ${plan.glowColor}`,
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            {/* Plan header */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: plan.accentColor, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '4px' }}>
                {plan.name}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.5px' }}>
                {`BDT ${plan.monthlyPriceBDT}`}
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#64748B' }}>/mo</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>{plan.tagline}</div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Subscribers', value: plan.subscribers.toLocaleString(), color: plan.accentColor },
                { label: 'Churn', value: `${plan.churnRatePct}%`, color: plan.churnRatePct < 2 ? '#4ADE80' : plan.churnRatePct < 3.5 ? '#FBBF24' : '#F87171' },
                { label: 'ARPU', value: `${plan.arpuBDT}`, color: '#94A3B8' },
                { label: 'MRR', value: `${(plan.arpuBDT * plan.subscribers / 1000).toFixed(0)}k`, color: '#94A3B8' },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: '#0D1526', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: s.color, marginTop: '2px' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {[
                { label: `${plan.labDiscountPct}% Lab Discount`, on: true },
                { label: 'Specialist Access', on: plan.specialistAccess },
                { label: `${plan.familyMembers} Family Member${plan.familyMembers > 1 ? 's' : ''}`, on: true },
                { label: 'Emergency Cover', on: plan.emergencyCover },
                { label: `${plan.teleconsultSessions === 99 ? 'Unlimited' : plan.teleconsultSessions} Teleconsult`, on: true },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <CheckIcon on={f.on} color={plan.accentColor} />
                  <span style={{ fontSize: '11px', color: f.on ? '#CBD5E1' : '#334155' }}>{f.label}</span>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: 'auto', padding: '8px', borderRadius: '8px', border: `1px solid ${plan.accentColor}44`,
              backgroundColor: `${plan.accentColor}11`, color: plan.accentColor,
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            }}>
              Edit Features
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2A3A', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Feature Comparison
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2A3A' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#64748B', fontWeight: 600 }}>Feature</th>
                {carePassPlans.map(p => (
                  <th key={p.id} style={{ padding: '10px 16px', textAlign: 'center', color: p.accentColor, fontWeight: 700 }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Lab Discount', values: carePassPlans.map(p => `${p.labDiscountPct}%`) },
                { label: 'Specialist Access', values: carePassPlans.map(p => p.specialistAccess ? 'Yes' : '—') },
                { label: 'Family Members', values: carePassPlans.map(p => String(p.familyMembers)) },
                { label: 'Emergency Cover', values: carePassPlans.map(p => p.emergencyCover ? 'Yes' : '—') },
                { label: 'Teleconsult Sessions', values: carePassPlans.map(p => p.teleconsultSessions === 99 ? 'Unlimited' : String(p.teleconsultSessions)) },
              ].map((row, ri) => (
                <tr key={row.label} style={{ borderBottom: ri < 4 ? '1px solid #1A2540' : 'none', backgroundColor: ri % 2 === 0 ? 'transparent' : '#0D152622' }}>
                  <td style={{ padding: '11px 20px', color: '#94A3B8', fontWeight: 500 }}>{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td key={vi} style={{ padding: '11px 16px', textAlign: 'center', color: v === '—' ? '#334155' : '#F1F5F9', fontWeight: v === 'Yes' ? 700 : 400 }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promo Code Generator */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '14px', padding: '22px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          Promo Code Generator
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
          {[
            { label: 'Code', val: promoCode, set: setPromoCode, ph: 'e.g. EID2026' },
            { label: 'Discount %', val: discount, set: setDiscount, ph: '20' },
            { label: 'Expiry (days)', val: expiry, set: setExpiry, ph: '30' },
            { label: 'Max Uses', val: maxUses, set: setMaxUses, ph: '500' },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>{f.label}</div>
              <input
                value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: '#0D1526', border: '1px solid #1E2A3A', color: '#F1F5F9', fontSize: '13px', outline: 'none' }}
              />
            </div>
          ))}
          <button
            onClick={handleGenerate}
            style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #A78BFA, #6366F1)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Generate
          </button>
        </div>
        {generated && (
          <div style={{ marginTop: '16px', backgroundColor: '#0D1526', borderRadius: '10px', padding: '14px', border: '1px solid rgba(167,139,250,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <code style={{ fontSize: '18px', fontWeight: 800, color: '#A78BFA', letterSpacing: '2px', fontFamily: 'Space Grotesk, monospace' }}>
                {generated.code}
              </code>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {generated.discount}% off &bull; {generated.expiry}-day expiry &bull; {generated.uses} uses max
              </span>
              <button
                onClick={() => setGenerated(null)}
                style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(167,139,250,0.2)', color: '#A78BFA', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
