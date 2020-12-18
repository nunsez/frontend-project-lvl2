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

test('gendiff flat json files', () => {
  const filepath1 = getFixturePath('plain1.json');
  const filepath2 = getFixturePath('plain2.json');
  const filepath3 = getFixturePath('plain1');
  const filepath4 = getFixturePath('plain2');

  const expected = readFile('plain_diff');
  const received1 = getDifference(filepath1, filepath2);
  const received2 = getDifference(filepath3, filepath4);
  const received3 = getDifference(filepath1, filepath4);

  expect(received1).toEqual(expected);
  expect(received2).toEqual(expected);
  expect(received3).toEqual(expected);
});

test('gendiff flat yml files', () => {
  const filepath1 = getFixturePath('plain1.yml');
  const filepath2 = getFixturePath('plain2.yml');

  const received = getDifference(filepath1, filepath2);
  const expected = readFile('plain_diff');

  expect(received).toEqual(expected);
});

test('gendiff nested json files', () => {
  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');

  const received = getDifference(filepath1, filepath2);
  const expected = readFile('nested_diff');

  expect(received).toEqual(expected);
});

test('gendiff nested yml files', () => {
  const filepath1 = getFixturePath('nested1.yml');
  const filepath2 = getFixturePath('nested2.yml');

  const received = getDifference(filepath1, filepath2);
  const expected = readFile('nested_diff');

  expect(received).toEqual(expected);
});
