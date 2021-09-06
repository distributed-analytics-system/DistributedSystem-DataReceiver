'use strict';

const logger = require('../../logger');
const error = require('../../errors');
const datastore = require('../../datastore');

const { awsS3BucketName } = require('../../config');

module.exports = async (req, res) => {
  const {
    body: events,
    metadata: { reqId },
    headers: { authorization }
  } = req;

  logger.debug({ message: `Received events to be stored: ${JSON.stringify(events)}`, id: reqId });

  if (events && Object.keys(events).length !== 0) {
    // Save the events into S3
    logger.debug({ message: 'Saving the events into data lake', id: reqId });
    try {
      // TODO: change key
      await datastore.write({ bucketName: awsS3BucketName, key: 'test_key', data: events });
      logger.debug({ message: 'The events have been successfully saved', id: reqId });
    } catch(err) {
      throw new error.InternalServerError({ message: err.message});
    }
  } else {
    logger.info({message: 'Received empty events', id: reqId});
  }

  res.status(201).end();
};
