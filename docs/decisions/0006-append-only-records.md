# ADR 0006: Append-Only Architectural Policy for Clinical & Financial Records

## Context
Healthcare regulatory compliance (HIPAA, GDPR, medical audit standards) and financial accounting rules prohibit destructive mutation or silent deletion of medical prescriptions, lab reports, clinical notes, invoices, and payments.

## Decision
- Clinical and financial database records in future modules are strictly **append-only**.
- Record updates must use versioning, status history, corrections, adjustments, refunds, or credit notes.
- Hard deletes (`DELETE FROM ...`) are prohibited on clinical and financial records; corrections append a new version or status entry with an audit log.

## Consequences
- Guarantees complete audit traceability and legal compliance across all patient medical histories and hospital financial ledger transactions.
