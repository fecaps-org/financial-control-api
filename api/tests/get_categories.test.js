/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')

const { handler: getCategories } = require('../src/handlers/get-categories')
const Categories = require('../src/handlers/get-categories/Categories')

const { input, output } = require('./mock')

describe('Get Expenses Categories Tests', () => {
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

  it('Expect to validate full response of categories function', async () => {
    const response = await getCategories({})

    expect(response).to.be.an('object')
    expect(response).to.have.keys([ 'statusCode', 'body' ])
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.be.equal(output.SUCCESSFUL_HTTP_STATUS_CODE)

    expect(response.body).to.be.a('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(bodyAsObject.data).to.be.an('array')
    expect(bodyAsObject.data.length).to.be.equal(output.QUANTITY_OF_CATEGORIES)
  })
})
