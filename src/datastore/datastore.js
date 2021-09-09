const config = require('../config');
const { environments } = require('../constants');

const AWS = require('aws-sdk');

const s3Config = {};
if (config.nodeEnv === environments.dev) {
  s3Config.endpoint = process.env.AWS_ENDPOINT;
  s3Config.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(s3Config);

const write = (options) => {
  return new Promise((resolve, reject) => {
    s3.upload({Bucket: options.bucketName, Key: options.key, Body: Buffer.from(options.data)}, function(err, data) {
      if(err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

module.exports = {
  write
};
