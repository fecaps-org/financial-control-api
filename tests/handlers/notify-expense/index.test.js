/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/notify-expense')
const { handler: notifyExpense } = require('handlers/notify-expense')

describe('Notify Expense Function Tests', () => {
  before(() => { debugger })

  it('Expect to notify expense', async () => {
    const response = await notifyExpense(input.events)

    expect(response).to.be.an('object')
    expect(response).to.have.property('notifications')
    expect(response).to.have.property('streams')
  })
})
