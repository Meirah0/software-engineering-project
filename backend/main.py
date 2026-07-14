"""FastAPI entry point for HorseCare Manager Pro."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.models import (
    AgeRequest,
    FeedingRequest,
    HealthCheckRequest,
    HorseSummaryRequest,
    StableReminderRequest,
    TrainingRequest,
)
from backend.services.health_service import check_health_status
from backend.services.horse_service import create_horse_summary, validate_horse_age
from backend.services.recommendation_service import (
    get_feeding_recommendation,
    get_training_recommendation,
)
from backend.services.stable_service import get_stable_care_reminder

app = FastAPI(
    title="HorseCare Manager Pro API",
    version="2.0.0",
    description="Distributed backend for horse profile, feeding, training, health, and stable-care guidance.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


def service_error(error: Exception) -> HTTPException:
    """Convert predictable service validation errors into HTTP 400 responses."""
    return HTTPException(status_code=400, detail=str(error))


@app.get("/")
def root() -> dict[str, str]:
    """Return basic API information."""
    return {
        "message": "HorseCare Manager Pro API is running.",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def api_health() -> dict[str, str]:
    """Lightweight backend connection check."""
    return {"status": "healthy", "service": "HorseCare Manager Pro API"}


@app.post("/horses/validate-age")
def validate_age(request: AgeRequest) -> dict[str, object]:
    """Validate a horse age."""
    try:
        age = validate_horse_age(request.age)
    except (TypeError, ValueError) as error:
        raise service_error(error) from error
    return {"valid": True, "age": age, "message": "Horse age is valid."}


@app.post("/horses/summary")
def horse_summary(request: HorseSummaryRequest) -> dict[str, str]:
    """Create a horse profile summary."""
    try:
        summary = create_horse_summary(
            request.name,
            request.age,
            request.weight,
            request.activity_level,
        )
    except (TypeError, ValueError) as error:
        raise service_error(error) from error
    return {"summary": summary}


@app.post("/recommendations/feeding")
def feeding_recommendation(request: FeedingRequest) -> dict[str, str]:
    """Return a feeding recommendation."""
    try:
        recommendation = get_feeding_recommendation(request.weight, request.activity_level)
    except (TypeError, ValueError) as error:
        raise service_error(error) from error
    return {"recommendation": recommendation}


@app.post("/recommendations/training")
def training_recommendation(request: TrainingRequest) -> dict[str, str]:
    """Return a training recommendation."""
    try:
        recommendation = get_training_recommendation(request.age, request.activity_level)
    except (TypeError, ValueError) as error:
        raise service_error(error) from error
    return {"recommendation": recommendation}


@app.post("/health/check")
def health_check(request: HealthCheckRequest) -> dict[str, object]:
    """Return a basic health assessment."""
    try:
        return check_health_status(request.temperature, request.appetite_normal)
    except (TypeError, ValueError) as error:
        raise service_error(error) from error


@app.post("/stable/reminder")
def stable_reminder(request: StableReminderRequest) -> dict[str, object]:
    """Return a stable cleaning reminder."""
    try:
        return get_stable_care_reminder(request.days_since_cleaning)
    except (TypeError, ValueError) as error:
        raise service_error(error) from error
