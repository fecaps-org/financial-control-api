/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { handler: getExpenses } = require('../handlers/get-expenses')

describe('Get Expenses Tests', () => {
  before(() => { debugger })

  it('Expect to validate expenses response', async () => {
    const response = await getExpenses({})
    const SUCCESSFUL_HTTP_STATUS_CODE = 200
    expect(response).to.be.an('object')
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.equal(SUCCESSFUL_HTTP_STATUS_CODE)
    expect(response.body).to.be.a('string')
  })

  it('Expect to validate expenses payload format', async () => {
    const response = await getExpenses({})
    expect(typeof response.body).to.be.equal('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(typeof bodyAsObject.data).to.be.equal('object')
    expect(bodyAsObject.data).to.an('array')
  })
})
