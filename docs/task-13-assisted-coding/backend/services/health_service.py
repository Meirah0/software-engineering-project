"""Basic horse health assessment services."""

FEVER_TEMPERATURE = 38.5
MIN_REASONABLE_TEMPERATURE = 30.0
MAX_REASONABLE_TEMPERATURE = 45.0


def check_health_status(temperature: float, appetite_normal: bool) -> dict[str, object]:
    """Return a basic health status and veterinary warning information."""
    if isinstance(temperature, bool) or not isinstance(temperature, (int, float)):
        raise TypeError("Temperature must be a number.")
    if not MIN_REASONABLE_TEMPERATURE <= float(temperature) <= MAX_REASONABLE_TEMPERATURE:
        raise ValueError("Temperature must be between 30 and 45 °C.")
    if not isinstance(appetite_normal, bool):
        raise TypeError("Appetite status must be true or false.")

    warnings: list[str] = []
    if temperature >= FEVER_TEMPERATURE:
        warnings.append("Temperature is high. Contact a veterinarian.")
    if not appetite_normal:
        warnings.append("Appetite is not normal. Monitor closely and contact a veterinarian if it persists.")

    if warnings:
        return {
            "status": "warning",
            "message": "Health warning: " + " ".join(warnings),
            "veterinary_warning": True,
            "warnings": warnings,
        }
    return {
        "status": "normal",
        "message": "Health status looks normal based on the provided temperature and appetite information.",
        "veterinary_warning": False,
        "warnings": [],
    }
