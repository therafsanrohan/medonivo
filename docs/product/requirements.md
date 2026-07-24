# Requirements: Medonivo Health OS MVP

## Outpatient Journey Requirements
* **Reception & Walk-in Patient Entry**:
  * Registration with minimal necessary input (Name, Date of Birth, Gender, Mobile Phone).
  * Auto-check for existing matches based on phone number or soundex-style match on name.
* **Scheduling & Slot Management**:
  * Weekly calendar mapping (operating hours, lunch breaks, exceptions, holidays).
  * Auto-generation of available booking slots.
  * Check-in status change that triggers digital queue ticketing.
* **Live Queue Display**:
  * Predicted waiting time calculations (non-guaranteed estimate).
  * Multi-chamber view for hospital reception dashboard displays.

## Diagnostic & Lab Workflow Requirements
* **Test Cataloging**:
  * Unified diagnostic database with custom branch-level pricing.
  * Clear prep/fasting guidelines shown to patient in `care` app.
* **Sample Handling**:
  * Status timeline: Ordered -> Confirmed -> Sample Collected -> Processing -> Approved -> Released.
  * Barcode status updates.
* **Pathologist Verification**:
  * Secure draft results screen (technicians only).
  * Pathologist signing triggers release to patient.

## Financial & Billing Rules
* **Invoice Generation**:
  * Itemized mapping for consultation fees, lab tests, and packages.
  * Minor-unit integer values stored in database (e.g. BDT paisa) to avoid floating-point rounding issues.
* **Payment Actions**:
  * Supports cash, cards, and MFS.
  * Strict transaction boundary: allocating payment must decrement due balance atomatically.
  * Corrections write adjustments rather than mutating/deleting historical payments.

## CarePass Membership rules
* **Benefit Wallet**:
  * Subscriptions store remaining free consultations and test discount percent values.
  * Benefit reservations are generated on booking and finalized upon check-in/invoice allocation.
