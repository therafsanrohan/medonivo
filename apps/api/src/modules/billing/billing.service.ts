import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface InvoiceRecord {
  id: string;
  tenant_id: string;
  branch_id: string;
  patient_id: string;
  invoice_number: string;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

@Injectable()
export class BillingService {
  constructor(private readonly db: DatabaseService) {}

  async createInvoice(
    tenantId: string,
    branchId: string,
    patientId: string,
    subtotal: number,
    discountAmount: number,
    paymentMethod: string,
    appointmentId?: string
  ) {
    const totalAmount = Math.max(0, subtotal - discountAmount);
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const res = await this.db.query<InvoiceRecord>(
      `INSERT INTO billing.invoices 
        (tenant_id, branch_id, patient_id, appointment_id, invoice_number, subtotal, discount_amount, total_amount, paid_amount, status, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8, 'paid', $9)
       RETURNING *`,
      [tenantId, branchId, patientId, appointmentId || null, invoiceNumber, subtotal, discountAmount, totalAmount, paymentMethod]
    );

    return res[0];
  }

  async getInvoices(tenantId: string) {
    return this.db.query<InvoiceRecord>(
      `SELECT i.*, p.first_name || ' ' || p.last_name as patient_name
       FROM billing.invoices i
       JOIN patient.patients p ON i.patient_id = p.id
       WHERE i.tenant_id = $1
       ORDER BY i.created_at DESC`,
      [tenantId]
    );
  }

  async getInvoiceById(id: string) {
    const res = await this.db.query<InvoiceRecord>(
      `SELECT * FROM billing.invoices WHERE id = $1`,
      [id]
    );

    if (res.length === 0) {
      throw new NotFoundException('Invoice not found');
    }

    return res[0];
  }
}
