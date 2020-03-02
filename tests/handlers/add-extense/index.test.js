/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/add-expense')
const { handler: addExpense } = require('handlers/add-expense')

describe('Add Expense Function Tests', () => {
  before(() => { debugger })

  it('Expect to return success', async () => {
    const response = await addExpense(input.streams)

    expect(response).to.be.an('array')
  })
})
