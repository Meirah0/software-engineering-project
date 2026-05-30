# Task 6 – Clean Code Development

## Goal

The goal of this task is to show clean code principles in the **HorseCare Manager** code and explain why the code is readable, maintainable, and easy to improve.

This task includes:

1. Five clean code examples from the project code
2. Short explanations of why these examples are clean
3. A personal Clean Code cheat sheet with more than ten points

## Code Used

The clean code examples are based on the improved Python pet project in the repository:

```text
src/horsecare_manager.py
```

HorseCare Manager is a console-based Python project for basic horse and stable care support. It includes feeding recommendations, training recommendations, health checks, stable cleaning reminders, and horse profile summaries.

## Clean Code Examples

## 1. Meaningful Function Names

The function names describe exactly what each part of the program does.

Examples:

```python
get_feeding_recommendation()
get_training_recommendation()
check_health_status()
get_stable_care_reminder()
create_horse_summary()
```

These names make the code easier to understand without reading every line.

## 2. Clear Constants

The code uses constants for important fixed values.

```python
MIN_HORSE_AGE = 1
MAX_HORSE_AGE = 35
FEVER_TEMPERATURE = 38.5
```

This is cleaner than repeating numbers directly inside the code. If the value needs to change later, it can be changed in one place.

## 3. Input Validation

The code validates important user input before using it.

Example:

```python
def validate_horse_age(age):
    if not isinstance(age, int):
        raise TypeError("Horse age must be a number.")

    if age < MIN_HORSE_AGE or age > MAX_HORSE_AGE:
        raise ValueError("Horse age must be between 1 and 35 years.")

    return age
```

This prevents invalid values from moving through the program.

## 4. Single Responsibility

Each function has one main responsibility.

Examples:

* `validate_horse_age()` validates horse age
* `validate_weight()` validates horse weight
* `get_feeding_recommendation()` creates a feeding recommendation
* `get_training_recommendation()` creates a training recommendation
* `check_health_status()` checks basic health indicators
* `get_stable_care_reminder()` creates a stable-care reminder

This makes the code easier to test, understand, and refactor.

## 5. Clear Error Messages

The program uses clear error messages.

Examples:

```python
"Horse age must be between 1 and 35 years."
"Horse weight must be greater than zero."
"Days since cleaning cannot be negative."
```

Clear error messages help users and developers understand what went wrong.

## 6. Simple Console Structure

The console menu is easy to follow. The user selects an option, enters the required information, and receives a clear result.

The program flow is:

1. Show menu options
2. Read user choice
3. Ask for the needed input
4. Call the correct function
5. Print the result

This keeps the program understandable and easy to extend.

## Personal Clean Code Cheat Sheet

1. Use meaningful names for functions, variables, and files.
2. Keep functions small.
3. Give each function one clear responsibility.
4. Avoid repeating the same logic.
5. Use constants for important fixed values.
6. Validate input before using it.
7. Write clear error messages.
8. Keep user messages understandable.
9. Avoid unnecessary complexity.
10. Keep formatting consistent.
11. Write tests for important behavior.
12. Separate calculation logic from user interaction where possible.
13. Refactor when the code becomes hard to read.
14. Use comments only when they add value.
15. Make code understandable for another developer.

## Reflection

This task helped me understand that clean code is not only about making the program work. It is also about making the code easier to read, test, maintain, and improve. The HorseCare Manager project is still small, but it has enough logic to demonstrate meaningful clean code principles.
