/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const {
  transformRequestBody,
  transformResponse,
  transformErrors,
  transformStreamRecord
} = require('transformers')
const { input, output } = require('../mocks/transform')

describe('Transform Tests', () => {
  before(() => { debugger })

  it('Expect to transform request body', () => {
    const response = transformRequestBody(input.requestBody)

    expect(response).to.be.an('object')
    expect(response).to.be.deep.equal(output.requestBody)
  })

  it('Expect to transform response', () => {
    const response = transformResponse(input.response)

    expect(response).to.be.a('string')
    expect(response).to.be.equal(output.response)
  })

  it('Expect to transform errors', () => {
    const response = transformErrors(input.errors)

    expect(response).to.be.a('string')
    expect(response).to.be.equal(output.errors)
  })

  it('Expect to transform stream data', () => {
    input.streams.forEach(stream => {
      const response = transformStreamRecord(stream)
      expect(response).to.be.an('object')
    })
  })
})
