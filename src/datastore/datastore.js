const config = require('../config');
const { environments } = require('../constants');
const logger = require('../logger');

const AWS = require('aws-sdk');

const s3Config = {};
if (config.nodeEnv === environments.dev) {
  s3Config.endpoint = process.env.AWS_ENDPOINT;
  s3Config.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(s3Config);

const createBucket = (bucketName, cb) => {
  s3.listBuckets(function(err, data) {
    if (err) {
      logger.error({ message: err.message });
      cb(false);
    } else {
      let bucketAlreadyExists = false;
      for (let bucket of data.Buckets) {
        if (bucket.Name === bucketName) {
          bucketAlreadyExists = true;
          break;
        }
      }

      if (!bucketAlreadyExists) {
        const params = {
          Bucket: bucketName
        };

        s3.createBucket(params, function(err, data) {
          if (err) {
            logger.error({ message: err.message });
            cb(false);
          } else {
            cb(true);
          }
        });
      } else {
        cb(true);
      }
    }
  });
}

const write = async (options) => {
  return new Promise(async (resolve, reject) => {
    // first create the bucket if not exists
    createBucket(options.bucketName, (created) => {
      if (created) {
        // upload data to S3
        s3.upload({Bucket: options.bucketName, Key: options.key, Body: Buffer.from(options.data)}, function(err, data) {
          if(err) {
            return reject(err);
          }

          return resolve(data);
        });
      } else {
        return reject({ message: 'Could not create bucket' });
      }
    })


  });
}

module.exports = {
  write
};
