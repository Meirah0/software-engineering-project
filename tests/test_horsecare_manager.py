import pytest

from src.horsecare_manager import (
    check_health_status,
    create_horse_summary,
    get_feeding_recommendation,
    get_stable_care_reminder,
    get_training_recommendation,
    validate_horse_age,
)


def test_feeding_recommendation_without_ai_support():
    result = get_feeding_recommendation(520, "medium")
    assert result == "Balanced feeding plan: hay, water, minerals, and moderate concentrate."


def test_training_recommendation_for_young_horse():
    result = get_training_recommendation(2, "low")
    assert result == "Young horse: focus on light groundwork and short sessions."


def test_high_temperature_health_warning():
    result = check_health_status(39.0, True)
    assert "Contact a veterinarian" in result


def test_stable_cleaning_reminder():
    result = get_stable_care_reminder(3)
    assert result == "Stable care reminder: clean the stable today."


def test_create_horse_summary():
    result = create_horse_summary(" luna ", 7, 480, "Medium")
    assert result == "Horse profile: Luna, 7 years old, 480 kg, activity level: medium."


def test_exception_for_invalid_horse_age():
    with pytest.raises(ValueError, match="Horse age must be between 1 and 35 years"):
        validate_horse_age(40)


def test_exception_for_wrong_age_type():
    with pytest.raises(TypeError, match="Horse age must be a number"):
        validate_horse_age("young")


def test_exception_for_negative_cleaning_days():
    with pytest.raises(ValueError, match="Days since cleaning cannot be negative"):
        get_stable_care_reminder(-1)
