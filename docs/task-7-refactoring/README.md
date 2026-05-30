# Task 7 – Refactoring

## Goal

The goal of this task is to show two refactoring examples from the **HorseCare Manager** code. Refactoring means improving the structure of the code without changing the main behavior of the program.

The examples are based on the source code file:

```text
src/horsecare_manager.py
```

Source code:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

## Refactoring Example 1 – Extract Horse Age Validation

## Before Refactoring

In an early version, the age validation could have been written directly inside the training recommendation function.

```python
def get_training_recommendation(age, activity_level):
    if age < 1 or age > 35:
        raise ValueError("Invalid horse age.")

    if age <= 3:
        return "Young horse: focus on light groundwork and short sessions."

    if age >= 22:
        return "Senior horse: focus on gentle movement and recovery."
```

## Problem

The validation logic was mixed with the training recommendation logic. This makes the function longer and harder to reuse.

If another part of the program also needs to validate horse age, the same validation logic would have to be repeated again.

## After Refactoring

The validation logic was extracted into a separate function.

```python
MIN_HORSE_AGE = 1
MAX_HORSE_AGE = 35


def validate_horse_age(age):
    """Validate horse age and return it as an integer."""
    if not isinstance(age, int):
        raise TypeError("Horse age must be a number.")

    if age < MIN_HORSE_AGE or age > MAX_HORSE_AGE:
        raise ValueError("Horse age must be between 1 and 35 years.")

    return age
```

The training recommendation function can now call the validation function:

```python
def get_training_recommendation(age, activity_level):
    """Return a training recommendation based on horse age and activity."""
    validate_horse_age(age)
    activity = activity_level.strip().lower()

    if age <= 3:
        return "Young horse: focus on light groundwork and short sessions."

    if age >= 22:
        return "Senior horse: focus on gentle movement and recovery."
```

## Improvement

This refactoring improved the code because:

* age validation is reusable
* the training function is shorter and easier to read
* the accepted age range is controlled by constants
* error handling is clearer
* the validation can be tested separately

## Refactoring Example 2 – Split One Long Console Script into Functions

## Before Refactoring

A first simple version of the program could have been written as one long console script.

```python
choice = input("Choose an option: ")

if choice == "1":
    name = input("Horse name: ")
    age = int(input("Horse age: "))
    weight = float(input("Horse weight in kg: "))
    activity = input("Activity level: ")
    print(f"Horse profile: {name}, {age} years old, {weight} kg.")

elif choice == "2":
    weight = float(input("Horse weight in kg: "))
    activity = input("Activity level: ")

    if activity == "low":
        print("Light feeding plan.")
    elif activity == "medium":
        print("Balanced feeding plan.")
    elif activity == "high":
        print("Performance feeding plan.")
```

## Problem

This structure works for a very small script, but it becomes difficult to maintain when the program grows.

Problems with this structure:

* too much logic is inside one block
* the code is harder to test
* the console menu is mixed with business logic
* the same logic may be repeated
* adding new features becomes more risky

## After Refactoring

The program logic was separated into smaller functions.

```python
def get_feeding_recommendation(weight, activity_level):
    """Return a basic feeding recommendation based on weight and activity."""
    validate_weight(weight)
    activity = activity_level.strip().lower()

    if activity == "low":
        return "Light feeding plan: hay, water, and small concentrate portion."

    if activity == "medium":
        return "Balanced feeding plan: hay, water, minerals, and moderate concentrate."

    if activity == "high":
        return "Performance feeding plan: hay, water, minerals, and higher energy feed."

    return "Unknown activity level. Please choose low, medium, or high."
```

Other responsibilities were also separated into their own functions:

```python
def get_training_recommendation(age, activity_level):
    ...

def check_health_status(temperature, appetite_normal):
    ...

def get_stable_care_reminder(days_since_cleaning):
    ...

def create_horse_summary(name, age, weight, activity_level):
    ...
```

## Improvement

This refactoring improved the code because:

* each function has one clear responsibility
* the logic can be tested without using the console menu
* the code is easier to read and maintain
* future features can be added more safely
* the console interaction is separated from the main program logic

## Code Verification

The refactored version can be reviewed directly in the current source code:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

The current code shows the extracted validation functions, separated recommendation functions, separated health-check logic, and a console function that only handles user interaction.

## Reflection

This task helped me understand that refactoring is not about changing what the program does. It is about improving how the code is structured.

The HorseCare Manager project became easier to understand after separating validation, recommendation logic, health checks, stable-care reminders, and console interaction into different functions.
