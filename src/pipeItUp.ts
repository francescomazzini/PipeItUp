import { executePipeline, runStep } from "./docker";
import parsePipelineConfig from "./parser";
import { PipelineConfig, RunOptions } from "./types";

const bbDefaultFilePath = "bitbucket-pipelines.yml";

const runPipelineLocally = async (options : RunOptions) => {

    const pipelineFilePath : string = options.pipelineFilePath || bbDefaultFilePath;
    const parsedPipeline : PipelineConfig = parsePipelineConfig(pipelineFilePath);
    const output : string = await executePipeline(parsedPipeline);

    console.log(output)
}

export default runPipelineLocally;