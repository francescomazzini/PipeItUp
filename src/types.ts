interface PipelineStep {
    name : string;
    script : string;
    artifacts? : string;
}

interface PipelineConfig { 
    image : string;
    pipelines : {
        default : PipelineStep[];
    }
}

export {PipelineStep, PipelineConfig};