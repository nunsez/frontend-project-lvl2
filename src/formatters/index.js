import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = { stylish, plain, json };

export default (tree, formatName) => format[formatName](tree);
