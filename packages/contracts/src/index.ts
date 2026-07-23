import { HealthCheckStatus } from '@medonivo/shared-types';

export interface HealthCheckResponse {
  data: HealthCheckStatus;
  meta: {
    serverTime: string;
  };
}

export interface AuthLoginResponse {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    email?: string;
    phoneNumber?: string;
    roles: string[];
  };
}
