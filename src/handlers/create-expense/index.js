'use strict'

const Joi = require('@hapi/joi')

const {
  transformRequestBody,
  transformResponse,
  transformErrors
} = require('transformers')
const ExpenseValidator = require('./Validator')
const StreamConnection = require('streams/Connection')
const ExpenseEvent = require('./Event')

const validator = new ExpenseValidator(Joi)
const streamConnection = new StreamConnection()
const stream = streamConnection.get()
const expenseEvent = new ExpenseEvent(stream)

module.exports.handler = async event => {
  try {
    const validParams = await validator.validate(transformRequestBody(event))
    await expenseEvent.createExpenseEvent(validParams)

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
