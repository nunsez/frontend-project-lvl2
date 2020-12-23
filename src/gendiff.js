import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const isObject = (value) =>
  typeof value === 'object' && value.constructor !== Array;

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

    if (isObject(oldValue) && isObject(newValue)) {
      return {
        key,
        state: 'nested',
        children: getDifference(oldValue, newValue),
      };
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

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const json1 = parse(filepath1);
  const json2 = parse(filepath2);

  const difference = getDifference(json1, json2);

  return format(difference, formatName);
};

export default gendiff;
