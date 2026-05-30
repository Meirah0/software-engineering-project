# Task 4 – UML

## Goal

The goal of this task is to create UML diagrams for the Sukoon project. The diagrams show the system from different perspectives: users, structure, components, and process flow.

The class diagram is mandatory. For this task, four UML diagrams were prepared:

1. Use Case Diagram
2. Class Diagram
3. Component Diagram
4. Activity Diagram

The diagrams are exported as image files and included in this GitHub folder.

---

## Project Context

Sukoon is a smart hospital support application for patients and visitors. The system supports users with hospital navigation, appointment reminders, multilingual guidance, emotional support features, and general hospital information.

The UML diagrams help explain how the system works and how the main parts are connected.

---

## 1. Use Case Diagram

The Use Case Diagram shows the main actors and their interactions with the Sukoon system.

Main actors:

- Patient
- Hospital visitor
- Reception staff
- Hospital admin

Main use cases:

- Search hospital department
- View navigation guidance
- Receive appointment reminder
- Request multilingual support
- Receive emotional support message
- Ask for general hospital information
- Submit feedback
- Update hospital department information

Image:

![Use Case Diagram](./use-case-diagram.png)

---

## 2. Class Diagram

The Class Diagram shows the main classes and relationships in the Sukoon system.

Main classes:

- User
- Patient
- Visitor
- Appointment
- Department
- NavigationService
- ReminderService
- SupportService
- Feedback

Image:

![Class Diagram](./class-diagram.png)

---

## 3. Component Diagram

The Component Diagram shows the main technical components of the system.

Main components:

- Mobile App / Web Interface
- Navigation Module
- Appointment Module
- Support Module
- Multilingual Module
- Feedback Module
- Hospital Database
- Notification Service

Image:

![Component Diagram](./component-diagram.png)

---

## 4. Activity Diagram

The Activity Diagram shows the basic flow of how a user interacts with Sukoon.

Example flow:

1. User opens the application
2. User selects a service
3. System validates the request
4. System provides navigation, appointment, or support information
5. If information is missing, the system redirects the user to reception or staff
6. User can submit feedback

Image:

![Activity Diagram](./activity-diagram.png)

---

## Reflection

The UML diagrams helped structure the Sukoon idea in a more technical way. Instead of only describing the application in text, the diagrams show how users interact with the system, what classes are needed, which components are involved, and how the process flow works.
