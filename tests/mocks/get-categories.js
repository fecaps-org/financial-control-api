'use strict'

const { EXPENSES_CATEGORIES_TABLE } = require('config')
const { output: defaultOutput } = require('./default')
const DatabaseConnection = require('database/Connection')
const db = DatabaseConnection.getInstance()

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
