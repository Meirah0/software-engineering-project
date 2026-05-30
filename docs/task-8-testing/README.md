# Task 8 – Testing

## Goal

The goal of this task is to add unit tests to the **HorseCare Manager** project and show that important program behavior can be checked automatically.

Testing is applied to the Python source code used for the technical tasks in this repository.

## Test Tool

The project uses `pytest` for unit testing.

## Files Used

Source code file:

```text
src/horsecare_manager.py
```

Test file:

```text
tests/test_horsecare_manager.py
```

## Code and Test References

Source code:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

Test file:

[Open HorseCare Manager tests](../../tests/test_horsecare_manager.py)

## How to Run the Tests

The tests can be run with the following command:

```bash
pytest
```

## Test Coverage Overview

The tests check several important parts of the HorseCare Manager program:

1. Feeding recommendation logic
2. Training recommendation logic
3. Health warning logic
4. Stable cleaning reminder logic
5. Horse profile summary creation
6. Exception handling for invalid input
7. Type error handling for wrong input types

## Test Examples

## 1. Basic Behavior Test

This test checks that a medium activity level returns the expected feeding recommendation.

```python
def test_feeding_recommendation_without_ai_support():
    result = get_feeding_recommendation(520, "medium")
    assert result == "Balanced feeding plan: hay, water, minerals, and moderate concentrate."
```

This is a simple unit test because it checks one function with one expected output.

## 2. Training Recommendation Test

This test checks that a young horse receives a safe light-training recommendation.

```python
def test_training_recommendation_for_young_horse():
    result = get_training_recommendation(2, "low")
    assert result == "Young horse: focus on light groundwork and short sessions."
```

This verifies that the program reacts correctly when the horse is young.

## 3. Health Warning Test

This test checks that a high temperature creates a health warning.

```python
def test_high_temperature_health_warning():
    result = check_health_status(39.0, True)
    assert "Contact a veterinarian" in result
```

This test is important because the health-check function should return a warning when the temperature is too high.

## 4. Stable Cleaning Reminder Test

This test checks whether the program gives a cleaning reminder when the stable has not been cleaned for several days.

```python
def test_stable_cleaning_reminder():
    result = get_stable_care_reminder(3)
    assert result == "Stable care reminder: clean the stable today."
```

## 5. Exception Test

This test checks that an invalid horse age raises an exception.

```python
def test_exception_for_invalid_horse_age():
    with pytest.raises(ValueError, match="Horse age must be between 1 and 35 years"):
        validate_horse_age(40)
```

This is an exception test because the input is outside the accepted age range.

## 6. Type Error Test

This test checks that a wrong data type is rejected.

```python
def test_exception_for_wrong_age_type():
    with pytest.raises(TypeError, match="Horse age must be a number"):
        validate_horse_age("young")
```

This ensures that the function does not accept a text value where a number is expected.

## TDD / Mock Explanation

For this project, a small TDD-style process was used for some parts:

1. Define the expected behavior
2. Write or plan the test case
3. Implement or adjust the function
4. Run the test
5. Improve the code if needed

A mock was not necessary because the current version of HorseCare Manager does not use an external database, API, or service.

If the project later used a stable management database, a veterinary API, or an external notification service, these external dependencies could be mocked during testing.

## Code Verification

The testing work can be verified directly in the test file:

[Open HorseCare Manager tests](../../tests/test_horsecare_manager.py)

The test file includes normal behavior tests, exception tests, and type error tests.

## Reflection

Testing helped make the HorseCare Manager project more reliable. Instead of only running the console program manually, unit tests check the important functions automatically.

The tests also make refactoring safer because the same tests can be run again after improving the code structure.
