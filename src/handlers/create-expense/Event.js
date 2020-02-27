'use strict'

const { v1: uuidV1 } = require('uuid')
const { EXPENSES_STREAM } = require('config')

class Event {
  constructor (dataStream) {
    this.dataStream = dataStream
  }

  async createExpenseEvent (params) {
    try {
      const expenseId = uuidV1()
      const expenseData = this._defineData(params, expenseId)
      const expenseRequest = this._defineRequest(expenseData, expenseId)

      return await this.dataStream.putRecord(expenseRequest).promise()
    } catch (err) {
      throw this._defineStreamError(err)
    }
  }

  _defineData (params, expenseId) {
    return {
      expenseId,
      ...params,
      eventType: 'expense_sent'
    }
  }

  _defineRequest (data, expenseId) {
    return {
      Data: JSON.stringify(data),
      PartitionKey: expenseId,
      StreamName: EXPENSES_STREAM
    }
  }

  _defineStreamError (err) {
    const message = `It wasn't possible to add expense to stream: ${err.message || err}`
    return [ { message, path: '' } ]
  }
}

module.exports = Event
