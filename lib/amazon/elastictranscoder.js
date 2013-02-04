// --------------------------------------------------------------------------------------------------------------------
//
// elastictranscoder.js - class for AWS Elastic Compute Cloud
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// built-ins
var util = require('util');

// dependencies
var _ = require('underscore');

// our own
var awssum = require('../awssum');
var amazon = require('./amazon');
var operations = require('./elastictranscoder-config');
var awsSignatureV4 = require('./aws-signature-v4');

// --------------------------------------------------------------------------------------------------------------------
// package variables

var MARK = 'elastictranscoder: ';

// From: http://docs.amazonwebservices.com/general/latest/gr/rande.html
var endPoint = {};
endPoint[amazon.US_EAST_1]      = "elastictranscoder.us-east-1.amazonaws.com";
endPoint[amazon.US_WEST_1]      = "elastictranscoder.us-west-1.amazonaws.com";
endPoint[amazon.US_WEST_2]      = "elastictranscoder.us-west-2.amazonaws.com";
endPoint[amazon.EU_WEST_1]      = "elastictranscoder.eu-west-1.amazonaws.com";
endPoint[amazon.AP_SOUTHEAST_1] = "elastictranscoder.ap-southeast-1.amazonaws.com";
endPoint[amazon.AP_NORTHEAST_1] = "elastictranscoder.ap-northeast-1.amazonaws.com";
// endPoint[amazon.SA_EAST_1]      = "";
// endPoint[amazon.US_GOV_WEST_1]  = "";

var version = '2012-09-25';

// --------------------------------------------------------------------------------------------------------------------
// constructor

var ElasticTranscoder = function(opts) {
    var self = this;

    // call the superclass for initialisation
    ElasticTranscoder.super_.call(this, opts);

    // check the region is valid
    if ( ! endPoint[opts.region] ) {
        throw MARK + "invalid region '" + opts.region + "'";
    }

    return self;
};

// inherit from Amazon
util.inherits(ElasticTranscoder, amazon.Amazon);

// --------------------------------------------------------------------------------------------------------------------
// methods we need to implement from awssum.js/amazon.js

ElasticTranscoder.prototype.scope = function() {
    return 'elastictranscoder';
};

ElasticTranscoder.prototype.serviceName = function() {
    return 'ElasticTranscoder';
};

ElasticTranscoder.prototype.needsTarget = function() {
    return false;
};

ElasticTranscoder.prototype.host = function() {
    return endPoint[this.region()];
};

ElasticTranscoder.prototype.version = function() {
    return version;
};

ElasticTranscoder.prototype.extractBody = function() {
    return 'json';
};

// this service uses the AWS Signature v4
ElasticTranscoder.prototype.strToSign        = awsSignatureV4.strToSign;
ElasticTranscoder.prototype.signature        = awsSignatureV4.signature;
ElasticTranscoder.prototype.addSignature     = awsSignatureV4.addSignature;
// ElasticTranscoder.prototype.addCommonOptions = awsSignatureV4.addCommonOptions;
ElasticTranscoder.prototype.contentType      = awsSignatureV4.contentType;
ElasticTranscoder.prototype.addCommonOptions = function(options, args) {
    var self = this;

    // now call the signature addCommonOptions
    awsSignatureV4.addCommonOptions.apply(self, [ options, args ]);
};

// --------------------------------------------------------------------------------------------------------------------
// operations on the service

_.each(operations, function(operation, operationName) {
    ElasticTranscoder.prototype[operationName] = awssum.makeOperation(operation);
});

// --------------------------------------------------------------------------------------------------------------------
// exports

exports.ElasticTranscoder = ElasticTranscoder;

// --------------------------------------------------------------------------------------------------------------------
