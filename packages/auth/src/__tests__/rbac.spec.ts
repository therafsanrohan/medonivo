import { hasRole, isSuperAdmin, isHospitalStaff } from '../index';
import { SystemRole, UserSession } from '@medonivo/shared-types';

describe('RBAC Foundation Policy', () => {
  const patientSession: UserSession = {
    userId: 'usr_pat_1',
    roles: [SystemRole.PATIENT],
    tenantId: 'tnt_demo'
  };

  const doctorSession: UserSession = {
    userId: 'usr_doc_1',
    roles: [SystemRole.DOCTOR],
    tenantId: 'tnt_demo',
    branchId: 'brn_dhaka'
  };

  const superAdminSession: UserSession = {
    userId: 'usr_admin_1',
    roles: [SystemRole.SUPER_ADMIN]
  };

  test('validates Super Admin role privilege', () => {
    expect(isSuperAdmin(superAdminSession)).toBe(true);
    expect(isSuperAdmin(doctorSession)).toBe(false);
  });

  test('validates hospital staff role policy', () => {
    expect(isHospitalStaff(doctorSession)).toBe(true);
    expect(isHospitalStaff(patientSession)).toBe(false);
  });

  test('enforces role matching policy correctly', () => {
    expect(hasRole(doctorSession, [SystemRole.DOCTOR, SystemRole.NURSE])).toBe(true);
    expect(hasRole(patientSession, [SystemRole.DOCTOR])).toBe(false);
  });
});
