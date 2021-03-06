'use strict';

const { createLogger, format: { combine, colorize, simple, json }, transports } = require('winston');
const config = require('../config');
const { environments } = require('../constants');
const metricsManager = require('../metricsManager');

/**
 * Winston Logger Instance
 * @type {winston.Logger}
 */
const logger = new createLogger({
  level: config.logLevel, // logs up to specified level
  transports: [
    config.nodeEnv === environments.dev
      ? new transports.Console({ format: combine(colorize(), simple()) })
      : new transports.Console({ format: json() })
  ]
});

/**
 * @function messageTransformer
 * @description Function applies appropriate modifications on logMsg
 * @param logMsg
 * @param id
 * @returns {*}
 */
function messageTransformer (logMsg, id) {
  let transformedLog = logMsg;

  if (logMsg !== null && typeof logMsg === 'object') {
    transformedLog = Object.assign({}, logMsg);
    // Adding stack and message properties manually,
    // since these properties are non enumerable and being skipped by Object.assign op
    if (logMsg.stack) {
      transformedLog.stack = logMsg.stack;
    }
    transformedLog.message = logMsg.message || '';

    // Removing timestamp since it's being autogenerated by log viewer service
    if (transformedLog.timestamp) {
      delete transformedLog.timestamp;
    }
    // Adding log id (if there is) at the begging of log message
    if (id) {
      transformedLog.message = `[${id}] - ${logMsg.message}`;
    }
  } else {
    transformedLog = id ? `[${id}] - ${logMsg}` : logMsg;
  }
  return transformedLog;
}

module.exports = (logLevel, { message, metricsStat, id}) => {
  logger[logLevel](messageTransformer(message, id));
  if (metricsStat) {
    metricsManager.increment(metricsStat);
  }
};
