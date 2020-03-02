'use strict'

const { transformResponse } = require('transformers')

const DatabaseConnection = require('database/Connection')
const Categories = require('./Categories')

const databaseConnection = DatabaseConnection.getInstance()
const categories = new Categories(databaseConnection)

module.exports.handler = async () => {
  const result = await categories.list()

  return {
    statusCode: 200,
    body: transformResponse(result)
  }
}
