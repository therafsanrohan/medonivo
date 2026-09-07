import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface DiagnosticOrderRecord {
  id: string;
  tenant_id: string;
  branch_id: string;
  patient_id: string;
  doctor_id?: string;
  test_name: string;
  category: string;
  status: string;
  result_summary?: string;
  created_at: string;
}

@Injectable()
export class DiagnosticsService {
  constructor(private readonly db: DatabaseService) {}

  async createOrder(
    tenantId: string,
    branchId: string,
    patientId: string,
    testName: string,
    category = 'pathology',
    doctorId?: string
  ) {
    const res = await this.db.query<DiagnosticOrderRecord>(
      `INSERT INTO diagnostics.orders (tenant_id, branch_id, patient_id, doctor_id, test_name, category, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'requested')
       RETURNING *`,
      [tenantId, branchId, patientId, doctorId || null, testName, category]
    );

    return res[0];
  }

  async getOrders(tenantId: string) {
    return this.db.query<DiagnosticOrderRecord>(
      `SELECT d.*, p.first_name || ' ' || p.last_name as patient_name
       FROM diagnostics.orders d
       JOIN patient.patients p ON d.patient_id = p.id
       WHERE d.tenant_id = $1
       ORDER BY d.created_at DESC`,
      [tenantId]
    );
  }

  async updateOrderStatus(id: string, status: string, resultSummary?: string) {
    const res = await this.db.query<DiagnosticOrderRecord>(
      `UPDATE diagnostics.orders
       SET status = $1, result_summary = COALESCE($2, result_summary), updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [status, resultSummary || null, id]
    );

    if (res.length === 0) {
      throw new NotFoundException('Diagnostic order not found');
    }

    return res[0];
  }
}
