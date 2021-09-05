const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const { awsS3BucketName } = require('../config');

const write = (events) => {
  return new Promise((resolve, reject) => {
    // TODO: change test_key
    s3.upload({Bucket: awsS3BucketName, Key: 'test_key', Body: Buffer.from(events)}, function(err, data) {
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
