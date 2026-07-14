"""Unit tests for backend business services."""

import pytest

from backend.services.health_service import check_health_status
from backend.services.horse_service import create_horse_summary, validate_horse_age
from backend.services.recommendation_service import (
    get_feeding_recommendation,
    get_training_recommendation,
)
from backend.services.stable_service import get_stable_care_reminder


def test_valid_horse_age():
    assert validate_horse_age(7) == 7


def test_invalid_horse_age():
    with pytest.raises(ValueError):
        validate_horse_age(0)


def test_horse_summary_creation():
    summary = create_horse_summary("luna", 7, 480, "medium")
    assert summary == "Horse profile: Luna, 7 years old, 480 kg, activity level: medium."


def test_feeding_recommendation():
    result = get_feeding_recommendation(500, "high")
    assert "Performance feeding plan" in result
    assert "10 kg" in result


def test_training_recommendation_for_young_horse():
    assert "Young horse plan" in get_training_recommendation(3, "low")


def test_training_recommendation_for_adult_horse():
    assert "Adult horse plan" in get_training_recommendation(8, "medium")


def test_normal_health_status():
    result = check_health_status(38.1, True)
    assert result["status"] == "normal"
    assert result["veterinary_warning"] is False


def test_high_temperature_warning():
    result = check_health_status(39.0, True)
    assert result["status"] == "warning"
    assert result["veterinary_warning"] is True


def test_appetite_loss_warning():
    result = check_health_status(38.0, False)
    assert "Appetite" in result["message"]


def test_stable_cleaning_reminder():
    result = get_stable_care_reminder(3)
    assert result["cleaning_due"] is True


def test_no_cleaning_needed():
    result = get_stable_care_reminder(1)
    assert result["cleaning_due"] is False


def test_invalid_service_input():
    with pytest.raises(ValueError):
        get_stable_care_reminder(-1)
