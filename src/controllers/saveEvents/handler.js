'use strict';
/* istanbul ignore file */
const logger = require('../../logger');
const error = require('../../errors');

module.exports = async (req, res) => {
  const {
    body: { events },
    metadata: { reqId },
    headers: { authorization }
  } = req;

  logger.debug({
    message: `Received events to be stored: ${JSON.stringify(events)}`,
    id: reqId
  });

  // Save the events into S3
  logger.debug({ message: 'Saving the events into data lake', id: reqId });
  // TODO: save into S3

  /*
  TODO: throw error in case
  if () {
    throw new error.NotFound({ message: 'Something went wrong.', stack: 'null' });
  }
  */

  logger.debug({ message: 'The events have been successfully saved', id: reqId });
  res.status(201).end();
};
