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
  /** ************** Database connection params*********************/
  dbQueryTimeout: {
    name: 'DB_QUERY_TIMEOUT',
    validator: num()
  }
};
