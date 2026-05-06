# Sukoon – Smart Hospital Support Application
## DDD Workshop (draw.io Ready)

This document is structured for manual recreation in **draw.io**.
Each part lists the elements, colors, and layout instructions.

---

## PART 1 — EVENT STORMING

### Sticky Note Legend
| Color | Type | Meaning |
|---|---|---|
| Orange | Domain Event | Something that already happened |
| Blue | Command | An action/request triggered by an actor |
| Yellow | Actor | A user or external system |
| Pink | Domain | A logical business area |

### Elements

**ORANGE — Domain Events**
- User Registered
- User Logged In
- Department Searched
- Directions Requested
- Appointment Booked
- Appointment Rescheduled
- Appointment Cancelled
- Reminder Scheduled
- Reminder Sent
- AI Support Requested
- AI Response Generated
- Escalation Requested
- Hospital Data Updated
- Report Generated

**BLUE — Commands**
- Register User
- Login User
- Search Department
- Request Directions
- Book Appointment
- Reschedule Appointment
- Cancel Appointment
- Schedule Reminder
- Send Reminder
- Start AI Chat
- Escalate to Staff
- Update Hospital Data
- Generate Report

**YELLOW — Actors**
- Patient
- Visitor
- Admin
- Hospital Staff
- AI Chatbot
- Notification Service

**PINK — Domains**
- Authentication
- Navigation
- Appointment Management
- Notification Management
- AI Support
- Administration
- Hospital Data Management
- Reporting

### Timeline Flows (left → right)
Each row = one flow: **Actor → Command → Event → Domain**

| Actor (Yellow) | Command (Blue) | Event (Orange) | Domain (Pink) |
|---|---|---|---|
| Patient | Register User | User Registered | Authentication |
| Patient | Login User | User Logged In | Authentication |
| Visitor | Search Department | Department Searched | Navigation |
| Visitor | Request Directions | Directions Requested | Navigation |
| Patient | Book Appointment | Appointment Booked | Appointment Management |
| Patient | Reschedule Appointment | Appointment Rescheduled | Appointment Management |
| Patient | Cancel Appointment | Appointment Cancelled | Appointment Management |
| System | Schedule Reminder | Reminder Scheduled | Notification Management |
| Notification Service | Send Reminder | Reminder Sent | Notification Management |
| Patient | Start AI Chat | AI Support Requested | AI Support |
| AI Chatbot | — | AI Response Generated | AI Support |
| AI Chatbot | Escalate to Staff | Escalation Requested | AI Support |
| Admin | Update Hospital Data | Hospital Data Updated | Hospital Data Management |
| Admin | Generate Report | Report Generated | Reporting |

### How to Arrange in draw.io
1. Draw a long horizontal **timeline arrow** at the top.
2. Create **4 horizontal lanes** (top to bottom):
   - Lane 1: Yellow (Actors)
   - Lane 2: Blue (Commands)
   - Lane 3: Orange (Events)
   - Lane 4: Pink (Domains)
3. Place each row of the table above as a **vertical column** (Actor → Command → Event → Domain).
4. Group columns by domain, left to right:
   Authentication → Navigation → Appointment → Notification → AI Support → Administration → Reporting.
5. Use **straight arrows** between stickies in the same column only.
6. Keep equal spacing — looks clean and student-made.

---

## PART 2 — CORE DOMAIN CHART

### Layout: 3 Columns

| CORE DOMAIN (Orange/Red) | SUPPORTING DOMAIN (Blue) | GENERIC DOMAIN (Gray/Green) |
|---|---|---|
| Appointment Management | Notification Management | Authentication |
| Navigation Support | Hospital Data Management | User Management |
| AI Emotional Support | Reporting | |

### Definitions
- **Core Domain** — The unique business value; what makes Sukoon different. Build in-house.
- **Supporting Domain** — Necessary helpers around the core; can be built simply or partially outsourced.
- **Generic Domain** — Common functionality; use ready-made libraries or services.

### Why each domain belongs there

**Core**
- *Appointment Management* — The main service patients use; central to Sukoon’s value.
- *Navigation Support* — In-hospital wayfinding is a key differentiator.
- *AI Emotional Support* — Unique chatbot feature that sets Sukoon apart.

**Supporting**
- *Notification Management* — Helps the core (reminders) but is not unique.
- *Hospital Data Management* — Needed to feed core domains with data.
- *Reporting* — Useful for admin insight, not user-facing core value.

**Generic**
- *Authentication* — Standard login/registration; same as any app.
- *User Management* — Common profile/role handling.

### draw.io tip
Use 3 large rectangles side by side. Inside each rectangle, list domains as small rounded boxes.
Color: Core = `#F8CBAD`, Supporting = `#BDD7EE`, Generic = `#D9D9D9`.

---

## PART 3 — DOMAIN MAPPING (RELATIONSHIPS)

### Relationships

| From | → | To | Type |
|---|---|---|---|
| Authentication | → | Appointment Management | Customer/Supplier |
| Authentication | → | AI Support | Customer/Supplier |
| Appointment Management | → | Notification Management | Published Language |
| Appointment Management | → | Reporting | Published Language |
| Hospital Data Management | → | Navigation | Shared Kernel |
| AI Support | → | Hospital Staff (Escalation) | Customer/Supplier |
| Administration | → | Hospital Data Management | Conformist |

### DDD Relationship Types (short)
- **Customer/Supplier** — Downstream depends on upstream; upstream provides what downstream needs.
- **Shared Kernel** — Two contexts share a small common model.
- **Conformist** — Downstream simply accepts upstream’s model as-is.
- **Published Language** — A well-defined, shared format (e.g., events) used to communicate.

### draw.io tip
- Place each domain as a labeled rectangle.
- Use **straight arrows only** with the relationship type written on the line.
- Avoid arrow crossings — arrange domains in a circle or 2 rows.

Suggested layout (2 rows):
```
Row 1: Authentication   Appointment Mgmt   Notification Mgmt   Reporting
Row 2: Hospital Data    Navigation         AI Support          Administration
```

---

## PART 4 — BOUNDED CONTEXT CANVAS — Appointment Management

### 1. Context Name
**Appointment Management**

### 2. Purpose
Manage the full lifecycle of patient appointments — booking, viewing,
rescheduling, cancellation — and trigger reminders so patients attend on time.

### 3. Responsibilities
- Book appointment
- View appointment
- Reschedule appointment
- Cancel appointment
- Trigger reminder

### 4. Commands
- Book Appointment
- Reschedule Appointment
- Cancel Appointment

### 5. Events
- Appointment Booked
- Appointment Rescheduled
- Appointment Cancelled
- Reminder Scheduled

### 6. Actors
- Patient
- Hospital Staff
- Notification Service

### 7. Inputs
- Patient data
- Appointment request
- Doctor availability

### 8. Outputs
- Appointment confirmation
- Reminder scheduling
- Appointment updates

### 9. Connected Domains
- Authentication (upstream — Customer/Supplier)
- Notification Management (downstream — Published Language)
- Reporting (downstream — Published Language)

### Canvas Layout in draw.io
Draw one large rectangle divided into 9 sections (3×3 grid):

```
+----------------------+----------------------+----------------------+
| 1. Context Name      | 2. Purpose           | 3. Responsibilities  |
+----------------------+----------------------+----------------------+
| 4. Commands          | 5. Events            | 6. Actors            |
+----------------------+----------------------+----------------------+
| 7. Inputs            | 8. Outputs           | 9. Connected Domains |
+----------------------+----------------------+----------------------+
```

Use a light header color (e.g., light blue) on each section title and
keep the body white — looks clean and manually made.

---

## Suggested Diagram Order to Build in draw.io
1. Event Storming Diagram (timeline with 4 colored lanes)
2. Core Domain Chart (3 columns)
3. Domain Mapping Diagram (boxes + labeled arrows)
4. Bounded Context Canvas (3×3 grid)

Export each as PNG once finished.
