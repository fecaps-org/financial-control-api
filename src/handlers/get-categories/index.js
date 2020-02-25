'use strict'

const { EXPENSES_CATEGORIES_TABLE } = require('config')
const { transform } = require('transformers')

const DatabaseConnection = require('database/Connection')
const Categories = require('./Categories')

const databaseConnection = DatabaseConnection.getInstance()
const categories = new Categories(databaseConnection)

categories.defineTableName(EXPENSES_CATEGORIES_TABLE)

module.exports.handler = async () => {
  const result = await categories.list()

  return {
    statusCode: 200,
    body: transform(result)
  }
}
