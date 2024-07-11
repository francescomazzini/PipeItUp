// pipeItUp.test.js
import runPipelineLocally from '../../src/pipeItUp';
import Docker from 'dockerode';
import path from 'path';
import fs from 'fs';
import yaml from 'yaml';
import parsePipelineConfig from '../../src/parser';
import { executePipeline } from '../../src/docker';
import { PipelineConfig } from '../../src/types';

// jest.mock('fs');
// jest.mock('yaml');
// jest.mock('dockerode');


// beforeEach(() => {
//     const mockFileContent = `
//       image: node:14
//       pipelines:
//         default:
//           - step:
//               name: Build
//               script:
//                 - npm install
//                 - npm run build
//     `;
//     //@ts-ignore
//     fs.readFileSync.mockReturnValue(mockFileContent);
//     //@ts-ignore
//     yaml.parse.mockReturnValue(/* mocked parsed YAML */);
//   });


describe('runPipelineLocally', () => {
  test('runs a pipeline successfully', async () => {
    // Mock Docker methods as needed
    // Docker.mockImplementation(() => ({
    //   createContainer: jest.fn().mockResolvedValue({
    //     start: jest.fn().mockResolvedValue(null),
    //     logs: jest.fn().mockResolvedValue('Container logs'),
    //     remove: jest.fn().mockResolvedValue(null),
    //   }),
    // }));
    
    const pipelineConfigPath = path.join(__dirname, 'bitbucket-pipelines.yml');

    await expect(runPipelineLocally({pipelineFilePath: pipelineConfigPath})).resolves.not.toThrow();
    
        // const parsedPipeline : PipelineConfig = parsePipelineConfig(pipelineConfigPath);
        // const output : string = await executePipeline(parsedPipeline);

    // console.log(output)
  }, 30000);

  // Add more tests for different scenarios
});