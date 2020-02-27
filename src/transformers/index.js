'use strict'

const transformRequestBody = event =>
  event && event.body && typeof event.body === 'string'
    ? JSON.parse(event.body)
    : {}

const transformResponse = data =>
  JSON.stringify({ data })

const transformErrors = errors =>
  JSON.stringify({ errors })

module.exports = {
  transformRequestBody,
  transformResponse,
  transformErrors
}
