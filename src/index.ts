#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import yaml from 'yaml';
import Docker from 'dockerode';

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
      const pipelineFile = readFileSync('./bitbucket-pipelines.yml', 'utf8');
      const pipelineConfig = yaml.parse(pipelineFile);
      
    //   // TODO: Implement pipeline execution logic here
    //   console.log('Pipeline config:', pipelineConfig);
      
      // Example: Run a simple command in a Docker container
      const container = await docker.createContainer({
        Image: 'alpine',
        Cmd: ['echo', 'Hello from the pipeline!'],
        Tty: true
      });
      
      await container.start();
      const output = await container.logs({stdout: true, stderr: true});
      console.log(output.toString());
      
      await container.remove();
    } catch (error) {
      console.error('Error running pipeline:', error);
    }
  });

program.parse(process.argv);