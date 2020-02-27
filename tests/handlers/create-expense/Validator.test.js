/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { input, output } = require('../../mocks/create-expense')
const Validator = require('handlers/create-expense/Validator')

describe('Create Expense Function - Validator Tests', () => {
  before(() => { debugger })

  it('Expect to return error when injecting invalid Joi instance on Validator', async () => {
    try {
      const validator = new Validator({})
      const response = await validator.validate({})
      expect(response).to.be.undefined
    } catch (err) {
      expect(err).to.not.be.undefined
      expect(err).to.be.an('error')
      expect(err.message).to.be.a('string')
    }
  })

  it('Expect to return error when validating empty data on Validator', async () => {
    try {
      const validator = new Validator(input.Joi)
      const response = await validator.validate({})
      expect(response).to.be.undefined
    } catch (err) {
      expect(err).to.not.be.undefined
      expect(err).to.be.an('array')
      expect(err).to.lengthOf(output.QUANTITY_OF_REQUIRED_PROPERTIES)
      err.forEach(error => {
        expect(error).to.be.an('object')
        expect(error).to.have.keys([ 'message', 'path' ])
        expect(error.message).to.be.a('string')
        expect(error.path).to.be.a('string')
      })
    }
  })

  it('Expect to validate expense', async () => {
    const validator = new Validator(input.Joi)
    const response = await validator.validate(input.valid)
    expect(response).to.be.an('object')
    expect(response).to.have.keys([ 'category', 'description', 'amount' ])
    expect(response.category).to.be.equal(input.valid.category)
    expect(response.description).to.be.equal(input.valid.description)
    expect(response.amount).to.be.equal(input.valid.amount)
  })
})
