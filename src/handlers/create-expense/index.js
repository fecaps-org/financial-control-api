'use strict'

const Joi = require('@hapi/joi')

const {
  transformRequestBody,
  transformResponse,
  transformErrors
} = require('transformers')
const ExpenseValidator = require('./Validator')
const StreamConnection = require('streams/Connection')
const Expense = require('./Expense')

const validator = new ExpenseValidator(Joi)
const streamConnection = StreamConnection.getInstance()
const expenseEvent = new Expense(streamConnection)

module.exports.handler = async event => {
  try {
    const validParams = await validator.validate(transformRequestBody(event))
    await expenseEvent.createExpense(validParams)

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
