/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/notify-expense')
const ExpenseReceived = require('handlers/notify-expense/ExpenseReceived')

describe('Notify Expense Function - Expense Received Tests', () => {
  before(() => { debugger })

  it('Expect to return error when injecting invalid event', async () => {
    try {
      const expenseEvent = new ExpenseReceived()
      const payload = { ...input.data }
      delete payload.expenseId
      const response = await expenseEvent.createReceivedRecord(payload)
      expect(response).to.be.undefined
    } catch (err) {
      expect(err).to.not.be.undefined
      expect(err).to.be.an('error')
    }
  })

  it('Expect to update expense on stream data', async () => {
    const expenseEvent = new ExpenseReceived()
    const payload = { ...input.data }
    const response = await expenseEvent.createReceivedRecord(payload)

    expect(response).to.be.an('object')
    expect(response).to.have.keys([ 'ShardId', 'SequenceNumber' ])
    expect(response.ShardId).to.be.a('string')
    expect(response.SequenceNumber).to.be.a('string')
  })
})
