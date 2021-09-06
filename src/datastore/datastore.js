const AWS = require('aws-sdk');
const s3 = new AWS.S3();

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
