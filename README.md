# Hexlet. Gendiff. Frontend project lvl 2.

### Hexlet tests and linter status:

![Actions Status](/workflows/hexlet-check/badge.svg)

[![Node.js CI](https://github.com/nunsez/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/nunsez/frontend-project-lvl2/actions?query=workflow%3A%22Node.js+CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/e4451e5ff95f4cefe9bd/maintainability)](https://codeclimate.com/github/nunsez/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e4451e5ff95f4cefe9bd/test_coverage)](https://codeclimate.com/github/nunsez/frontend-project-lvl2/test_coverage)
_awaiting mentor review..._

**Gendiff** - a program that calculates the difference between two data structures. This is a popular problem, for which there are many online services ([JSON Diff](http://www.jsondiff.com/)). A similar mechanism, for example, is used when outputting tests or when automatically tracking changes in configuration files.

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

## Gendiff API

You can import the utility as a function:

```javascript
import gendiff from 'gendiff';

const difference = gendiff(filepath1, filepath2, formatName);
```

First two arguments `<filepath1>` and `<filepath2>` are paths to files you want to compare. They are required.

The third argument `[formatName]` is a string and is optional. It determines how the result is displayed. List of supported formats:

- `stylish` (uses as default format)
- `plain`
- `json`

Json is a structured format. It allows other programs to use the output for their work.

## Usage examples

### Output help information

[![asciicast](https://asciinema.org/a/Wh8STqyoWdzysqX5YvCxwz8fC.svg)](https://asciinema.org/a/Wh8STqyoWdzysqX5YvCxwz8fC)

### Generate stylish difference between json/yml configs

[![asciicast](https://asciinema.org/a/YYBVE0lcg7kQHxkiCdqMmmLV0.svg)](https://asciinema.org/a/YYBVE0lcg7kQHxkiCdqMmmLV0)

### Generate plain difference between yml/json configs

[![asciicast](https://asciinema.org/a/XBtQIJ2E2Avvye6PlHIZT5fSg.svg)](https://asciinema.org/a/XBtQIJ2E2Avvye6PlHIZT5fSg)

### Generate json difference between yml/yml configs

[![asciicast](https://asciinema.org/a/laWfPEfz2qlU5ijhdmMwphzXH.svg)](https://asciinema.org/a/laWfPEfz2qlU5ijhdmMwphzXH)
