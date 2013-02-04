// --------------------------------------------------------------------------------------------------------------------
//
// elastictranscoder-config.js - class for AWS Elastic Compute Cloud
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// most similar service seems to be Glacier or DynamoDB

function pathCreateJobs(options, args) {
    return '/jobs';
}

function bodyCreateJob(options, args) {
    var data = {
        Input: {
            Key: args.input.key,
            FrameRate: args.input.frameRate ?? "auto",
            Resolution: args.input.resolution ?? "auto",
            AspectRatio: args.input.aspectRatio ?? "auto",
            Interlaced: args.input.interlaced ?? "auto",
            Container: args.input.container ?? "auto"
        },
        Output: {
            Key: args.output.key,
            ThumbnailPattern: args.output.thumbnailPattern ?? "",
            Rotate: args.output.rotate ?? "auto",
            PresetId: args.output.presetId ?? "1351620000000-000030" // Generic 480p 4:3
        },
        PipelineId: args.pipelineId
    };

    // console.log(JSON.stringify(data));

    return JSON.stringify(data);
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = {

    // Job Operations

    CreateJob : {
        url : 'http://docs.aws.amazon.com/elastictranscoder/latest/developerguide/create-job.html',
        method : 'POST',
        path : pathCreateJobs,
        args : {
            Input : {
                required : true,
                type     : 'special',
            },
            Output : {
                required : true,
                type     : 'special',
            },
            PipelineId : {
                required : true,
                type     : 'param',
            }
        },
        body : bodyCreateJob
    }
};

// --------------------------------------------------------------------------------------------------------------------
