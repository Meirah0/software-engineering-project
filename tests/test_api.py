"""FastAPI endpoint tests using TestClient."""

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_validate_age_endpoint():
    response = client.post("/horses/validate-age", json={"age": 7})
    assert response.status_code == 200
    assert response.json() == {"valid": True, "age": 7, "message": "Horse age is valid."}


def test_summary_endpoint():
    response = client.post(
        "/horses/summary",
        json={"name": "Luna", "age": 7, "weight": 480, "activity_level": "medium"},
    )
    assert response.status_code == 200
    assert "Horse profile: Luna" in response.json()["summary"]


def test_feeding_endpoint():
    response = client.post(
        "/recommendations/feeding",
        json={"weight": 500, "activity_level": "high"},
    )
    assert response.status_code == 200
    assert "recommendation" in response.json()


def test_training_endpoint():
    response = client.post(
        "/recommendations/training",
        json={"age": 2, "activity_level": "low"},
    )
    assert response.status_code == 200
    assert "Young horse" in response.json()["recommendation"]


def test_health_check_endpoint():
    response = client.post(
        "/health/check",
        json={"temperature": 38.1, "appetite_normal": True},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "normal"


def test_stable_reminder_endpoint():
    response = client.post("/stable/reminder", json={"days_since_cleaning": 3})
    assert response.status_code == 200
    assert response.json()["cleaning_due"] is True


def test_missing_required_field_returns_422():
    response = client.post("/horses/summary", json={"name": "Luna"})
    assert response.status_code == 422


def test_invalid_data_type_returns_422():
    response = client.post("/recommendations/feeding", json={"weight": "heavy", "activity_level": "medium"})
    assert response.status_code == 422


def test_invalid_activity_returns_422():
    response = client.post("/recommendations/training", json={"age": 7, "activity_level": "extreme"})
    assert response.status_code == 422


def test_invalid_temperature_returns_422():
    response = client.post("/health/check", json={"temperature": 60, "appetite_normal": True})
    assert response.status_code == 422
