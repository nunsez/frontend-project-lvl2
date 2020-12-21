#!/usr/bin/env node
import { Command } from 'commander';
import getDifference from '../src/gendiff.js';

const program = new Command();

program
  .version('0.8.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
