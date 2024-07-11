interface PipelineStep {
    name : string;
    script : string[];
    artifacts? : string;
}

interface PipelineConfig { 
    image : string;
    pipelines : {
        default : PipelineStep[];
    }
}

interface RunOptions {
    pipelineFilePath? : string;
    otherOptions? : string[];
}

export {PipelineStep, PipelineConfig, RunOptions};