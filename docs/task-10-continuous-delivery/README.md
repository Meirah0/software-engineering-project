# Task 10 – Continuous Delivery

## Goal

The goal of this task is to create a Continuous Delivery pipeline that automatically checks the project when changes are pushed to GitHub.

For this task, I used **GitHub Actions** to run automated checks for the HorseCare Manager Python project.

## Tool Used

GitHub Actions was used for the pipeline.

## Workflow File

The workflow file is located here:

```text
.github/workflows/python-ci.yml
```

Workflow link:

[Open GitHub Actions workflow](../../.github/workflows/python-ci.yml)

## Pipeline Steps

The pipeline includes more than two script calls:

1. Install dependencies
2. Run unit tests
3. Run lint check
4. Run complexity metrics
5. Run maintainability metrics

## Workflow Summary

The workflow runs automatically when changes are pushed to the `main` branch or when a pull request is created.

It uses Python 3.11 and checks the HorseCare Manager project automatically.

## Pipeline Script

The workflow includes the following main steps:

```yaml
- name: Install dependencies
  run: pip install -r requirements.txt

- name: Run unit tests
  run: pytest

- name: Run lint check
  run: pylint src || true

- name: Run complexity metrics
  run: radon cc src -a

- name: Run maintainability metrics
  run: radon mi src
```

## Why This Is Useful

Continuous Delivery helps detect problems earlier. If tests fail or a command has an issue, it becomes visible in GitHub Actions.

The pipeline connects testing, linting, and metrics to the GitHub repository and makes the project more professional.

## Code and Build References

Source code:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

Unit tests:

[Open HorseCare Manager tests](../../tests/test_horsecare_manager.py)

Build file:

[Open Makefile](../../Makefile)

Requirements file:

[Open requirements.txt](../../requirements.txt)

## Verification

The Continuous Delivery setup can be verified through the workflow file:

[Open GitHub Actions workflow](../../.github/workflows/python-ci.yml)

The workflow shows that GitHub Actions runs installation, tests, linting, and metrics automatically.

## Reflection

This task helped me understand how automated checks support software quality. Instead of checking everything manually, the pipeline can run important commands automatically after changes are pushed to GitHub.
