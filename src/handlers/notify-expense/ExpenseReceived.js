'use strict'

const { EXPENSES_STREAM, EVENT_RECEIVED_TYPE } = require('config')
const StreamConnection = require('streams/Connection')

class ExpenseReceived {
  constructor () {
    this.dataStream = StreamConnection.getInstance()
  }

  async createReceivedRecord (event) {
    try {
      const eventData = this._defineData(event)
      const eventRequest = this._defineRequest(eventData)

      return await this.dataStream.putRecord(eventRequest).promise()
    } catch (err) {
      console.error(err)
    }
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
