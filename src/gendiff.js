import _ from 'lodash';
import parse from './parsers.js';

const gendiff = (object1, object2) => {
  const keys1 = _.keys(object1);
  const keys2 = _.keys(object2);
  const allKeys = _.union(keys1, keys2).sort();

  const result = allKeys.reduce((acc, key) => {
    const isProp1Exist = _.has(object1, key);
    const isProp2Exist = _.has(object2, key);
    const value1 = object1[key];
    const value2 = object2[key];
    const deletedKey = `- ${key}`;
    const addedKey = `+ ${key}`;

    if (isProp1Exist && isProp2Exist && value1 === value2) {
      acc[`${' '.repeat(2)}${key}`] = value1; // indent(repeat '' x 2) for unmodifed key/value
    }
    if (isProp1Exist && value1 !== value2) {
      acc[deletedKey] = value1;
    }
    if (isProp2Exist && value1 !== value2) {
      acc[addedKey] = value2;
    }

    return acc;
  }, {});

  const stringifyResult = JSON.stringify(result, null, 2);
  const unquoted = stringifyResult.replace(/"|,/g, '');

  return unquoted;
};

const getDifference = (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  return gendiff(object1, object2);
};

export default getDifference;
