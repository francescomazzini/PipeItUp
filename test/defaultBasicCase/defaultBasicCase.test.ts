// pipeItUp.test.js
import runPipelineLocally from '../../src/pipeItUp';
import Docker from 'dockerode';
import path from 'path';
import fs from 'fs';
import yaml from 'yaml';
import parsePipelineConfig from '../../src/parser';
import { executePipeline } from '../../src/docker';
import { PipelineConfig } from '../../src/types';

describe('runASimplePipelineLocally', () => {
  test('runs a simple pipeline successfully', async () => {
    
    const pipelineConfigPath = path.join(__dirname, 'bitbucket-pipelines.yml');

    await expect(runPipelineLocally({pipelineFilePath: pipelineConfigPath})).resolves.not.toThrow();
    
  }, 30000);

  // Add more tests for different scenarios
});