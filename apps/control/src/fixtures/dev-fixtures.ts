// ─────────────────────────────────────────────────────────────────────────────
// Medonivo Control — Rich Mock Fixtures
// ─────────────────────────────────────────────────────────────────────────────

export type SaasPlan = 'Trial' | 'Starter' | 'Growth' | 'Enterprise Cloud' | 'Enterprise Plus';
export type TenantStatus = 'Verified Active' | 'Suspended' | 'Onboarding' | 'Trial';
export type PaymentStatus = 'Paid' | 'Overdue' | 'Pending';
export type ActorType = 'Admin' | 'Doctor' | 'Patient' | 'System';
export type AuditCategory = 'Auth' | 'Tenant' | 'Billing' | 'CarePass' | 'System' | 'Security';
export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type ServiceStatus = 'Operational' | 'Degraded' | 'Down';

export interface ControlTenantFixture {
  id: string;
  name: string;
  slug: string;
  branchesCount: number;
  doctorsCount: number;
  patientMRNTotal: number;
  carePassSubscribers: number;
  saasPlan: SaasPlan;
  monthlyFeeBDT: number;
  outstandingBDT: number;
  paymentStatus: PaymentStatus;
  statusLabel: TenantStatus;
  lastActivity: string;
  city: string;
}

export interface CarePassPlanFixture {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceBDT: number;
  subscribers: number;
  churnRatePct: number;
  arpuBDT: number;
  labDiscountPct: number;
  specialistAccess: boolean;
  familyMembers: number;
  emergencyCover: boolean;
  teleconsultSessions: number;
  accentColor: string;
  glowColor: string;
}

export interface AuditEventFixture {
  id: string;
  timestamp: string;
  actor: string;
  actorType: ActorType;
  event: string;
  category: AuditCategory;
  severity: AuditSeverity;
  tenantId?: string;
  detail: string;
}

export interface SystemServiceFixture {
  id: string;
  name: string;
  status: ServiceStatus;
  uptimePct: number;
  latencyMs: number;
  region: string;
  lastChecked: string;
}

export interface RevenueMonthFixture {
  month: string;
  mrrBDT: number;
  newTenants: number;
  churnedTenants: number;
}

export interface ControlMetricsFixture {
  activeTenants: number;
  activeBranches: number;
  carePassMembers: number;
  monthlyRecurringRevenueBDT: string;
  mrrRaw: number;
  annualRecurringRevenueBDT: string;
  avgDoctorUtilisationPct: number;
  platformUptimePct: number;
  pendingInvoices: number;
  totalDoctors: number;
}

export const mockControlMetrics: ControlMetricsFixture = {
  activeTenants: 14,
  activeBranches: 42,
  carePassMembers: 9960,
  monthlyRecurringRevenueBDT: 'BDT 18,74,000',
  mrrRaw: 1874000,
  annualRecurringRevenueBDT: 'BDT 2,24,88,000',
  avgDoctorUtilisationPct: 78,
  platformUptimePct: 99.97,
  pendingInvoices: 3,
  totalDoctors: 486,
};

export const mockControlTenants: ControlTenantFixture[] = [
  {
    id: 'tnt_square', name: 'Square Hospitals Ltd.', slug: 'square',
    branchesCount: 4, doctorsCount: 92, patientMRNTotal: 41800, carePassSubscribers: 2140,
    saasPlan: 'Enterprise Cloud', monthlyFeeBDT: 280000, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Verified Active', lastActivity: '2 mins ago', city: 'Dhaka',
  },
  {
    id: 'tnt_evercare', name: 'Evercare Healthcare Network', slug: 'evercare',
    branchesCount: 6, doctorsCount: 134, patientMRNTotal: 62300, carePassSubscribers: 3280,
    saasPlan: 'Enterprise Plus', monthlyFeeBDT: 420000, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Verified Active', lastActivity: '8 mins ago', city: 'Dhaka',
  },
  {
    id: 'tnt_united', name: 'United Hospital Ltd.', slug: 'united',
    branchesCount: 3, doctorsCount: 68, patientMRNTotal: 29400, carePassSubscribers: 1620,
    saasPlan: 'Enterprise Cloud', monthlyFeeBDT: 220000, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Verified Active', lastActivity: '15 mins ago', city: 'Dhaka',
  },
  {
    id: 'tnt_popular', name: 'Popular Medical Centre', slug: 'popular',
    branchesCount: 5, doctorsCount: 74, patientMRNTotal: 33200, carePassSubscribers: 940,
    saasPlan: 'Growth', monthlyFeeBDT: 95000, outstandingBDT: 95000,
    paymentStatus: 'Overdue', statusLabel: 'Verified Active', lastActivity: '1 hour ago', city: 'Dhaka',
  },
  {
    id: 'tnt_ibnsina', name: 'Ibn Sina Hospital', slug: 'ibnsina',
    branchesCount: 3, doctorsCount: 44, patientMRNTotal: 18700, carePassSubscribers: 720,
    saasPlan: 'Growth', monthlyFeeBDT: 85000, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Verified Active', lastActivity: '3 hours ago', city: 'Dhaka',
  },
  {
    id: 'tnt_labaid', name: 'Labaid Specialised Hospital', slug: 'labaid',
    branchesCount: 2, doctorsCount: 38, patientMRNTotal: 14200, carePassSubscribers: 480,
    saasPlan: 'Starter', monthlyFeeBDT: 45000, outstandingBDT: 22500,
    paymentStatus: 'Pending', statusLabel: 'Verified Active', lastActivity: '5 hours ago', city: 'Dhaka',
  },
  {
    id: 'tnt_delta', name: 'Delta Medical College & Hospital', slug: 'delta',
    branchesCount: 2, doctorsCount: 28, patientMRNTotal: 9800, carePassSubscribers: 310,
    saasPlan: 'Growth', monthlyFeeBDT: 72000, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Onboarding', lastActivity: '1 day ago', city: 'Dhaka',
  },
  {
    id: 'tnt_medinova', name: 'Medinova Medical Services', slug: 'medinova',
    branchesCount: 1, doctorsCount: 14, patientMRNTotal: 2100, carePassSubscribers: 88,
    saasPlan: 'Trial', monthlyFeeBDT: 0, outstandingBDT: 0,
    paymentStatus: 'Paid', statusLabel: 'Trial', lastActivity: '2 days ago', city: 'Chittagong',
  },
];

export const mockCarePassPlans: CarePassPlanFixture[] = [
  {
    id: 'plan_basic', name: 'Basic', tagline: 'Essential digital health access',
    monthlyPriceBDT: 199, subscribers: 3240, churnRatePct: 4.2, arpuBDT: 191,
    labDiscountPct: 10, specialistAccess: false, familyMembers: 1, emergencyCover: false, teleconsultSessions: 1,
    accentColor: '#64748B', glowColor: 'rgba(100,116,139,0.12)',
  },
  {
    id: 'plan_standard', name: 'Standard', tagline: 'Complete care for individuals',
    monthlyPriceBDT: 499, subscribers: 2180, churnRatePct: 2.8, arpuBDT: 485,
    labDiscountPct: 20, specialistAccess: true, familyMembers: 2, emergencyCover: false, teleconsultSessions: 3,
    accentColor: '#38BDF8', glowColor: 'rgba(56,189,248,0.12)',
  },
  {
    id: 'plan_gold', name: 'Premium Gold', tagline: 'Comprehensive coverage & priority',
    monthlyPriceBDT: 999, subscribers: 1650, churnRatePct: 1.4, arpuBDT: 985,
    labDiscountPct: 35, specialistAccess: true, familyMembers: 4, emergencyCover: true, teleconsultSessions: 10,
    accentColor: '#FBBF24', glowColor: 'rgba(251,191,36,0.12)',
  },
  {
    id: 'plan_family', name: 'Family Shield', tagline: 'Full family protection, all-in-one',
    monthlyPriceBDT: 1799, subscribers: 890, churnRatePct: 0.9, arpuBDT: 1783,
    labDiscountPct: 50, specialistAccess: true, familyMembers: 8, emergencyCover: true, teleconsultSessions: 99,
    accentColor: '#A78BFA', glowColor: 'rgba(167,139,250,0.12)',
  },
];

export const mockAuditEvents: AuditEventFixture[] = [
  { id: 'evt_001', timestamp: '2026-09-06T16:12:00Z', actor: 'Farhan Tanvir', actorType: 'Admin', event: 'Tenant onboarded', category: 'Tenant', severity: 'INFO', tenantId: 'tnt_delta', detail: 'Delta Medical College provisioned on Growth plan' },
  { id: 'evt_002', timestamp: '2026-09-06T15:44:00Z', actor: 'System', actorType: 'System', event: 'Auto-invoice generated', category: 'Billing', severity: 'INFO', tenantId: 'tnt_square', detail: 'Monthly invoice BDT 2,80,000 generated for Square Hospitals' },
  { id: 'evt_003', timestamp: '2026-09-06T14:30:00Z', actor: 'Rashed Karim', actorType: 'Admin', event: 'Plan upgraded', category: 'CarePass', severity: 'INFO', tenantId: 'tnt_evercare', detail: 'Evercare upgraded from Enterprise Cloud to Enterprise Plus' },
  { id: 'evt_004', timestamp: '2026-09-06T13:55:00Z', actor: 'System', actorType: 'System', event: 'Payment reminder sent', category: 'Billing', severity: 'WARNING', tenantId: 'tnt_popular', detail: 'Popular Medical invoice overdue BDT 95,000 — 3rd reminder dispatched' },
  { id: 'evt_005', timestamp: '2026-09-06T12:18:00Z', actor: 'Dr. Shamsul Huda', actorType: 'Doctor', event: 'Bulk prescription export', category: 'System', severity: 'INFO', tenantId: 'tnt_square', detail: 'Doctor exported 42 prescription records via API' },
  { id: 'evt_006', timestamp: '2026-09-06T11:02:00Z', actor: 'Farhan Tanvir', actorType: 'Admin', event: 'Promo code created', category: 'CarePass', severity: 'INFO', detail: 'Code EID2026: 30% off Premium Gold, 500 uses, 30-day expiry' },
  { id: 'evt_007', timestamp: '2026-09-06T09:34:00Z', actor: 'System', actorType: 'System', event: 'Failed login attempt', category: 'Security', severity: 'CRITICAL', detail: '14 failed login attempts from IP 192.168.42.10 — account locked' },
  { id: 'evt_008', timestamp: '2026-09-06T08:50:00Z', actor: 'System', actorType: 'System', event: 'BullMQ queue spike', category: 'System', severity: 'WARNING', detail: 'Job queue depth exceeded 800 — auto-scaled worker instances' },
  { id: 'evt_009', timestamp: '2026-09-05T18:20:00Z', actor: 'Medinova Admin', actorType: 'Admin', event: 'Trial account created', category: 'Tenant', severity: 'INFO', tenantId: 'tnt_medinova', detail: 'Medinova started 30-day trial on Starter tier' },
  { id: 'evt_010', timestamp: '2026-09-05T16:44:00Z', actor: 'Farhan Tanvir', actorType: 'Admin', event: 'Tenant suspended', category: 'Tenant', severity: 'CRITICAL', detail: 'Tenant tnt_xyz suspended due to 90-day payment default' },
  { id: 'evt_011', timestamp: '2026-09-05T14:10:00Z', actor: 'System', actorType: 'System', event: 'DB backup completed', category: 'System', severity: 'INFO', detail: 'Daily PostgreSQL cluster backup — 48.2 GB, 0 errors' },
  { id: 'evt_012', timestamp: '2026-09-05T11:30:00Z', actor: 'Rashed Karim', actorType: 'Admin', event: 'CarePass feature toggled', category: 'CarePass', severity: 'INFO', detail: 'Basic plan: teleconsult sessions increased from 0 to 1' },
  { id: 'evt_013', timestamp: '2026-09-05T09:08:00Z', actor: 'System', actorType: 'System', event: 'SSL cert auto-renewed', category: 'System', severity: 'INFO', detail: 'Wildcard cert *.medonivo.health renewed — valid 90 days' },
  { id: 'evt_014', timestamp: '2026-09-04T17:22:00Z', actor: 'Farhan Tanvir', actorType: 'Admin', event: 'Admin password reset', category: 'Auth', severity: 'WARNING', detail: 'Admin account farhan@medonivo.com password changed' },
  { id: 'evt_015', timestamp: '2026-09-04T14:00:00Z', actor: 'System', actorType: 'System', event: 'Invoice payment received', category: 'Billing', severity: 'INFO', tenantId: 'tnt_united', detail: 'United Hospital invoice BDT 2,20,000 paid via BKASH' },
  { id: 'evt_016', timestamp: '2026-09-04T11:45:00Z', actor: 'System', actorType: 'System', event: 'New CarePass subscribers', category: 'CarePass', severity: 'INFO', detail: '127 new Premium Gold subscribers via partner campaign' },
  { id: 'evt_017', timestamp: '2026-09-03T16:30:00Z', actor: 'Rashed Karim', actorType: 'Admin', event: 'Branch activated', category: 'Tenant', severity: 'INFO', tenantId: 'tnt_ibnsina', detail: 'Ibn Sina Mirpur branch activated — 12 doctors provisioned' },
  { id: 'evt_018', timestamp: '2026-09-03T12:14:00Z', actor: 'System', actorType: 'System', event: 'API rate limit triggered', category: 'Security', severity: 'WARNING', tenantId: 'tnt_labaid', detail: 'Labaid API key hit 10,000 req/min — throttled 15 minutes' },
  { id: 'evt_019', timestamp: '2026-09-02T10:00:00Z', actor: 'Farhan Tanvir', actorType: 'Admin', event: 'Maintenance scheduled', category: 'System', severity: 'WARNING', detail: 'Maintenance window: Sep 10 02:00-04:00 BDT — tenants notified' },
  { id: 'evt_020', timestamp: '2026-09-01T09:00:00Z', actor: 'System', actorType: 'System', event: 'Monthly MRR report', category: 'Billing', severity: 'INFO', detail: 'August 2026 MRR: BDT 18,40,000 (+2.4% vs July)' },
];

export const mockSystemServices: SystemServiceFixture[] = [
  { id: 'svc_api', name: 'API Gateway', status: 'Operational', uptimePct: 99.98, latencyMs: 42, region: 'ap-south-1', lastChecked: '30s ago' },
  { id: 'svc_db', name: 'PostgreSQL Cluster', status: 'Operational', uptimePct: 99.97, latencyMs: 8, region: 'ap-south-1', lastChecked: '30s ago' },
  { id: 'svc_redis', name: 'Redis Cache', status: 'Operational', uptimePct: 99.99, latencyMs: 2, region: 'ap-south-1', lastChecked: '30s ago' },
  { id: 'svc_queue', name: 'BullMQ Job Queue', status: 'Degraded', uptimePct: 99.42, latencyMs: 124, region: 'ap-south-1', lastChecked: '30s ago' },
  { id: 'svc_cdn', name: 'CDN (Cloudflare)', status: 'Operational', uptimePct: 100, latencyMs: 14, region: 'Global', lastChecked: '30s ago' },
  { id: 'svc_auth', name: 'Supabase Auth', status: 'Operational', uptimePct: 99.95, latencyMs: 31, region: 'ap-south-1', lastChecked: '30s ago' },
];

export const mockRevenueTimeseries: RevenueMonthFixture[] = [
  { month: 'Oct 25', mrrBDT: 980000, newTenants: 1, churnedTenants: 0 },
  { month: 'Nov 25', mrrBDT: 1050000, newTenants: 1, churnedTenants: 0 },
  { month: 'Dec 25', mrrBDT: 1120000, newTenants: 0, churnedTenants: 0 },
  { month: 'Jan 26', mrrBDT: 1240000, newTenants: 2, churnedTenants: 0 },
  { month: 'Feb 26', mrrBDT: 1310000, newTenants: 1, churnedTenants: 0 },
  { month: 'Mar 26', mrrBDT: 1380000, newTenants: 1, churnedTenants: 1 },
  { month: 'Apr 26', mrrBDT: 1490000, newTenants: 2, churnedTenants: 0 },
  { month: 'May 26', mrrBDT: 1560000, newTenants: 1, churnedTenants: 0 },
  { month: 'Jun 26', mrrBDT: 1660000, newTenants: 1, churnedTenants: 0 },
  { month: 'Jul 26', mrrBDT: 1720000, newTenants: 2, churnedTenants: 0 },
  { month: 'Aug 26', mrrBDT: 1840000, newTenants: 1, churnedTenants: 0 },
  { month: 'Sep 26', mrrBDT: 1874000, newTenants: 1, churnedTenants: 0 },
];
