import { SystemRole, UserSession } from '@medonivo/shared-types';

export function hasRole(session: UserSession | null, allowedRoles: SystemRole[]): boolean {
  if (!session || !session.roles) return false;
  return session.roles.some((role) => allowedRoles.includes(role));
}

export function isSuperAdmin(session: UserSession | null): boolean {
  return hasRole(session, [SystemRole.SUPER_ADMIN]);
}

export function isHospitalStaff(session: UserSession | null): boolean {
  return hasRole(session, [
    SystemRole.HOSPITAL_ADMIN,
    SystemRole.BRANCH_MANAGER,
    SystemRole.RECEPTIONIST,
    SystemRole.DOCTOR,
    SystemRole.NURSE,
    SystemRole.DIAGNOSTIC_TECH,
    SystemRole.LAB_TECH,
    SystemRole.CASHIER,
    SystemRole.PHARMACIST
  ]);
}
