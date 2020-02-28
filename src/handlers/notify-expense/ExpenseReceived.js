'use strict'

const { EXPENSES_STREAM, EVENT_RECEIVED_TYPE } = require('config')
const StreamConnection = require('streams/Connection')

class ExpenseReceived {
  constructor () {
    this.dataStream = StreamConnection.getInstance()
  }

  async createReceivedRecord (event) {
    const eventData = this._defineData(event)
    const eventRequest = this._defineRequest(eventData)

    return this.dataStream.putRecord(eventRequest).promise()
  }

  _defineData (event) {
    return {
      ...event,
      eventType: EVENT_RECEIVED_TYPE
    }
  }

  _defineRequest (event) {
    return {
      Data: JSON.stringify(event),
      PartitionKey: event.expenseId,
      StreamName: EXPENSES_STREAM
    }
  }
}

module.exports = ExpenseReceived
