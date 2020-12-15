#!/usr/bin/env node
import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {}); // should fix it

gendiff.parse(process.argv);
