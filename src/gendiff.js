import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';
import { isObject } from './formatters/stylish.js';

const getDifference = (obj1, obj2) => {
  const getTreeNode = (key) => {
    if (!_.has(obj1, key)) {
      return { key, state: 'added', value: _.get(obj2, key) };
    }
    if (!_.has(obj2, key)) {
      return { key, state: 'removed', value: _.get(obj1, key) };
    }

    const oldValue = _.get(obj1, key);
    const newValue = _.get(obj2, key);

    // prettier-ignore
    if (isObject(oldValue) && isObject(newValue)) {
      return { key, state: 'nested', children: getDifference(oldValue, newValue) };
    }
    if (oldValue !== newValue) {
      return { key, state: 'changed', newValue, oldValue };
    }

    return { key, state: 'unchanged', value: oldValue };
  };

  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();
  const result = allKeys.map(getTreeNode);

  return result;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const extention1 = path.extname(filepath1).slice(1) || 'json';
  const extention2 = path.extname(filepath2).slice(1) || 'json';

  const validPath1 = path.resolve(process.cwd(), filepath1);
  const validPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(validPath1, 'utf-8');
  const data2 = fs.readFileSync(validPath2, 'utf-8');

  const json1 = parse(data1, extention1);
  const json2 = parse(data2, extention2);

  const difference = getDifference(json1, json2);

  return format(difference, formatName);
};

export default genDiff;
