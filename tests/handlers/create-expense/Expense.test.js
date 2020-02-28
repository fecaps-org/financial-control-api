/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/create-expense')
const Expense = require('handlers/create-expense/Expense')

describe('Create Expense Function - Expense Tests', () => {
  before(() => {
    debugger
  })

  it('Expect to return error when injecting invalid Stream instance', async () => {
    try {
      const expenseEvent = new Expense({})
      const response = await expenseEvent.createExpense(input.valid)
      expect(response).to.be.undefined
    } catch (err) {
      expect(err).to.not.be.undefined
      expect(err).to.be.an('array')
      err.forEach(error => {
        expect(error).to.be.an('object')
        expect(error).to.have.keys([ 'message', 'path' ])
        expect(error.message).to.be.a('string')
        expect(error.path).to.be.a('string')
      })
    }
  })

  it('Expect to add event to expense stream', async () => {
    const expenseEvent = new Expense(input.stream)
    const response = await expenseEvent.createExpense(input.valid)

    expect(response).to.be.an('object')
    expect(response).to.have.keys([ 'ShardId', 'SequenceNumber' ])
    expect(response.ShardId).to.be.a('string')
    expect(response.SequenceNumber).to.be.a('string')
  })
})
