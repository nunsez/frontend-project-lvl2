#!/usr/bin/env node
import { program } from 'commander';
import getDifference from '../src/gendiff.js';

program
  .version('0.8.5')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
