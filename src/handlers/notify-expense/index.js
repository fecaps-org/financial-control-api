'use strict'

const NotifierConnection = require('notifiers/Connection')
const Notifier = require('./ExpenseNotifier')

const notifierConnection = NotifierConnection.getInstance()

const notifiers = new Notifier(notifierConnection)

module.exports.handler = async event => {
  await notifiers.defineRecords(event)
  const result = await notifiers.dispatchNotificationsAndRecords()
  return result
}
