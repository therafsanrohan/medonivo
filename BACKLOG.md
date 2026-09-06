# Medonivo Project Backlog & Remaining Tasks

This document outlines the remaining development sprints and tasks for the Medonivo Frontend Development System. 

**Status:** ✅ Sprint 01 (Landing Page) is completed. The following sprints are pending development.

---

## 🏃‍♂️ Sprint 02: Patient / Family Dashboard
**Objective:** Build the complete Patient and Family healthcare experience.
- [ ] **Authentication:** Setup patient demo login, session persistence, and protected routes.
- [ ] **Dashboard Home:** Implement "Needs Attention", priority care actions, active CareLoops, upcoming appointments, today's medicines.
- [ ] **CareLoop:** Active/Completed lists, detail page, task timeline (Consultation, Medication, Test, Report Upload, Review).
- [ ] **Smart Prioritization Engine:** Rule-based layer for demo data (e.g., overdue follow-ups > future appointments).
- [ ] **Family Health Hub:** Member switching, independent CareLoops, separated records.
- [ ] **Smart Health Timeline:** Chronological timeline with grouping and filters.
- [ ] **Emergency Health Card:** QR code generation, privacy controls, edit capabilities.
- [ ] **Medicine Schedule:** Today, Upcoming, History views with state updates.
- [ ] **Follow-up Tracker:** Track states (Upcoming, Due Today, Overdue) with direct booking CTA.
- [ ] **Doctor Discovery & Booking:** Search, filter, profiles, and a 3-step booking flow.
- [ ] **Health Records:** Management of Prescriptions, Lab Reports, etc. with simulated upload.
- [ ] **Care Passport:** Generate temporary access via QR/code.
- [ ] **Messaging & Notifications:** Patient-doctor messaging demo and actionable notifications.

## 🩺 Sprint 03: Doctor Dashboard
**Objective:** Build a professional clinical workspace for doctors.
- [ ] **Authentication:** Protected Doctor role access.
- [ ] **Doctor Home:** Today's queue, pending reports, recent CareLoops.
- [ ] **Appointment Queue & Patient Summary:** View schedules, no-shows, and critical patient info (allergies, active CareLoops).
- [ ] **Consultation Workspace:** Focused workflow for symptoms, notes, prescriptions, and recommended tests.
- [ ] **Prescription Builder:** Dynamic form for adding multiple medicines (strength, dosage, timing).
- [ ] **CareLoop Generation:** Automatically convert consultation instructions into patient CareLoop tasks.
- [ ] **Report Review:** Mark reports as reviewed, add notes, attach to CareLoops.
- [ ] **Doctor Write-Back & Messaging:** Submit outcomes and manage patient messages.
- [ ] **Availability & Profile Management:** Manage slots, working hours, and professional details.

## 🏥 Sprint 04: Medical / Organization Dashboard
**Objective:** Build the healthcare organization management workspace (Clinics, Hospitals).
- [ ] **Organization Home:** Overview of doctors, capacity, and active departments.
- [ ] **Doctor Management:** Invite, review, approve, reject, or suspend doctors.
- [ ] **Verification Review:** Interface to check medical registration and qualifications.
- [ ] **Department & Branch Management:** Create and assign doctors to specific branches/departments.
- [ ] **Appointment Operations & Schedules:** Monitor organization-wide schedules without exposing clinical data.
- [ ] **Staff Roles:** Configure permissions (Owner, Admin, Credential Manager, Reception).
- [ ] **Organization Analytics:** Appointments, no-shows, and doctor utilization metrics.

## 🛡️ Sprint 05: Medonivo Admin Dashboard
**Objective:** Super Admin platform management application.
- [ ] **Admin Home:** Platform metrics (total patients, verified doctors, support issues).
- [ ] **Organization & Independent Doctor Verification:** Queue to review and approve new entities.
- [ ] **User & Role Management:** Manage Super Admins, Operations, Support, and suspend flagged accounts.
- [ ] **Support & Abuse Management:** Ticketing system and report resolution.
- [ ] **Audit Logs:** Searchable logs tracking actor, action, timestamp, and target.
- [ ] **Platform Settings & Analytics:** Feature flags, public content (FAQ), and growth trends.

---
*Note: Before marking any sprint complete, ensure all requirements regarding responsiveness, accessibility (a11y), TypeScript checks, and Lighthouse performance targets (90+) are met.*
