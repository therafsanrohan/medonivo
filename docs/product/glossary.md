# Domain Glossary: Medonivo Health OS

* **Tenant**: A registered healthcare organization customer (e.g., Square Hospitals Ltd.) representing a secure database boundary.
* **Organization**: An entity within a tenant. Frequently identical, but supports business groups with multiple legal structures.
* **Branch**: A physical location of an organization (e.g., Central Dhaka Branch) owning dedicated rooms, doctors, staff, and cash registers.
* **Department**: Clinical specializations within a branch (e.g., Cardiology, Radiology).
* **Room**: A specific physical or virtual service location (e.g., Room 304, Consultation Chamber B).
* **Medical Record Number (MRN)**: The authoritative global unique identifier for a patient's physical and electronic health records.
* **Slot**: A generated appointment time block representing available clinical resources (Doctor, Room, Branch Hours).
* **Active Chamber Queue**: The live chronological queue of checked-in patients waiting to consult a doctor or undergo diagnostic testing at a specific branch chamber.
* **Invoice Allocation**: The atomic mapping of incoming payments (cash, card, or MFS) to specific outstanding items on an invoice.
* **CarePass Benefit Wallet**: An active balance account tracking a patient's remaining subscription benefits (e.g., number of consultations used, test discount credits).
* **Mobile Financial Services (MFS)**: Mobile money transfer providers (e.g., bKash, Nagad) widely used for healthcare payments in Bangladesh.
* **Audit Log Entry**: An immutable, chronological record tracking read/write operations on sensitive patient, clinical, and financial data.
