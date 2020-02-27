'use strict'

const Joi = require('@hapi/joi')

const {
  transformRequestBody,
  transformResponse,
  transformErrors
} = require('transformers')
const Validator = require('./Validator')

const validator = new Validator(Joi)

module.exports.handler = async event => {
  try {
    const validParams = await validator.validate(transformRequestBody(event))

    return {
      statusCode: 201,
      body: transformResponse(validParams)
    }
  } catch (err) {
    return {
      statusCode: 422,
      body: transformErrors(err)
    }
  }
}
