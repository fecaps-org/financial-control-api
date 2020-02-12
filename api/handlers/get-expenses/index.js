'use strict';

const { transform } = require('../../transformer')

module.exports.handler = async () => ({
  statusCode: 200,
  body: transform([])
})
