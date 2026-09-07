import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface BranchRecord {
  id: string;
  tenant_id: string;
  name: string;
  code: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class OrganizationService {
  constructor(private readonly db: DatabaseService) {}

  async createBranch(tenantId: string, name: string, code: string, address?: string) {
    const res = await this.db.query<BranchRecord>(
      `INSERT INTO organization.branches (tenant_id, name, code, address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [tenantId, name, code, address || null]
    );

    return res[0];
  }

  async getBranches(tenantId: string) {
    return this.db.query<BranchRecord>(
      `SELECT * FROM organization.branches WHERE tenant_id = $1`,
      [tenantId]
    );
  }

  async getBranch(id: string) {
    const res = await this.db.query<BranchRecord>(
      `SELECT * FROM organization.branches WHERE id = $1`,
      [id]
    );

    if (res.length === 0) {
      throw new NotFoundException('Branch not found');
    }

    return res[0];
  }

  async createDepartment(tenantId: string, branchId: string, name: string, code: string) {
    return { id: 'mock-dept-id', branchId, name, code };
  }

  async createRoom(tenantId: string, branchId: string, name: string, code: string) {
    return { id: 'mock-room-id', branchId, name, code };
  }

  async configureOperatingHours(
    tenantId: string,
    branchId: string,
    hours: Array<{ dayOfWeek: number; openTime: string; closeTime: string; isClosed?: boolean }>
  ) {
    return hours.map((h) => ({ id: 'mock-hours-id', branchId, ...h }));
  }

  async createService(tenantId: string, name: string, code: string, basePrice: number) {
    return { id: 'mock-service-id', tenantId, name, code, basePrice };
  }

  async getServices(tenantId: string) {
    return [];
  }

  async createStaffInvitation(tenantId: string, email: string, roleCode: string, phoneNumber?: string) {
    return { id: 'mock-invite-id', tenantId, email, roleCode, token: 'mock-token' };
  }
}
