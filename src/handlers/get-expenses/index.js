'use strict'

const { transformResponse } = require('transformers')

module.exports.handler = async () => ({
  statusCode: 200,
  body: transformResponse([])
})
