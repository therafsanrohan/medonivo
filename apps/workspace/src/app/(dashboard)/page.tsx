'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, StatusBadge, Input } from '@medonivo/ui';
import { mockWorkspaceMetrics, mockQueueList } from '../../fixtures/dev-fixtures';
import { WalkInModal } from '../../components/WalkInModal';
import { AppointmentModal } from '../../components/AppointmentModal';
import { BillingModal } from '../../components/BillingModal';
import { DiagnosticOrderModal } from '../../components/DiagnosticOrderModal';
import { CarePassCardModal } from '../../components/CarePassCardModal';
import { PrescriptionModal } from '../../components/PrescriptionModal';
import { createClient } from '../../utils/supabase/client';

export default function WorkspaceDashboardPage() {
  const [isWalkInOpen, setWalkInOpen] = useState(false);
  const [isAppointmentOpen, setAppointmentOpen] = useState(false);
  const [isBillingOpen, setBillingOpen] = useState(false);
  const [isDiagnosticOpen, setDiagnosticOpen] = useState(false);
  const [isCarePassOpen, setCarePassOpen] = useState(false);
  const [isPrescriptionOpen, setPrescriptionOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queue, setQueue] = useState<any[]>(mockQueueList);
  const [metrics, setMetrics] = useState(mockWorkspaceMetrics);

  // Fetch queue from Supabase or Fallback API
  useEffect(() => {
    const supabase = createClient();
    async function loadQueueData() {
      try {
        const { data } = await supabase
          .from('queues')
          .select('*');

        if (data && data.length > 0) {
          setQueue(data.map((q: any) => ({
            id: q.id,
            token: q.token,
            patientName: q.patient_name || 'Patient',
            mrnPhone: q.phone || 'N/A',
            carePassStatus: 'active',
            carePassLabel: 'Active',
            queueStatus: q.status === 'waiting' ? 'info' : 'warning',
            queueStatusLabel: q.status === 'waiting' ? 'Waiting in Chamber' : 'In Consultation'
          })));
        } else {
          // Fallback to local API
          fetch('http://localhost:4000/v1/queues/active')
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) setQueue(data);
            })
            .catch(() => {
              // Gracefully keep dev fixtures if local API is down
            });
        }
      } catch (e) {
        console.error('Supabase fetch error:', e);
      }
    }

    loadQueueData();
  }, []);

  const handleWalkInSubmit = async (patient: any) => {
    try {
      const res = await fetch('http://localhost:4000/v1/queues/walk-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
      });
      const newEntry = await res.json();
      setQueue([...queue, newEntry]);
      setMetrics(prev => ({
        ...prev,
        activeWaitingQueue: prev.activeWaitingQueue + 1,
        totalAppointments: prev.totalAppointments + 1,
      }));
    } catch {
      // Local optimistic update if API unavailable
      const newEntry = {
        id: Math.random().toString(),
        token: `A-${Math.floor(Math.random() * 100) + 20}`,
        ...patient
      };
      setQueue(prev => [...prev, newEntry]);
      setMetrics(prev => ({
        ...prev,
        activeWaitingQueue: prev.activeWaitingQueue + 1,
        totalAppointments: prev.totalAppointments + 1,
      }));
    }
  };

  const handleAppointmentSubmit = (patient: any) => {
    alert(`Appointment successfully booked for ${patient.patientName} on ${patient.date}`);
    setMetrics(prev => ({ ...prev, totalAppointments: prev.totalAppointments + 1 }));
  };

  const handleCallPatient = async (id: string) => {
    try {
      await fetch(`http://localhost:4000/v1/queues/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in_consultation' })
      });
    } catch {
      // Ignore network errors
    } finally {
      setQueue(prevQueue => prevQueue.map(item => {
        if (item.id === id) {
          return {
            ...item,
            queueStatus: 'warning',
            queueStatusLabel: 'In Consultation',
          };
        }
        return item;
      }));
    }
  };

  const filteredQueue = queue.filter(item => 
    (item.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.mrnPhone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.token || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px', margin: '0 0 4px 0' }}>
            Reception and Live Patient Queue
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            Manage walk-in registrations, digital check-ins, consultation queues, and e-prescriptions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="outline" onClick={() => setCarePassOpen(true)}>💳 CarePass QR</Button>
          <Button variant="outline" onClick={() => setPrescriptionOpen(true)}>📝 Issue Rx</Button>
          <Button variant="outline" onClick={() => setDiagnosticOpen(true)}>+ Lab Order</Button>
          <Button variant="outline" onClick={() => setBillingOpen(true)}>+ Invoice</Button>
          <Button variant="outline" onClick={() => setWalkInOpen(true)}>+ Walk-in</Button>
          <Button variant="primary" onClick={() => setAppointmentOpen(true)}>+ Appointment</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{"Today's Total Appointments"}</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
            {metrics.totalAppointments}
          </div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Active Waiting Queue</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369A1', marginTop: '4px' }}>
            {metrics.activeWaitingQueue}
          </div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Completed Consultations</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#166534', marginTop: '4px' }}>
            {metrics.completedConsultations}
          </div>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>CarePass Eligibility Verified</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#92400E', marginTop: '4px' }}>
            {metrics.carePassVerified}
          </div>
        </Card>
      </div>

      <Card style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Input 
              placeholder="Search patient by Name, Phone, MRN, or Queue Token..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            {filteredQueue.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0369A1' }}>{item.token}</td>
                <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>{item.patientName}</td>
                <td style={{ padding: '14px 20px', color: '#64748B' }}>{item.mrnPhone}</td>
                <td style={{ padding: '14px 20px' }}>
                  <StatusBadge status={item.carePassStatus as any} label={item.carePassLabel} />
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <StatusBadge status={item.queueStatus as any} label={item.queueStatusLabel} />
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  {item.queueStatusLabel !== 'In Consultation' ? (
                    <Button size="sm" variant="primary" onClick={() => handleCallPatient(item.id)}>
                      Call Patient
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" disabled>
                      Calling...
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filteredQueue.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#64748B' }}>
                  No patients found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
      
      <WalkInModal isOpen={isWalkInOpen} onClose={() => setWalkInOpen(false)} onSubmit={handleWalkInSubmit} />
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setAppointmentOpen(false)} onSubmit={handleAppointmentSubmit} />
      <BillingModal isOpen={isBillingOpen} onClose={() => setBillingOpen(false)} onSubmit={(data) => alert(`Invoice ${data.invoiceNumber} generated! Total: BDT ${data.total}`)} patientName={selectedPatient} />
      <DiagnosticOrderModal isOpen={isDiagnosticOpen} onClose={() => setDiagnosticOpen(false)} onSubmit={(data) => alert(`Diagnostic order ${data.orderId} placed for ${data.patientName}`)} />
      <CarePassCardModal isOpen={isCarePassOpen} onClose={() => setCarePassOpen(false)} />
      <PrescriptionModal isOpen={isPrescriptionOpen} onClose={() => setPrescriptionOpen(false)} />
    </div>
  );
}
