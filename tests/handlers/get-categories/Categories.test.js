/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input, output } = require('../../mocks/categories')
const Categories = require('handlers/get-categories/Categories')

describe('Categories Tests', () => {
  before(() => { debugger })

  it('Expect to return error when injecting invalid DB instance on Categories', async () => {
    const categories = new Categories({})
    categories.defineTableName(input.EXPENSES_CATEGORIES_TABLE)
    const response = await categories.list()

    expect(response).to.be.an('array')
    expect(response).to.lengthOf(output.NO_DATA_LENGTH)
  })

  it('Expect to return error when setting wrong table name on Categories', async () => {
    const categories = new Categories(input.db)
    categories.defineTableName(input.INVALID_EXPENSES_CATEGORIES_TABLE)
    const response = await categories.list()

    expect(response).to.be.an('array')
    expect(response).to.lengthOf(output.NO_DATA_LENGTH)
  })

  it('Expect to return success on Categories', async () => {
    const categories = new Categories(input.db)
    categories.defineTableName(input.EXPENSES_CATEGORIES_TABLE)
    const response = await categories.list()

    expect(response).to.be.an('array')
    expect(response.length).to.be.equal(output.QUANTITY_OF_CATEGORIES)
    response.forEach(category => {
      expect(category).to.be.an('object')
      expect(category).to.have.keys([ 'name', 'description' ])
      expect(category.name).to.be.a('string')
      expect(category.description).to.be.a('string')
    })
  })
})
