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
