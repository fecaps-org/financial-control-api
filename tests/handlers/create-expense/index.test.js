/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input, output } = require('../../mocks/create-expense')
const { handler: createExpense } = require('handlers/create-expense')

describe('Create Expense Function Tests', () => {
  before(() => { debugger })

  it('Expect to not validate full response of expense function', async () => {
    const response = await createExpense(input.invalidDataTypesAsJson)

    expect(response).to.be.an('object')
    expect(response).to.have.property('statusCode')
    expect(response).to.have.property('body')
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.be.equal(output.UNSUCCESSFUL_HTTP_STATUS_CODE_FOR_INVALID_DATA)

    expect(response.body).to.be.a('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(bodyAsObject).to.have.property('errors')
    expect(bodyAsObject.errors).to.be.an('array')
  })

  it('Expect to validate full response of expense function', async () => {
    const response = await createExpense(input.validAsJson)

    expect(response).to.be.an('object')
    expect(response).to.have.property('statusCode')
    expect(response).to.have.property('body')
    expect(response.statusCode).to.be.a('number')
    expect(response.statusCode).to.be.equal(output.SUCCESSFUL_HTTP_STATUS_CODE_FOR_CREATION)

    expect(response.body).to.be.a('string')
    const bodyAsObject = JSON.parse(response.body)
    expect(bodyAsObject).to.have.property('data')
    expect(bodyAsObject.data).to.be.an('object')
  })
})
