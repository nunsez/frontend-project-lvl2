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

const json1 = getFixturePath('nested1.json');
const json2 = getFixturePath('nested2.json');
const yml1 = getFixturePath('nested1.yml');
const yml2 = getFixturePath('nested2.yml');
const stylishDiff = readFile('stylish_diff');
const plainDiff = readFile('plain_diff');

describe('json type tests', () => {
  test.each([
    ['stylish', stylishDiff],
    ['plain', plainDiff],
  ])('%s formater', (format, expected) => {
    const received = genDiff(json1, yml2, format);

    expect(received).toEqual(expected);
  });

  test('json formater', () => {
    const received = genDiff(json1, yml2, 'json');

    expect(() => JSON.parse(received)).not.toThrow();
  });
});

describe('yml type tests', () => {
  test.each([
    ['stylish', stylishDiff],
    ['plain', plainDiff],
  ])('%s formater', (format, expected) => {
    const received = genDiff(yml1, json2, format);

    expect(received).toEqual(expected);
  });

  test('json formater', () => {
    const received = genDiff(yml1, json2, 'json');

    expect(() => JSON.parse(received)).not.toThrow();
  });
});
