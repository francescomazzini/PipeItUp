import parsePipelineConfig from "./pipelineParser";


const bbDefaultFilePath = "bitbucket-pipelines.yml";

const runPipelineLocally = (options) => {

    const pipelineFilePath : string = options.pipelineFilePath || bbDefaultFilePath;
    const parsedPipeline = parsePipelineConfig(pipelineFilePath);
}

export default runPipelineLocally;