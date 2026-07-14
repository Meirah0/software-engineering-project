"""Stable cleaning reminder services."""


def get_stable_care_reminder(days_since_cleaning: int) -> dict[str, object]:
    """Return a stable cleaning reminder and due status."""
    if isinstance(days_since_cleaning, bool) or not isinstance(days_since_cleaning, int):
        raise TypeError("Days since cleaning must be a whole number.")
    if days_since_cleaning < 0:
        raise ValueError("Days since cleaning cannot be negative.")
    cleaning_due = days_since_cleaning >= 2
    message = (
        "Stable care reminder: clean the stable today and refresh the bedding."
        if cleaning_due
        else "Stable care status: cleaning is still up to date."
    )
    return {"cleaning_due": cleaning_due, "message": message}
