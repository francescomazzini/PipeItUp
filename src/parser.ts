
import { readFileSync, existsSync } from 'fs';
import yaml from 'yaml';
import { PipelineStep } from './types';

const parsePipelineConfig = (pipelineFilePath : string) => {
    
    if (!existsSync(pipelineFilePath)) {
        throw new Error(`${pipelineFilePath} can't be found`);
    }
    
    const pipelineFile = readFileSync(pipelineFilePath, 'utf8');
    const parsedPipelineConfig = yaml.parse(pipelineFile);

    return {
        image : parsedPipelineConfig.image,
        pipelines : {
            default: parsedPipelineConfig.pipelines.default.map((step : any)  : PipelineStep=> ({
                name: step.step.name,
                script: step.step.script,
                artifacts: step.step.artifacts
            }))
        }
    }
}

export default parsePipelineConfig;