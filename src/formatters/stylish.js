import _ from 'lodash';

const indent = ' ';
const indentCount = 4;
// prettier-ignore
const setSpaces = (depth, backSpaceCount = 0) => (
  indent.repeat(indentCount * depth - backSpaceCount)
);

const valueToString = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }

  const arrayToString = () => {
    const result = data
      .map((item) => `${setSpaces(depth)}${valueToString(item, depth + 1)}`)
      .join('\n');

    return `[\n${result}\n${setSpaces(depth - 1)}]`;
  };

  const objectToString = () => {
    const result = _.entries(data)
      .map(([key, value]) => `${setSpaces(depth)}${key}: ${valueToString(value, depth + 1)}`)
      .join('\n');

    return `{\n${result}\n${setSpaces(depth - 1)}}`;
  };

  return _.isArray(data) ? arrayToString() : objectToString();
};

// prettier-ignore
const genStylishLine = {
  nested: ({ key, children }, depth, iter) => (
    `${setSpaces(depth)}${key}: {\n${iter(children, depth + 1)}\n${setSpaces(depth)}}`
  ),
  added: ({ key, value }, depth) => (
    `${setSpaces(depth, 2)}+ ${key}: ${valueToString(value, depth + 1)}`
  ),
  removed: ({ key, value }, depth) => (
    `${setSpaces(depth, 2)}- ${key}: ${valueToString(value, depth + 1)}`
  ),
  changed: ({ key, oldValue, newValue }, depth) => (
    `${setSpaces(depth, 2)}- ${key}: ${valueToString(oldValue, depth + 1)}
${setSpaces(depth, 2)}+ ${key}: ${valueToString(newValue, depth + 1)}`
  ),
  unchanged: ({ key, value }, depth) => `${setSpaces(depth)}${key}: ${valueToString(value)}`,
};

// prettier-ignore
const stylish = (tree) => {
  const iter = (nodes, depth) => nodes
    .map((node) => genStylishLine[node.state](node, depth, iter))
    .join('\n');

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
