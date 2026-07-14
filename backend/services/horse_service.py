"""Horse profile validation and summary services."""

MIN_HORSE_AGE = 1
MAX_HORSE_AGE = 35
VALID_ACTIVITY_LEVELS = {"low", "medium", "high"}


def validate_horse_age(age: int) -> int:
    """Validate and return a horse age."""
    if isinstance(age, bool) or not isinstance(age, int):
        raise TypeError("Horse age must be a whole number.")
    if not MIN_HORSE_AGE <= age <= MAX_HORSE_AGE:
        raise ValueError("Horse age must be between 1 and 35 years.")
    return age


def validate_weight(weight: float) -> float:
    """Validate and return a horse weight in kilograms."""
    if isinstance(weight, bool) or not isinstance(weight, (int, float)):
        raise TypeError("Horse weight must be a number.")
    if weight <= 0:
        raise ValueError("Horse weight must be greater than zero.")
    if weight > 1500:
        raise ValueError("Horse weight must not exceed 1500 kg.")
    return float(weight)


def validate_activity_level(activity_level: str) -> str:
    """Normalize and validate an activity level."""
    if not isinstance(activity_level, str):
        raise TypeError("Activity level must be text.")
    activity = activity_level.strip().lower()
    if activity not in VALID_ACTIVITY_LEVELS:
        raise ValueError("Activity level must be low, medium, or high.")
    return activity


def create_horse_summary(name: str, age: int, weight: float, activity_level: str) -> str:
    """Create a concise horse profile summary."""
    if not isinstance(name, str) or not name.strip():
        raise ValueError("Horse name cannot be empty.")
    validate_horse_age(age)
    validated_weight = validate_weight(weight)
    activity = validate_activity_level(activity_level)
    weight_text = f"{validated_weight:g}"
    return (
        f"Horse profile: {name.strip().title()}, {age} years old, "
        f"{weight_text} kg, activity level: {activity}."
    )
