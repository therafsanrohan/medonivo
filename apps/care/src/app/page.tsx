'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, StatusBadge } from '@medonivo/ui';
import { CalendarIcon, FileTextIcon, ShieldCheckIcon, UserIcon } from '@medonivo/icons';
import { mockCareUser, mockUpcomingAppointments } from '../fixtures/dev-fixtures';
import { createClient } from '../utils/supabase/client';

export default function CareHomePage() {
  const [appointments, setAppointments] = useState(mockUpcomingAppointments);
  const [userProfile, setUserProfile] = useState(mockCareUser);

  useEffect(() => {
    const supabase = createClient();
    async function loadPatientData() {
      try {
        const { data } = await supabase
          .from('appointments')
          .select('*');

        if (data && data.length > 0) {
          setAppointments(data.map((apt: any) => ({
            id: apt.id,
            doctorName: apt.doctor_name || 'Dr. Arman Hossain',
            specialty: apt.specialty || 'Cardiology',
            branchName: 'Dhanmondi Branch',
            appointmentTime: new Date(apt.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            queueToken: apt.token || 'A-14',
            estimatedWaitMinutes: 15,
            status: apt.status || 'scheduled'
          })));
        }
      } catch (err) {
        console.error('Care App fetch error:', err);
      }
    }

    loadPatientData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* CarePass Status Hero */}
      <Card style={{ backgroundColor: '#075985', color: '#FFFFFF', border: 'none', marginBottom: '24px' }}>
        <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9, fontWeight: 600 }}>
          {userProfile.carePassPlan}
        </span>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 8px 0', letterSpacing: '-0.3px' }}>
          Welcome back, {userProfile.name}
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
          Your digital health pass includes {userProfile.includedConsultations} free doctor consultations and {userProfile.diagnosticDiscountPercent}% discount on diagnostic test bookings this month.
        </p>
      </Card>

      {/* Quick Healthcare Action Grid */}
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '12px' }}>
        Quick Healthcare Actions
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <Card style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E0EFFE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
            <CalendarIcon size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block' }}>Book Doctor</span>
        </Card>

        <Card style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
            <FileTextIcon size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block' }}>Book Test</span>
        </Card>

        <Card style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFFBEB', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
            <ShieldCheckIcon size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block' }}>CarePass</span>
        </Card>

        <Card style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
            <UserIcon size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block' }}>Family Profiles</span>
        </Card>
      </div>

      {/* Active Appointments & Queue */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', margin: 0 }}>
          Appointments &amp; Queue Status
        </h2>
        <span style={{ fontSize: '12px', color: '#0369A1', fontWeight: 500, cursor: 'pointer' }}>View History</span>
      </div>

      {appointments.map((apt) => (
        <Card key={apt.id} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', margin: 0 }}>{apt.doctorName}</h3>
              <span style={{ fontSize: '13px', color: '#64748B' }}>{apt.specialty} - {apt.branchName}</span>
            </div>
            <StatusBadge status="info" label={`Token #${apt.queueToken}`} />
          </div>
          <p style={{ fontSize: '13px', color: '#475569', margin: '8px 0 12px 0' }}>
            {apt.appointmentTime} (Estimated wait time: ~{apt.estimatedWaitMinutes} mins)
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline" size="sm" onClick={() => alert(`Self Check-in successful for Token #${apt.queueToken}`)}>
              Digital Check-in
            </Button>
            <Button variant="ghost" size="sm" onClick={() => alert('Reschedule request sent to reception.')}>
              Reschedule
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
