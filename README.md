# Hexlet. Gendiff. Frontend project lvl 2.

[![Node.js CI](https://github.com/nunsez/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/nunsez/frontend-project-lvl2/actions?query=workflow%3A%22Node.js+CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/e4451e5ff95f4cefe9bd/maintainability)](https://codeclimate.com/github/nunsez/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e4451e5ff95f4cefe9bd/test_coverage)](https://codeclimate.com/github/nunsez/frontend-project-lvl2/test_coverage)
_in developing..._

**Gendiff** - a program that determines the difference between two data structures. This is a popular problem, for which there are many online services ([JSON Diff](http://www.jsondiff.com/)). A similar mechanism, for example, is used when outputting tests or when automatically tracking changes in configuration files.

**Utility features:**

- Support for different input formats: yaml, json.
- Generating a report in plain text, stylish and json format.

## Install

```sh
git clone https://github.com/nunsez/frontend-project-lvl2.git
cd frontend-project-lvl2/
make ci
make link
```

## Run tests
```sh
make test
make test-coverage
```

## Usage examples

### Output help information
[![asciicast](https://asciinema.org/a/380488.svg)](https://asciinema.org/a/380488)

### Generate stylish difference between json/yml configs
[![asciicast](https://asciinema.org/a/380489.svg)](https://asciinema.org/a/380489)

### Generate plain difference between yml/json configs
[![asciicast](https://asciinema.org/a/380491.svg)](https://asciinema.org/a/380491)

### Generate json difference between NOEXT(json)/yml configs
[![asciicast](https://asciinema.org/a/380493.svg)](https://asciinema.org/a/380493)

### Hexlet tests and linter status:

![Actions Status](/workflows/hexlet-check/badge.svg)
