'use strict'

// eslint-disable-next-line node/no-unpublished-require
const { AWS_REGION, EXPENSES_CATEGORIES_TABLE } = require('../../src/config')

const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ region: AWS_REGION })
const { output: defaultOutput } = require('./default')

module.exports = {
  input: {
    EXPENSES_CATEGORIES_TABLE,
    INVALID_EXPENSES_CATEGORIES_TABLE: 'INVALID',
    db
  },

  output: {
    ...defaultOutput,
    QUANTITY_OF_CATEGORIES: 4
  }
}
