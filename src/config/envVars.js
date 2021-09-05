const { str, port, num } = require('envalid');

module.exports = {
  dataDogHost: {
    name: 'DD_AGENT_HOST',
    validator: str()
  },
  nodeEnv: {
    name: 'NODE_ENV',
    validator: str({choices: ['development', 'production']})
  },
  port: {
    name: 'PORT',
    validator: port()
  },
  logLevel: {
    name: 'LOG_LEVEL',
    validator: str({choices: ['error', 'warn', 'info', 'verbose', 'debug', 'silly']})
  },
  /** ************** Database connection params *********************/
  dbQueryTimeout: {
    name: 'DB_QUERY_TIMEOUT',
    validator: num()
  },
  /** ************** AWS credentials *********************/
  awsAccessKeyId: {
    name: 'AWS_ACCESS_KEY_ID',
    validator: str()
  },
  awsSecretAccessKey: {
    name: 'AWS_SECRET_ACCESS_KEY',
    validator: str()
  },
  awsS3BucketName: {
    name: 'AWS_S3_BUCKET_NAME',
    validator: str()
  }
};
