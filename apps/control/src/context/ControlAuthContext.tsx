'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  mockControlTenants, mockCarePassPlans, mockAuditEvents,
  mockSystemServices, mockRevenueTimeseries, mockControlMetrics,
  type ControlTenantFixture, type CarePassPlanFixture, type AuditEventFixture,
  type SystemServiceFixture, type RevenueMonthFixture, type ControlMetricsFixture,
} from '../fixtures/dev-fixtures';

interface ControlAuthContextValue {
  adminName: string;
  adminRole: string;
  adminInitials: string;
  platformStatus: 'OPERATIONAL' | 'DEGRADED' | 'INCIDENT';
  tenants: ControlTenantFixture[];
  carePassPlans: CarePassPlanFixture[];
  auditEvents: AuditEventFixture[];
  systemServices: SystemServiceFixture[];
  revenueTimeseries: RevenueMonthFixture[];
  metrics: ControlMetricsFixture;
  onboardTenant: (tenant: Omit<ControlTenantFixture, 'lastActivity' | 'patientMRNTotal'>) => void;
  suspendTenant: (id: string) => void;
  activateTenant: (id: string) => void;
  markInvoicePaid: (tenantId: string) => void;
}

const ControlAuthContext = createContext<ControlAuthContextValue | null>(null);

export function ControlAuthProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<ControlTenantFixture[]>(mockControlTenants);

  const onboardTenant = useCallback((tenant: Omit<ControlTenantFixture, 'lastActivity' | 'patientMRNTotal'>) => {
    const newTenant: ControlTenantFixture = { ...tenant, patientMRNTotal: 0, lastActivity: 'Just now' };
    setTenants(prev => [newTenant, ...prev]);
  }, []);

  const suspendTenant = useCallback((id: string) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, statusLabel: 'Suspended' } : t));
  }, []);

  const activateTenant = useCallback((id: string) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, statusLabel: 'Verified Active' } : t));
  }, []);

  const markInvoicePaid = useCallback((tenantId: string) => {
    setTenants(prev => prev.map(t =>
      t.id === tenantId ? { ...t, outstandingBDT: 0, paymentStatus: 'Paid' } : t
    ));
  }, []);

  return (
    <ControlAuthContext.Provider value={{
      adminName: 'Farhan Tanvir',
      adminRole: 'Chief Platform Officer',
      adminInitials: 'FT',
      platformStatus: 'OPERATIONAL',
      tenants,
      carePassPlans: mockCarePassPlans,
      auditEvents: mockAuditEvents,
      systemServices: mockSystemServices,
      revenueTimeseries: mockRevenueTimeseries,
      metrics: mockControlMetrics,
      onboardTenant,
      suspendTenant,
      activateTenant,
      markInvoicePaid,
    }}>
      {children}
    </ControlAuthContext.Provider>
  );
}

export function useControlAuth(): ControlAuthContextValue {
  const ctx = useContext(ControlAuthContext);
  if (!ctx) throw new Error('useControlAuth must be used within ControlAuthProvider');
  return ctx;
}
