# Architectural Overview - Medonivo Health OS

Medonivo Health OS is architected as a modular monolith monorepo powered by NestJS on the backend, Next.js (App Router) on the frontend applications, PostgreSQL + Prisma ORM for relational persistence, and Redis + BullMQ for asynchronous background workers and real-time state synchronization.

## Architecture Layers

```
                                +-------------------+
                                |   Client Apps     |
                                | care | ws | ctrl  |
                                +---------+---------+
                                          |
                                    HTTPS / WSS
                                          |
                                +---------v---------+
                                |   apps/api (NestJS)|
                                |  Modular Monolith |
                                +---------+---------+
                                          |
                 +------------------------+------------------------+
                 |                                                 |
        +--------v--------+                               +--------v--------+
        |   PostgreSQL    |                               | Redis + BullMQ  |
        | Multi-tenant DB |                               |  Worker Queue   |
        +-----------------+                               +-----------------+
```

## Security & Multi-Tenancy

Every database query and mutation is scoped by `tenantId` and `organizationId`. Multi-tenant context is automatically injected by authentication middleware reading signed session JWT tokens.
