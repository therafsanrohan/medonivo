import { hasRole, isSuperAdmin, isHospitalStaff } from '../index';
import { SystemRole, UserSession } from '@medonivo/shared-types';

describe('Auth Utilities', () => {
  const doctorSession: UserSession = {
    userId: 'usr_1',
    roles: [SystemRole.DOCTOR]
  };

  const adminSession: UserSession = {
    userId: 'usr_2',
    roles: [SystemRole.SUPER_ADMIN]
  };

  test('hasRole checks role existence correctly', () => {
    expect(hasRole(doctorSession, [SystemRole.DOCTOR])).toBe(true);
    expect(hasRole(doctorSession, [SystemRole.SUPER_ADMIN])).toBe(false);
  });

  test('isSuperAdmin identifies super admin', () => {
    expect(isSuperAdmin(adminSession)).toBe(true);
    expect(isSuperAdmin(doctorSession)).toBe(false);
  });

  test('isHospitalStaff identifies medical & operational staff', () => {
    expect(isHospitalStaff(doctorSession)).toBe(true);
    expect(isHospitalStaff(adminSession)).toBe(false);
  });
});
