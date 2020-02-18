'use strict'

// eslint-disable-next-line node/no-unpublished-require
const { AWS_REGION, EXPENSES_CATEGORIES_TABLE } = require('../src/defaults')

const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ region: AWS_REGION })

module.exports = {
  input: {
    EXPENSES_CATEGORIES_TABLE,
    INVALID_EXPENSES_CATEGORIES_TABLE: 'INVALID',
    db
  },

  output: {
    SUCCESSFUL_HTTP_STATUS_CODE: 200,
    NO_DATA_LENGTH: 0,
    QUANTITY_OF_CATEGORIES: 4
  }
}
