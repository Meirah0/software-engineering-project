PYTHON ?= python
NPM ?= npm

.PHONY: install install-python install-frontend backend frontend test lint complexity build check

install: install-python install-frontend

install-python:
	$(PYTHON) -m pip install -r requirements.txt

install-frontend:
	cd frontend && $(NPM) install

backend:
	$(PYTHON) -m uvicorn backend.main:app --reload

frontend:
	cd frontend && $(NPM) run dev

test:
	$(PYTHON) -m pytest

lint:
	$(PYTHON) -m pylint backend src tests
	cd frontend && $(NPM) run lint

complexity:
	$(PYTHON) -m radon cc backend src -a
	$(PYTHON) -m radon mi backend src

build:
	cd frontend && $(NPM) run build

check: test lint complexity build
