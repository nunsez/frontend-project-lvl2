import _ from 'lodash';

const isObject = (value) =>
  typeof value === 'object' && value !== null && value.constructor !== Array;

const indent = ' '.repeat(2);

const valueToString = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const keys = _.keys(value);
  // prettier-ignore
  const result = keys.reduce((acc, key) => {
    if (acc === '') {
      return `${key}: ${valueToString(value[key], depth + 2)}`;
    }

    return `${acc}\n${indent.repeat(depth + 2)}${key}: ${valueToString(value[key], depth + 2)}`;
  }, '');

  return `{\n${indent.repeat(depth + 2)}${result}\n${indent.repeat(depth)}}`;
};

const convert = {
  nested: ({ key, children }, depth, iter) =>
    `${indent.repeat(depth + 1)}${key}: {\n${iter(children, depth + 2)}
${indent.repeat(depth + 1)}}`,
  added: ({ key, value }, depth) =>
    `${indent.repeat(depth)}+ ${key}: ${valueToString(value, depth + 1)}`,
  removed: ({ key, value }, depth) =>
    `${indent.repeat(depth)}- ${key}: ${valueToString(value, depth + 1)}`,
  changed: ({ key, oldValue, newValue }, depth) =>
    `${indent.repeat(depth)}- ${key}: ${valueToString(oldValue, depth + 1)}
${indent.repeat(depth)}+ ${key}: ${valueToString(newValue, depth + 1)}`,
  unchanged: ({ key, value }, depth) =>
    `${indent.repeat(depth + 1)}${key}: ${valueToString(value)}`,
};

const stylish = (tree) => {
  const iter = (nodes, depth) =>
    nodes.map((node) => convert[node.state](node, depth, iter)).join('\n');

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
