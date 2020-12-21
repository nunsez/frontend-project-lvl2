import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getDifference from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('test gendiff parsers', () => {
  const expected = readFile('stylish_diff');

  test.each([
    ['nested1.json', 'nested2.json'],
    ['nested1.yml', 'nested2.yml'],
    ['nested1', 'nested2.yml'],
  ])('test %s %s files', (path1, path2) => {
    const filepath1 = getFixturePath(path1);
    const filepath2 = getFixturePath(path2);
    const received = getDifference(filepath1, filepath2);

    expect(received).toEqual(expected);
  });
});

describe('test gendiff formatters', () => {
  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');

  test.each([
    [undefined, 'stylish_diff'],
    ['stylish', 'stylish_diff'],
    ['plain', 'plain_diff'],
  ])('%s format', (format, diff) => {
    const received = getDifference(filepath1, filepath2, format);
    const expected = readFile(diff);

    expect(received).toEqual(expected);
  });

  test('json format', () => {
    const received = getDifference(filepath1, filepath2, 'json');

    expect(() => JSON.parse(received)).not.toThrow();
  });
});
