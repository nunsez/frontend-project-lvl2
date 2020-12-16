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

test('correct comparison of flat json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expected = getDifference(filepath1, filepath2);
  const result = readFile('json_plain');

  expect(expected).toEqual(result);
});
