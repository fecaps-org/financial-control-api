/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { handler: getCategories } = require('../handlers/get-expenses-categories')
const { SUCCESSFUL_HTTP_STATUS_CODE } = require('./mock')

describe('Get Expenses Categories Tests', () => {
  before(() => { debugger })

  it('Expect to validate expenses categories response', async () => {
    const response = await getCategories({})
    expect(response).to.be.an('object')
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.be.equal(SUCCESSFUL_HTTP_STATUS_CODE)
    expect(response.body).to.be.a('string')
  })

  it('Expect to validate expenses categories payload format', async () => {
    const response = await getCategories({})
    expect(typeof response.body).to.be.equal('string')

    const bodyAsObject = JSON.parse(response.body)
    const QUANTITY_OF_CATEGORIES = 4

    expect(typeof bodyAsObject.data).to.equal('object')
    expect(bodyAsObject.data).to.be.an('array')
    expect(bodyAsObject.data.length).to.be.equal(QUANTITY_OF_CATEGORIES)
  })
})
