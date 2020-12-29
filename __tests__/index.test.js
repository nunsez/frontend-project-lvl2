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

const stylishDiff = readFile('stylish_diff');
const plainDiff = readFile('plain_diff');
const jsonDiff = readFile('json_diff');

describe.each(['json', 'yml'])('test .%s files', (extention) => {
  const filepath1 = getFixturePath(`file1.${extention}`);
  const filepath2 = getFixturePath(`file2.${extention}`);

  test.each([
    ['stylish', stylishDiff],
    ['plain', plainDiff],
    ['json', jsonDiff],
  ])('%s formatter', (formatName, expected) => {
    const received = genDiff(filepath1, filepath2, formatName);

    expect(received).toEqual(expected);
  });
});
