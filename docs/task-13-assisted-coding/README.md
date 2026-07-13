# Task 13 – Assisted / Vibe Coding

## Goal

The goal of this task was to use assisted coding and vibe coding to develop, improve, test, and visually extend the **HorseCare Manager Pro** project.

The final result is a distributed client-server application with:

- A Lovable web frontend
- A FastAPI backend
- Separate Python service modules
- HTTP and JSON communication
- Pydantic validation
- Pytest service and API tests
- GitHub Actions
- Documentation and live demo evidence

---

## Project Overview

HorseCare Manager Pro is a horse and stable care support application.

It includes:

- Horse profile summary
- Horse age validation
- Feeding recommendations
- Training recommendations
- Health checks
- Stable cleaning reminders

---

## Part A – Original Tkinter GUI

The first version used a Python Tkinter interface.

The GUI directly imported and called functions from `horsecare_manager.py`.

This version was modular because the code was separated into functions and files, but it was not distributed because the interface and business logic ran inside the same Python process.

The old Tkinter interface is now preserved only as a legacy client:

[Open Legacy Tkinter Client](../../legacy/horsecare_gui.py)

---

## Part B – Lovable Web Design

A professional HorseCare Manager Pro dashboard was designed using Lovable.

The design includes:

- Dark forest-green sidebar
- Premium cream and gold visual identity
- Horse profile cards
- Feeding and training sections
- Health and stable-care actions
- Realistic stable image
- Recommendation result panel
- Responsive dashboard layout

The original Lovable design was preserved and connected to the real FastAPI backend.

The Lovable interface is no longer only a visual prototype. It is now the real frontend of the application.

[Open Frontend](../../frontend)

---

## Part C – Distributed Client-Server Application

The original architecture was:

```text
Tkinter GUI
    ↓
Direct Python imports
    ↓
horsecare_manager.py
```

The GUI directly imported Python functions. There were no HTTP requests, no API layer, and no JSON communication.

The new architecture is:

```text
Lovable Web Frontend
        ↓
HTTP Request with JSON
        ↓
FastAPI Backend
        ↓
Separate Service Modules
        ↓
JSON Response
        ↓
Lovable Web Frontend
```

The frontend and backend now run as separate applications:

```text
Frontend: http://localhost:8080
Backend:  http://127.0.0.1:8000
Swagger:  http://127.0.0.1:8000/docs
```

This makes the application distributed because the frontend and backend run in separate processes and communicate through HTTP and JSON.

---

## Backend Structure

The FastAPI backend entry point is:

[backend/main.py](../../backend/main.py)

The service modules are:

| File | Responsibility |
|---|---|
| [horse_service.py](../../backend/services/horse_service.py) | Horse age validation and profile summary |
| [recommendation_service.py](../../backend/services/recommendation_service.py) | Feeding and training recommendations |
| [health_service.py](../../backend/services/health_service.py) | Temperature and appetite checks |
| [stable_service.py](../../backend/services/stable_service.py) | Stable cleaning reminders |

The backend uses Pydantic models to validate incoming JSON requests.

---

## API Endpoints

The main API endpoints are:

```text
GET  /health
POST /horses/validate-age
POST /horses/summary
POST /recommendations/feeding
POST /recommendations/training
POST /health/check
POST /stable/reminder
```

The API documentation can be opened at:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Communication

The Lovable frontend does not import Python functions.

It uses `fetch` requests to send JSON data to FastAPI.

Example communication flow:

```text
User clicks Feeding Plan
        ↓
Frontend sends POST request
        ↓
FastAPI validates JSON
        ↓
Recommendation service runs
        ↓
Backend returns JSON
        ↓
Result appears in the dashboard
```

The frontend also checks:

```text
GET /health
```

to display:

```text
Backend Online
Backend Offline
```

---

## Testing

The project includes:

- Original HorseCare Manager tests
- Service module tests
- FastAPI endpoint tests
- Valid input tests
- Invalid input tests
- Pydantic validation tests
- Backend health endpoint test

Important test files:

| File | Purpose |
|---|---|
| [test_horsecare_manager.py](../../tests/test_horsecare_manager.py) | Original logic tests |
| [test_services.py](../../tests/test_services.py) | Service module tests |
| [test_api.py](../../tests/test_api.py) | FastAPI endpoint tests |

Run all tests with:

```powershell
python -m pytest
```

---

## Running the Application

### Terminal 1 – Backend

From the main project folder:

```powershell
.venv\Scripts\Activate.ps1
python -m uvicorn backend.main:app --reload
```

### Terminal 2 – Frontend

```powershell
cd frontend
npm run dev
```

Open:

```text
http://localhost:8080
```

Both terminals must remain open because the frontend and backend are separate applications.

---

## Development Tools

The project was developed using:

- Visual Studio Code
- Python
- FastAPI
- Pydantic
- React
- TypeScript
- Lovable
- TanStack
- Vite
- HTTP and JSON
- Pytest
- FastAPI TestClient
- Pylint
- Radon
- Makefile
- GitHub Actions

---

## Assisted Coding Process

The development process included:

1. Creating the HorseCare Manager concept
2. Improving the Python logic
3. Adding validation and error handling
4. Creating pytest tests
5. Adding a Makefile and GitHub Actions
6. Creating the original Tkinter GUI
7. Designing a premium dashboard in Lovable
8. Separating the frontend and backend
9. Creating a FastAPI API layer
10. Creating separate service modules
11. Replacing local frontend logic with real HTTP requests
12. Adding loading, success, validation, and connection states
13. Testing the services and API endpoints
14. Documenting the distributed architecture

---

## What Was Improved

The final version improves the original project by adding:

- Separate frontend and backend applications
- HTTP communication
- JSON requests and responses
- FastAPI endpoints
- Pydantic validation
- Separate service modules
- Modern Lovable web interface
- Backend connection status
- Loading and error handling
- Service tests
- API endpoint tests
- Swagger documentation
- Working sidebar navigation
- Professional live demo interface

---

## Limitations

This project is an educational software engineering application.

The recommendations are simplified and are intended to demonstrate application logic and distributed architecture.

A production version would require:

- User authentication
- Database storage
- HTTPS
- Professional veterinary validation
- More detailed horse data
- Logging and monitoring
- Deployment configuration

---

## Reflection

This task helped me understand the difference between modular and distributed architecture.

The original Tkinter application was modular because its code was separated into functions and files. However, it was not distributed because the interface directly imported Python functions.

The final version separates the Lovable frontend from the FastAPI backend. The applications run independently and communicate through HTTP and JSON.

I also learned that assisted coding is most useful when the generated work is reviewed, adapted, tested, and understood instead of being accepted without evaluation.

---

## Practical Evidence

The final evidence should include screenshots of:

- Final project folder structure
- FastAPI backend terminal
- Lovable frontend terminal
- Dashboard with Backend Online
- Horse summary result
- Feeding or training recommendation
- Health check result
- Stable-care result
- Browser Network request
- JSON request payload
- JSON backend response
- FastAPI Swagger documentation
- Passing pytest results

---

## Final Result

HorseCare Manager Pro is now a working distributed client-server application.

```text
Lovable Frontend
        ↓
HTTP + JSON
        ↓
FastAPI Backend
        ↓
Service Modules
```

The frontend no longer directly imports Python business logic, and all real results are returned by the FastAPI backend.
