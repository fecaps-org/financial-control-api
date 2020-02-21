'use strict'

const { transform } = require('../../transformers')

module.exports.handler = async () => ({
  statusCode: 200,
  body: transform([])
})
