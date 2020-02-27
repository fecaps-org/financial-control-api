'use strict'

const Joi = require('@hapi/joi')

module.exports = {
  input: {
    Joi,

    invalidDataTypes: {
      category: 1,
      description: 1,
      amount: 'invalid'
    },

    valid: {
      category: 'other',
      description: 'Don\'t know',
      amount: 190.90
    }
  },

  output: {
    QUANTITY_OF_REQUIRED_PROPERTIES: 3,
    QUANTITY_OF_ERRORS_FOR_PROPERTIES_DATA_TYPE: 4
  }
}
