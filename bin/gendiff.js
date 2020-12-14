#!/usr/bin/env node
import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

gendiff.parse(process.argv);
