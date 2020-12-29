import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const getTreeNode = (key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        state: 'added',
        value: _.get(obj2, key),
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        state: 'removed',
        value: _.get(obj1, key),
      };
    }

    const oldValue = _.get(obj1, key);
    const newValue = _.get(obj2, key);

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return {
        key,
        state: 'nested',
        children: genDiff(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
      return {
        key,
        state: 'changed',
        newValue,
        oldValue,
      };
    }

    return {
      key,
      state: 'unchanged',
      value: oldValue,
    };
  };

  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.sort(_.union(keys1, keys2));
  const result = allKeys.map(getTreeNode);

  return result;
};

export default genDiff;
