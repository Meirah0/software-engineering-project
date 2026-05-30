# Task 9 – Build Management

## Goal

The goal of this task is to use a build or automation setup to run project commands in a repeatable way.

For this task, I used a `Makefile` for the **HorseCare Manager** Python project. The Makefile helps organize common project commands such as installing dependencies, running tests, running lint checks, and running software metrics.

## Build Tool Used

The build management tool used in this project is:

```text
Makefile
```

The Makefile is located in the root folder of the repository.

Build file:

[Open Makefile](../../Makefile)

Dependency file:

[Open requirements.txt](../../requirements.txt)

## Project Files Used

Source code:

[Open HorseCare Manager source code](../../src/horsecare_manager.py)

Unit tests:

[Open HorseCare Manager tests](../../tests/test_horsecare_manager.py)

## Available Build Commands

Install dependencies:

```bash
make install
```

Run unit tests:

```bash
make test
```

Run linting:

```bash
make lint
```

Run software metrics:

```bash
make metrics
```

Run all checks:

```bash
make all
```

## What the Build Setup Does

The build setup can run several important project checks:

1. Install project dependencies from `requirements.txt`
2. Run unit tests using `pytest`
3. Run linting using `pylint`
4. Run complexity and maintainability metrics using `radon`

This makes the project easier to check because the commands are documented in one place.

## Build Script

The Makefile contains the following build commands:

```makefile
install:
	pip install -r requirements.txt

test:
	pytest

lint:
	pylint src || true

metrics:
	radon cc src -a
	radon mi src

all: install test lint metrics
```

## Problems and Fixes

One issue with linting is that style warnings can stop an automated run. To keep the build process usable while still showing linting results, the lint command uses:

```bash
pylint src || true
```

This means lint warnings are still displayed, but they do not stop the full build process.

## Code Verification

The build setup can be verified directly through the repository files:

[Open Makefile](../../Makefile)

[Open requirements.txt](../../requirements.txt)

The Makefile shows how the project commands are organized and how tests, linting, and metrics can be executed.

## Reflection

Build management helped me understand how software projects can organize repeated commands in a clean and professional way. Instead of typing every command manually, the Makefile provides a clear structure for running project checks.
