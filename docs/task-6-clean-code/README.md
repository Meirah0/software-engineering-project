# Task 6 – Clean Code Development

## Goal

The goal of this task is to demonstrate clean code principles using the **HorseCare Manager** project. The focus is on showing how the code is structured to be readable, maintainable, testable, and easy to extend.

This documentation includes:

1. Clean code examples from the source code
2. Explanations of why these examples improve code quality
3. A personal Clean Code cheat sheet with more than ten points
4. Direct references to the code file where the examples can be verified

## Project Used for This Task

The clean code examples are based on the improved Python pet project:

```text
src/horsecare_manager.py
```

HorseCare Manager is a console-based Python application for basic horse and stable care support. It includes features such as horse profile summaries, feeding recommendations, training recommendations, basic health checks, and stable cleaning reminders.

The source code can be found here:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

## Code References

The following clean code principles can be verified directly in the source code:

* Constants: `MIN_HORSE_AGE`, `MAX_HORSE_AGE`, `FEVER_TEMPERATURE`
* Input validation: `validate_horse_age()` and `validate_weight()`
* Meaningful function names: `get_feeding_recommendation()`, `get_training_recommendation()`, `check_health_status()`, `get_stable_care_reminder()`, `create_horse_summary()`
* Single responsibility: each function handles one focused task
* Error handling: clear `ValueError` and `TypeError` messages for invalid input

## Clean Code Examples

## 1. Meaningful Function Names

The function names clearly describe the purpose of each function.

Examples:

```python
get_feeding_recommendation()
get_training_recommendation()
check_health_status()
get_stable_care_reminder()
create_horse_summary()
```

These names make the code easier to understand without needing to read the full implementation first. A developer can quickly understand which part of the program handles feeding, training, health checks, stable care, or horse profile information.

## 2. Clear Constants for Important Values

The code uses constants for important fixed values.

Example:

```python
MIN_HORSE_AGE = 1
MAX_HORSE_AGE = 35
FEVER_TEMPERATURE = 38.5
```

Using constants improves readability because the meaning of the values is clear. It also improves maintainability because the values can be changed in one place instead of being repeated throughout the code.

## 3. Input Validation

The code validates important user input before using it.

Example:

```python
def validate_horse_age(age):
    """Validate horse age and return it as an integer."""
    if not isinstance(age, int):
        raise TypeError("Horse age must be a number.")

    if age < MIN_HORSE_AGE or age > MAX_HORSE_AGE:
        raise ValueError("Horse age must be between 1 and 35 years.")

    return age
```

This is a clean code practice because invalid values are handled early. It prevents unrealistic or incorrect data from moving through the program and makes the behavior easier to test.

## 4. Single Responsibility Principle

Each function has one clear responsibility.

Examples:

* `validate_horse_age()` validates the horse age
* `validate_weight()` validates the horse weight
* `get_feeding_recommendation()` creates a feeding recommendation
* `get_training_recommendation()` creates a training recommendation
* `check_health_status()` checks basic health indicators
* `get_stable_care_reminder()` creates a stable-care reminder
* `create_horse_summary()` creates a short horse profile summary

This structure makes the code easier to read, test, debug, and refactor. If one feature needs to be changed later, it can be adjusted without changing the whole program.

## 5. Clear Error Messages

The program uses clear and specific error messages.

Examples:

```python
"Horse age must be between 1 and 35 years."
"Horse weight must be greater than zero."
"Days since cleaning cannot be negative."
```

Clear error messages help both the user and the developer understand what went wrong. This is better than using unclear messages such as `"Invalid input"` without explanation.

## 6. Separation Between Logic and Console Interaction

The main program logic is placed in separate functions, while the console interaction is handled inside `run_console_app()`.

This makes the project cleaner because the recommendation logic can be tested without needing to interact with the console manually.

For example, the function:

```python
get_feeding_recommendation(weight, activity_level)
```

can be tested directly with unit tests, while the console menu only collects input and displays output.

## 7. Simple and Understandable Program Flow

The console application follows a simple flow:

1. Show menu options
2. Read the user choice
3. Ask for the required input
4. Call the correct function
5. Print the result

This structure makes the program easier to follow and easier to extend with future features.

## Personal Clean Code Cheat Sheet

1. Use meaningful names for functions, variables, and files.
2. Keep functions small and focused.
3. Give each function one clear responsibility.
4. Avoid repeating the same logic in different places.
5. Use constants for important fixed values.
6. Validate input before using it.
7. Write clear and specific error messages.
8. Keep user-facing messages understandable.
9. Avoid unnecessary complexity.
10. Keep formatting consistent.
11. Separate logic from user interaction where possible.
12. Write tests for important behavior.
13. Refactor code when it becomes hard to read.
14. Use comments only when they add useful explanation.
15. Make the code understandable for another developer, not only for yourself.

## Code Verification

The clean code principles described in this document can be reviewed directly in the source code file:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

The file shows the use of constants, validation functions, meaningful function names, clear error messages, and separated responsibilities.

## Reflection

This task helped me understand that clean code is not only about making a program work. It is also about making the code readable, maintainable, testable, and easier to improve later.

The HorseCare Manager project is still a small console application, but it includes enough structure to demonstrate important clean code principles in a practical way.
