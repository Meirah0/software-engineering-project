# Software Engineering Project

This repository contains my final Software Engineering project documentation and practical work.

The repository is organized as a clear task overview so the required parts can be found easily. Each task has its own folder inside `docs`, with explanations, screenshots, diagrams, code links, or implementation references where needed.

## Project Overview

The main semester project is **Sukoon – Smart Hospital Support Application**, a digital health concept designed to support patients and visitors with hospital navigation, appointment support, emotional support, and clearer hospital communication.

For the coding-related tasks, I also created an improved Python pet project called **HorseCare Manager**. This project is used for Clean Code, Refactoring, Testing, Build Management, and Continuous Delivery because it has more logic and is better suited for practical software engineering examples.

Main code files:

* [Mood Tracker pet project](mood_tracker.py)
* [HorseCare Manager source code](src/horsecare_manager.py)
* [HorseCare Manager tests](tests/test_horsecare_manager.py)

## Tasks Overview

| Task    | Topic                                   | Link                                             |
| ------- | --------------------------------------- | ------------------------------------------------ |
| Task A  | Small Pet Project – Mood Tracker        | [Open Task A](docs/task-a)                       |
| Task 1  | Git                                     | [Open Task 1](docs/task-1-git)                   |
| Task 2  | Requirements                            | [Open Task 2](docs/task-2-requirements)          |
| Task 3  | Analysis                                | [Open Task 3](docs/task-3-analysis)              |
| Task 4  | UML                                     | [Open Task 4](docs/task-4-uml)                   |
| Task 5  | Domain-Driven Design                    | [Open Task 5](docs/task-5-ddd)                   |
| Task 6  | Clean Code – HorseCare Manager          | [Open Task 6](docs/task-6-clean-code)            |
| Task 7  | Refactoring – HorseCare Manager         | [Open Task 7](docs/task-7-refactoring)           |
| Task 8  | Testing – HorseCare Manager             | [Open Task 8](docs/task-8-testing)               |
| Task 9  | Build Management – HorseCare Manager    | [Open Task 9](docs/task-9-build-management)      |
| Task 10 | Continuous Delivery – HorseCare Manager | [Open Task 10](docs/task-10-continuous-delivery) |
| Task 11 | Metrics                                 | [Open Task 11](docs/task-11-metrics)             |
| Task 12 | Architecture                            | [Open Task 12](docs/task-12-architecture)        |
| Task 13 | Assisted Coding / Vibe Coding           | [Open Task 13](docs/task-13-assisted-coding)     |

## Task A – Small Pet Project

Task A documents the first small coding project created to get back into programming practice.

Documentation:

[Open Task A](docs/task-a)

Related code:

[Mood Tracker code](mood_tracker.py)

The repository also includes the improved coding project **HorseCare Manager**, which is used for the later technical tasks because it provides more logic for clean code, refactoring, testing, build management, and continuous delivery.

## Task 1 – Git

This task documents Git usage and version control practice. It includes explanations and screenshots showing commits, repository structure, and Git workflow.

Documentation:

[Open Task 1](docs/task-1-git)

## Task 2 – Requirements

This task contains the requirements work for the Sukoon project. It includes requirement documentation, project constitution files, roadmap, tech stack, and specification/validation materials.

Documentation:

[Open Task 2](docs/task-2-requirements)

## Task 3 – Analysis

This task contains the startup and project analysis for Sukoon. It explains the problem, solution, users, value proposition, market potential, risks, legal considerations, and development plan.

Documentation:

[Open Task 3](docs/task-3-analysis)

## Task 4 – UML

This task contains the UML work for Sukoon. The diagrams include the Class Diagram, Activity Diagram, Component Diagram, and Use Case Diagram.

Documentation:

[Open Task 4](docs/task-4-uml)

## Task 5 – Domain-Driven Design

This task contains the DDD work for Sukoon, including Event Storming, Core Domain Chart, Domain Mapping, and Bounded Context documentation.

Documentation:

[Open Task 5](docs/task-5-ddd)

## Task 6 – Clean Code

This task explains clean code principles using the HorseCare Manager project. It includes examples such as meaningful function names, constants, input validation, single responsibility, and clear error messages.

Documentation:

[Open Task 6](docs/task-6-clean-code)

Code:

[Open HorseCare Manager source code](src/horsecare_manager.py)

## Task 7 – Refactoring

This task documents two refactoring examples from the HorseCare Manager project. It shows before and after code examples and explains why the refactored version is easier to maintain and test.

Documentation:

[Open Task 7](docs/task-7-refactoring)

Code:

[Open HorseCare Manager source code](src/horsecare_manager.py)

## Task 8 – Testing

This task contains unit testing documentation for HorseCare Manager. It uses `pytest` and includes normal behavior tests, exception tests, and type error tests.

Documentation:

[Open Task 8](docs/task-8-testing)

Test file:

[Open HorseCare Manager tests](tests/test_horsecare_manager.py)

## Task 9 – Build Management

This task uses a `Makefile` as a build management tool for the Python project. It includes commands for installing dependencies, running tests, running linting, and running metrics.

Documentation:

[Open Task 9](docs/task-9-build-management)

Build files:

* [Open Makefile](Makefile)
* [Open requirements.txt](requirements.txt)

## Task 10 – Continuous Delivery

This task uses GitHub Actions to run an automated CI workflow. The workflow installs dependencies, runs unit tests, runs linting, and executes metrics commands.

Documentation:

[Open Task 10](docs/task-10-continuous-delivery)

Workflow:

[Open GitHub Actions workflow](.github/workflows/python-ci.yml)

## Task 11 – Metrics

This task documents software metrics work using tools such as Pylint and Radon. It includes explanations of code quality, complexity, and maintainability analysis.

Documentation:

[Open Task 11](docs/task-11-metrics)

## Task 12 – Architecture

This task contains architecture documentation for the project, including architecture decisions, risks, stakeholders, quality attributes, and system structure.

Documentation:

[Open Task 12](docs/task-12-architecture)

## Task 13 – Assisted Coding / Vibe Coding

This task documents the assisted coding process used for the HorseCare Manager project. It explains how the project idea, code structure, testing, build setup, and CI workflow were developed step by step.

Documentation:

[Open Task 13](docs/task-13-assisted-coding)

Related files:

* [HorseCare Manager source code](src/horsecare_manager.py)
* [HorseCare Manager tests](tests/test_horsecare_manager.py)
* [Makefile](Makefile)
* [GitHub Actions workflow](.github/workflows/python-ci.yml)

## How to Run the HorseCare Manager Project

Run the program:

`python src/horsecare_manager.py`

Install dependencies:

`pip install -r requirements.txt`

Run tests:

`pytest`

Run build commands:

`make test`

`make lint`

`make metrics`

## Final Submission Note

The final Moodle submission is the public GitHub repository link. All task documentation and practical files are included in this repository.
