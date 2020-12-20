import stylish from './stylish.js';
import plain from './plain.js';

const format = {
  stylish,
  plain,
};

export default (tree, formatName) => format[formatName](tree);
