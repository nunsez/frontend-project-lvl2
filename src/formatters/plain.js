import _ from 'lodash';

const display = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

// prettier-ignore
const plain = (tree) => {
  const iter = (nodes, path) => nodes
    .flatMap((node) => {
      const { key, value, state, oldValue, children, newValue } = node;
      if (state === 'nested') {
        return iter(children, `${path}${key}.`);
      }
      if (state === 'added') {
        return `Property '${path}${key}' was added with value: ${display(value)}`;
      }
      if (state === 'removed') {
        return `Property '${path}${key}' was removed`;
      }
      if (state === 'changed') {
        return `Property '${path}${key}' was updated. From ${display(oldValue)} to ${display(newValue)}`;
      }

      return 'unchanged';
    })
    .filter((item) => item !== 'unchanged')
    .join('\n');

  return iter(tree, '');
};

export default plain;
