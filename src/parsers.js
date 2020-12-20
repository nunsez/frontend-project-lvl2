import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (filepath) => {
  const format = path.extname(filepath).slice(1) || 'json';
  const validPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(validPath, 'utf-8');

  return parse[format](data);
};
