'use strict'

const { EVENT_TYPE } = require('config')
const ExpenseReceived = require('./ExpenseReceived')
const EXPENSE_NOTIFICATION_TOPIC_ARN = process.env.EXPENSE_NOTIFICATION_TOPIC_ARN

class ExpenseNotifier {
  constructor (notifierConnection) {
    this.notifierConnection = notifierConnection
    this.expenseReceived = new ExpenseReceived()
  }

  defineRecords (event) {
    this.records = event.Records
      .map(this._defineStreamRecord)
      .filter(({ eventType }) => eventType === EVENT_TYPE)
  }

  _defineStreamRecord (record) {
    const jsonData = Buffer
      .from(record.kinesis.data, 'base64')
      .toString()

    return JSON.parse(jsonData)
  }

  async dispatchNotificationsAndRecords () {
    if (!EXPENSE_NOTIFICATION_TOPIC_ARN) return

    try {
      for (let i = 0; i < this.records.length; i++) {
        const record = this.records[i]
        const request = this._defineNotificationRequest(record)
        await this.notifierConnection.publish(request).promise()
        await this.expenseReceived.createReceivedRecord({ ...record })
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  _defineNotificationRequest (record) {
    return {
      Message: this._defineMessage(record),
      TopicArn: EXPENSE_NOTIFICATION_TOPIC_ARN
    }
  }

  _defineMessage (record) {
    return 'New Expense:\n\n'
      .concat(`Category: ${record.category}\n`)
      .concat(`Description: ${record.description}\n`)
      .concat(`Amount: ${record.amount}`)
  }
}

module.exports = ExpenseNotifier
