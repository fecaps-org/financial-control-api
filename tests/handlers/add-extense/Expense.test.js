/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input } = require('../../mocks/add-expense')
const Category = require('handlers/add-expense/Category')
const Expense = require('handlers/add-expense/Expense')

describe('Add Expense Function - Expense Tests', () => {
  before(() => { debugger })

  it('Expect to return array when adding expenses', async () => {
    const category = new Category(input.db)
    const expense = new Expense(input.db, category)

    expense.defineEvents(input.streams)
    const response = await expense.addExpenses()

    expect(response).to.be.an('array')
  })
})
