import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('nested1');
const filepath2 = getFixturePath('nested2.json');
const filepath3 = getFixturePath('nested2.yml');
const stylishDiff = readFile('stylish_diff');
const plainDiff = readFile('plain_diff');

describe('json type tests', () => {
  test.each([
    ['stylish', stylishDiff],
    ['plain', plainDiff],
  ])('%s formater', (format, expected) => {
    const received = genDiff(filepath1, filepath2, format);

    expect(received).toEqual(expected);
  });

  test('json formater', () => {
    const received = genDiff(filepath1, filepath2, 'json');

    expect(() => JSON.parse(received)).not.toThrow();
  });
});

describe('yml type tests', () => {
  test.each([
    ['stylish', stylishDiff],
    ['plain', plainDiff],
  ])('%s formater', (format, expected) => {
    const received = genDiff(filepath1, filepath3, format);

    expect(received).toEqual(expected);
  });

  test('json formater', () => {
    const received = genDiff(filepath1, filepath3, 'json');

    expect(() => JSON.parse(received)).not.toThrow();
  });
});
