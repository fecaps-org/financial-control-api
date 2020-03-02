/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/notify-expense')
const ExpenseNotifier = require('handlers/notify-expense/ExpenseNotifier')

describe('Notify Expense Function - Expense Notifier Tests', () => {
  before(() => { debugger })

  it('Expect to return empty when injecting invalid notification', async () => {
    const expenseNotifier = new ExpenseNotifier({})
    await expenseNotifier.defineRecords(input.events)
    const response = await expenseNotifier.dispatchNotificationsAndRecords()

    expect(response).to.not.be.undefined
    expect(response).to.be.an('object')
    expect(response).to.have.property('notifications')
    expect(response).to.have.property('streams')
  })

  it('Expect to return empty when there\'s no ARN for Stream', async () => {
    const expenseNotifier = new ExpenseNotifier(input.stream)
    await expenseNotifier.defineRecords(input.events)
    const response = await expenseNotifier.dispatchNotificationsAndRecords()

    expect(response).to.not.be.undefined
    expect(response).to.be.an('object')
    expect(response).to.have.property('notifications')
    expect(response).to.have.property('streams')
  })
})
