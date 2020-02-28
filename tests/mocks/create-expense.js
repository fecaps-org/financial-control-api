'use strict'

const Joi = require('@hapi/joi')
const { output: defaultOutput } = require('./default')
const StreamConnection = require('streams/Connection')
const stream = StreamConnection.getInstance()

const invalidDataTypes = {
  category: 1,
  description: 1,
  amount: 'invalid'
}

const valid = {
  category: 'other',
  description: 'Don\'t know',
  amount: 190.90
}

module.exports = {
  input: {
    Joi,

    stream,

    invalidDataTypes,
    invalidDataTypesAsJson: { body: JSON.stringify(invalidDataTypes) },

    valid,
    validAsJson: { body: JSON.stringify(valid) }
  },

  output: {
    ...defaultOutput,
    QUANTITY_OF_REQUIRED_PROPERTIES: 3,
    QUANTITY_OF_ERRORS_FOR_PROPERTIES_DATA_TYPE: 4
  }
}
