'use strict'

const { transform } = require('../../transformers')
const { getCategories } = require('./categories')

module.exports.handler = async () => {
  const categories = await getCategories()

  return {
    statusCode: 200,
    body: transform(categories)
  }
}
