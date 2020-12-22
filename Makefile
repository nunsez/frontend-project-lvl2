i install:
	npm install

ci:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

link:
	sudo npm link

.PHONY: test
