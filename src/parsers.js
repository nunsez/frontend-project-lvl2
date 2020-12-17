import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const format = path.extname(filepath);
  const validPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(validPath, 'utf-8');

  if (format === '' || format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }

  throw new Error('Unvalid file extention!');
};

export default parse;
