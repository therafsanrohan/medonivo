export interface ControlTenantFixture {
  id: string;
  name: string;
  branchesCount: number;
  saasPlan: string;
  statusLabel: string;
}

export interface ControlMetricsFixture {
  activeTenants: number;
  activeBranches: number;
  carePassMembers: number;
  monthlyRecurringRevenueBDT: string;
}

export const mockControlMetrics: ControlMetricsFixture = {
  activeTenants: 14,
  activeBranches: 42,
  carePassMembers: 8420,
  monthlyRecurringRevenueBDT: 'BDT 1,420,000'
};

export const mockControlTenants: ControlTenantFixture[] = [
  {
    id: 'tnt_square',
    name: 'Square Hospitals Ltd.',
    branchesCount: 4,
    saasPlan: 'Enterprise Cloud',
    statusLabel: 'Verified Active'
  },
  {
    id: 'tnt_evercare',
    name: 'Evercare Healthcare Network',
    branchesCount: 6,
    saasPlan: 'Enterprise Cloud',
    statusLabel: 'Verified Active'
  }
];
