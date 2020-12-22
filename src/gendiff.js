import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const getDifference = (json1, json2) => {
  const getTreeNode = (obj1, obj2, key) => {
    const oldVal = _.get(obj1, key);
    const newVal = _.get(obj2, key);

    if (_.isObject(oldVal) && _.isObject(newVal)) {
      return { key, state: 'nested', children: getDifference(oldVal, newVal) };
    }
    if (!_.has(obj1, key)) {
      return { key, value: newVal, state: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: oldVal, state: 'removed' };
    }
    if (_.has(obj1, key) && _.has(obj2, key) && oldVal !== newVal) {
      return { key, value: newVal, state: 'updated', oldValue: oldVal };
    }

    return { key, value: oldVal, state: 'unchanged' };
  };

  const keys1 = _.keys(json1);
  const keys2 = _.keys(json2);
  const allKeys = _.union(keys1, keys2).sort();
  const result = allKeys.map((key) => getTreeNode(json1, json2, key));

  return result;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const json1 = parse(filepath1);
  const json2 = parse(filepath2);

  const difference = getDifference(json1, json2);

  return format(difference, formatName);
};

export default gendiff;
