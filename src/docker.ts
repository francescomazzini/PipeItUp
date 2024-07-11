import Docker from 'dockerode';
import { PipelineConfig, PipelineStep } from './types';

const docker = new Docker();

const executePipeline = async (parsedPipeline : PipelineConfig) : Promise<string> => {

    let generalOutput : string = "";

    for (const step of parsedPipeline.pipelines.default) {
        generalOutput += `Executing step: ${step.name}\n`;
        try {
            const output = await runStep(step, parsedPipeline.image);
            generalOutput += `Step output:\n${output}`;
        } catch (error) {
            generalOutput += `Error executing step ${step.name}:`, error;
            // break;
            console.log(generalOutput)
            throw error; // Stop execution on first error
        }
    }

    return generalOutput;
}

const runStep = async (step : PipelineStep, image : string) => {

    // await docker.pull(image, {});
    // console.log("Image pulled succesfully") # it looks its not actualling pulling the image and putting it in the local registry 
    // TODO: find out best practice for managing the image pull

    const container = await docker.createContainer({
      Image: image,
      Cmd: ['/bin/sh', '-c', step.script.join(' && ')],
      Tty: true,
      AttachStdout: true,
      AttachStderr: true
    });
  
    await container.start();
  
    let output = '';
    try {
        const stream = await container.logs({
        follow: true,
        stdout: true,
        stderr: true
        });

        if (stream) {
            for await (const chunk of stream) {
                output += chunk.toString();
            }
        } else {
            console.warn('Warning: Log stream is undefined');
        }
    } catch (error) {
        console.error('Error getting container logs:', error);
        output = 'Failed to retrieve container logs';
    }

    await container.remove();
  
    return output;
};

export {executePipeline, runStep};