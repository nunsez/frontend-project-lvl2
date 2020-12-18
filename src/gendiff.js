import _ from 'lodash';
import parse from './parsers.js';

const gendiff = (object1, object2) => {
  const keys1 = _.keys(object1);
  const keys2 = _.keys(object2);
  const allKeys = _.union(keys1, keys2).sort();

  const diffObj = allKeys.reduce((acc, key) => {
    const value1 = _.get(object1, key);
    const value2 = _.get(object2, key);

    if (_.isObject(value1) && _.isObject(value2)) {
      acc[key] = gendiff(value1, value2);
    } else if (_.isEqual(value1, value2)) {
      _.set(acc, key, value1);
    } else {
      _.set(acc, `-${key}`, value1);
      _.set(acc, `+${key}`, value2);
    }

    return acc;
  }, {});

  return diffObj;
};

const format = (object, formatName) => {
  let transformedDiff;

  if (formatName === 'stylish') {
    transformedDiff = JSON.stringify(object, null, 4)
      .replace(/"|,/g, '')
      .replace(/[ ][ ][+]/g, '+ ')
      .replace(/[ ][ ][-]/g, '- ');
  }

  return transformedDiff;
};

const getDifference = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const result = gendiff(object1, object2);

  return format(result, formatName);
};

export default getDifference;
