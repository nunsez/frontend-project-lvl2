import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const getDifference = (filepath1, filepath2) => {
  const validPath1 = path.resolve(process.cwd(), filepath1);
  const validPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(validPath1);
  const data2 = fs.readFileSync(validPath2);

  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);

  const keys1 = _.keys(json1);
  const keys2 = _.keys(json2);
  const allKeys = _.union(keys1, keys2).sort();

  const result = allKeys.reduce((acc, key) => {
    const isProp1Exist = _.has(json1, key);
    const isProp2Exist = _.has(json2, key);
    const value1 = json1[key];
    const value2 = json2[key];
    const deletedKey = `- ${key}`;
    const addedKey = `+ ${key}`;

    if (isProp1Exist && isProp2Exist) {
      if (value1 === value2) {
        acc[`${' '.repeat(2)}${key}`] = value1; // indent(repeat '' x 2) for unmodifed key/value
      } else {
        acc[deletedKey] = value1;
        acc[addedKey] = value2;
      }
    }
    if (!isProp2Exist) {
      acc[deletedKey] = value1;
    }
    if (!isProp1Exist) {
      acc[addedKey] = value2;
    }

    return acc;
  }, {});

  const stringifyResult = JSON.stringify(result, null, 2);
  const unquoted = stringifyResult.replace(/"|,/g, '');

  return unquoted;
};

export default getDifference;
