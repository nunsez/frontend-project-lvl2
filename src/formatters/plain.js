import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

// prettier-ignore
const genPlainLine = {
  nested: ({ key, children }, path, iter) => iter(children, `${path}${key}.`),
  added: ({ key, value }, path) => `Property '${path}${key}' was added with value: ${formatValue(value)}`,
  removed: ({ key }, path) => `Property '${path}${key}' was removed`,
  changed: ({ key, oldValue, newValue }, path) => (
    `Property '${path}${key}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`
  ),
  unchanged: () => 'unchanged',
};

// prettier-ignore
const plain = (tree) => {
  const iter = (nodes, path) => nodes
    .map((node) => genPlainLine[node.state](node, path, iter))
    .filter((item) => item !== 'unchanged')
    .join('\n');

  return iter(tree, '');
};

export default plain;
