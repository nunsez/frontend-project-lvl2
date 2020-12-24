import _ from 'lodash';

export const isObject = (value) =>
  typeof value === 'object' && value !== null && value.constructor !== Array;

const indent = ' '.repeat(4);

const valueToString = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const keys = _.keys(value);
  // prettier-ignore
  const result = keys.reduce((acc, key) => {
    if (acc === '') {
      return `${key}: ${valueToString(value[key], depth + 1)}`;
    }

    return `${acc}\n${indent.repeat(depth)}${key}: ${valueToString(value[key], depth + 1)}`;
  }, '');

  return `{\n${indent.repeat(depth)}${result}\n${indent.repeat(depth - 1)}}`;
};

const genStylishLine = {
  nested: ({ key, children }, depth, iter) =>
    `${indent.repeat(depth)}${key}: {\n${iter(children, depth + 1)}
${indent.repeat(depth)}}`,
  added: ({ key, value }, depth) =>
    `${indent.repeat(depth - 1)}  + ${key}: ${valueToString(value, depth + 1)}`,
  removed: ({ key, value }, depth) =>
    `${indent.repeat(depth - 1)}  - ${key}: ${valueToString(value, depth + 1)}`,
  changed: ({ key, oldValue, newValue }, depth) =>
    `${indent.repeat(depth - 1)}  - ${key}: ${valueToString(
      oldValue,
      depth + 1
    )}
${indent.repeat(depth - 1)}  + ${key}: ${valueToString(newValue, depth + 1)}`,
  unchanged: ({ key, value }, depth) =>
    `${indent.repeat(depth)}${key}: ${valueToString(value)}`,
};

const stylish = (tree) => {
  const iter = (nodes, depth) =>
    nodes
      .map((node) => genStylishLine[node.state](node, depth, iter))
      .join('\n');

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
