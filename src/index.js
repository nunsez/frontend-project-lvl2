import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import genDiff from './gendiff.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const extention1 = path.extname(filepath1).slice(1) || 'json';
  const extention2 = path.extname(filepath2).slice(1) || 'json';

  const validPath1 = path.resolve(process.cwd(), filepath1);
  const validPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(validPath1, 'utf-8');
  const data2 = fs.readFileSync(validPath2, 'utf-8');

  const object1 = parse(data1, extention1);
  const object2 = parse(data2, extention2);

  const difference = genDiff(object1, object2);

  return format(difference, formatName);
};
