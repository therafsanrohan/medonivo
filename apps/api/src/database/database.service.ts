import { Injectable, OnModuleInit, OnModuleDestroy, Scope, Inject } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private static pool: Pool;
  
  constructor(@Inject(REQUEST) private readonly request: Record<string, unknown>) {}

  async onModuleInit() {
    if (!DatabaseService.pool) {
      DatabaseService.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
  }

  async onModuleDestroy() {
    if (DatabaseService.pool) {
      await DatabaseService.pool.end();
    }
  }

  // Executes a query scoped to the current tenant and user (RLS context)
  async query<T = unknown>(queryText: string, values: unknown[] = []): Promise<T[]> {
    const client: PoolClient = await DatabaseService.pool.connect();
    
    try {
      // Set RLS context variables based on the authenticated request
      const tenantId = this.request.tenantId;
      const userId = this.request.user?.id;
      
      await client.query('BEGIN');
      
      if (tenantId) {
        await client.query(`SET LOCAL app.current_tenant_id = $1`, [tenantId]);
      }
      if (userId) {
        await client.query(`SET LOCAL app.current_user_id = $1`, [userId]);
      }
      
      const res = await client.query(queryText, values);
      await client.query('COMMIT');
      return res.rows;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
