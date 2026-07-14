"""Pydantic request models for the HorseCare API."""

from typing import Literal

from pydantic import BaseModel, Field, StrictBool, field_validator

ActivityLevel = Literal["low", "medium", "high"]


class AgeRequest(BaseModel):
    """Horse age validation request."""

    age: int = Field(ge=1, le=35)


class HorseSummaryRequest(BaseModel):
    """Horse profile summary request."""

    name: str = Field(min_length=1, max_length=80)
    age: int = Field(ge=1, le=35)
    weight: float = Field(gt=0, le=1500)
    activity_level: ActivityLevel

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, value: str) -> str:
        """Reject whitespace-only names."""
        if not value.strip():
            raise ValueError("Horse name cannot be empty.")
        return value.strip()


class FeedingRequest(BaseModel):
    """Feeding recommendation request."""

    weight: float = Field(gt=0, le=1500)
    activity_level: ActivityLevel


class TrainingRequest(BaseModel):
    """Training recommendation request."""

    age: int = Field(ge=1, le=35)
    activity_level: ActivityLevel


class HealthCheckRequest(BaseModel):
    """Health assessment request."""

    temperature: float = Field(ge=30, le=45)
    appetite_normal: StrictBool


class StableReminderRequest(BaseModel):
    """Stable cleaning reminder request."""

    days_since_cleaning: int = Field(ge=0, le=365)
