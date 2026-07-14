"""Feeding and training recommendation services."""

from backend.services.horse_service import (
    validate_activity_level,
    validate_horse_age,
    validate_weight,
)


def get_feeding_recommendation(weight: float, activity_level: str) -> str:
    """Return a feeding recommendation based on weight and activity."""
    validated_weight = validate_weight(weight)
    activity = validate_activity_level(activity_level)
    daily_forage = round(validated_weight * 0.02, 1)

    plans = {
        "low": (
            "Light feeding plan: quality hay, constant fresh water, minerals, "
            "and only a small concentrate portion if needed."
        ),
        "medium": (
            "Balanced feeding plan: quality hay, fresh water, minerals, and a "
            "moderate concentrate portion split across meals."
        ),
        "high": (
            "Performance feeding plan: quality hay, fresh water, minerals, "
            "electrolytes, and a carefully increased energy feed portion."
        ),
    }
    return f"{plans[activity]} Approximate daily forage target: {daily_forage:g} kg."


def get_training_recommendation(age: int, activity_level: str) -> str:
    """Return an age-aware training recommendation."""
    validate_horse_age(age)
    activity = validate_activity_level(activity_level)

    if age <= 3:
        return (
            "Young horse plan: focus on light groundwork, handling skills, "
            "and short low-impact sessions with frequent rest."
        )
    if age >= 22:
        return (
            "Senior horse plan: prioritize gentle movement, mobility, longer "
            "warm-ups, recovery, and veterinary guidance."
        )
    if activity == "high":
        return (
            "Adult active horse plan: structured conditioning with warm-up, "
            "focused work, recovery days, and cool-down."
        )
    if activity == "medium":
        return (
            "Adult horse plan: balanced riding or groundwork sessions three "
            "to five times weekly with rest days."
        )
    return (
        "Adult light-activity plan: easy movement, turnout, basic groundwork, "
        "and gradual progression."
    )
