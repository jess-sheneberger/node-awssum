// --------------------------------------------------------------------------------------------------------------------
//
// elastictranscoder-config.js - class for AWS Elastic Compute Cloud
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// most similar service seems to be Glacier or DynamoDB

function pathCreateJobs(options, args) {
    return '/'+this.version()+'/jobs';
}

function pathGetJob(options, args) {
    return '/'+this.version()+'/jobs/'+args.jobId;
}

function bodyCreateJob(options, args) {
    var data = {
        Input: {
            Key: args.Input.Key,
            FrameRate: args.Input.FrameRate || "auto",
            Resolution: args.Input.Resolution || "auto",
            AspectRatio: args.Input.AspectRatio || "auto",
            Interlaced: args.Input.Interlaced || "auto",
            Container: args.Input.Container || "auto"
        },
        Output: {
            Key: args.Output.Key,
            ThumbnailPattern: args.Output.ThumbnailPattern ||"",
            Rotate: args.Output.Rotate || "auto",
            PresetId: args.Output.PresetId || "1351620000000-000030" // Generic 480p 4:3
        },
        PipelineId: args.PipelineId
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
        body : bodyCreateJob,
        statusCode: 201
    },

    GetJob : {
        url : 'http://docs.aws.amazon.com/elastictranscoder/latest/developerguide/get-job.html',
        method : 'GET',
        path : pathGetJob,
        args : {
            JobId : {
                required : true,
                type     : 'param',
            }
        },
        statusCode: 200
    }
};

// --------------------------------------------------------------------------------------------------------------------
