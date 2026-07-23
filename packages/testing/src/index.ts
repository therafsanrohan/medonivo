import { SystemRole, UserSession } from '@medonivo/shared-types';

export function createMockUserSession(overrides: Partial<UserSession> = {}): UserSession {
  return {
    userId: 'usr_test_123',
    email: 'doctor@medonivo.com',
    phoneNumber: '+8801700000000',
    roles: [SystemRole.DOCTOR],
    tenantId: 'tnt_hospital_alpha',
    organizationId: 'org_main_hospital',
    branchId: 'brn_dhaka_central',
    ...overrides
  };
}
