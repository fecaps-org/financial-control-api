/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { output } = require('../../mocks/get-expenses')
const { handler: getExpenses } = require('handlers/get-expenses')

describe('Get Expenses Function Tests', () => {
  before(() => { debugger })

  it('Expect to validate full response of expenses function', async () => {
    const response = await getExpenses({})

    expect(response).to.be.an('object')
    expect(response).to.have.property('statusCode')
    expect(response).to.have.property('body')

    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.be.equal(output.SUCCESSFUL_HTTP_STATUS_CODE)

    expect(response.body).to.be.a('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(bodyAsObject).to.have.property('data')
    expect(bodyAsObject.data).to.be.an('array')
  })
})
