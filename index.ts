#!/usr/bin/env node
import { Command } from 'commander';
import Docker from 'dockerode';
import runPipelineLocally from './src/pipeItUp';

const program = new Command();
const docker = new Docker();

program
  .name('PipeItUp')
  .description('A CLI tool for local execution of CI/CD pipelines (🎶You\'ve got to pipe it up, don\'t you know, pipe it up...🎶)')
  .version('0.1.0');

program.command('run')
  .description('Run the pipeline defined in bitbucket-pipelines.yml')
  .action(async () => {
    try {
      await runPipelineLocally({});
    } catch (error) {
      console.error('Error running pipeline:', error);
    }
  });

program.parse(process.argv);