/* eslint-env mocha */
/* eslint no-debugger: off */

const { expect } = require('chai')
const { transform } = require('../../src/transformers')
const { input, output } = require('../mocks/transform')

describe('Transform Tests', () => {
  before(() => { debugger })

  it('Expect to validate data transformation', () => {
    const response = transform(input)

    expect(response).to.be.a('string')
    expect(response).to.be.equal(output)
  })
})
