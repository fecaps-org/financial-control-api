/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input, output } = require('../../mocks/add-expense')
const Category = require('handlers/add-expense/Category')

describe('Add Expense Function - Category Tests', () => {
  before(() => { debugger })

  it('Expect to return error when injecting invalid DB instance', async () => {
    const category = new Category({})
    const response = await category.findByName(input.name)

    expect(response).to.be.an('array')
    expect(response).to.have.lengthOf(output.NO_DATA_LENGTH)
  })

  it('Expect to return success', async () => {
    const category = new Category(input.db)
    const response = await category.findByName(input.name)

    expect(response).to.be.an('object')
    expect(response).to.have.property('Items')
    expect(response.Items).to.be.an('array')
    expect(response.Items).to.have.lengthOf(output.QUANTITY_OF_CATEGORIES)
    response.Items.forEach(item => {
      expect(item).to.be.an('object')
      expect(item).to.have.property('description')
      expect(item).to.have.property('name')
    })
  })
})
