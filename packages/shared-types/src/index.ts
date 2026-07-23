export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HOSPITAL_ADMIN = 'HOSPITAL_ADMIN',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  DIAGNOSTIC_TECH = 'DIAGNOSTIC_TECH',
  LAB_TECH = 'LAB_TECH',
  CASHIER = 'CASHIER',
  PHARMACIST = 'PHARMACIST',
  PATIENT = 'PATIENT'
}

export interface UserSession {
  userId: string;
  email?: string;
  phoneNumber?: string;
  roles: SystemRole[];
  tenantId?: string;
  organizationId?: string;
  branchId?: string;
}

export interface TenantContext {
  tenantId: string;
  organizationId: string;
  branchId?: string;
}

export interface HealthCheckStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
  services: {
    database: boolean;
    redis: boolean;
  };
}

export interface AuditLogEntry {
  id: string;
  tenantId?: string;
  organizationId?: string;
  userId?: string;
  action: string;
  entityName: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  createdAt: string;
}

export interface APIErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
  path: string;
}
