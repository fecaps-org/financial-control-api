'use strict'

const { output: defaultOutput } = require('./default')
const DatabaseConnection = require('database/Connection')
const db = DatabaseConnection.getInstance()

module.exports = {
  input: {
    db
  },

  output: {
    ...defaultOutput,
    QUANTITY_OF_CATEGORIES: 4
  }
}
