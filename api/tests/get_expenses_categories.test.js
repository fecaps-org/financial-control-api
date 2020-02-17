/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { handler: getCategories } = require('../handlers/get-expenses-categories')

describe('Get Expenses Categories Tests', () => {
  before(() => { debugger })

  it('Expect to validate expenses categories response', async () => {
    const response = await getCategories({})
    const SUCCESSFUL_HTTP_STATUS_CODE = 200
    expect(response).to.be.an('object')
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.equal(SUCCESSFUL_HTTP_STATUS_CODE)
    expect(response.body).to.be.a('string')
  })

  it('Expect to validate expenses categories payload format', async () => {
    const response = await getCategories({})
    expect(typeof response.body).to.be.equal('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(typeof bodyAsObject.data).to.be.equal('object')
    expect(bodyAsObject.data).to.an('array')
  })
})
