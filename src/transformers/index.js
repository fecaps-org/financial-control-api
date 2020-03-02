'use strict'

const transformRequestBody = event =>
  event && event.body && typeof event.body === 'string'
    ? JSON.parse(event.body)
    : {}

const transformResponse = data =>
  JSON.stringify({ data })

const transformErrors = errors =>
  JSON.stringify({ errors })

const transformStreamRecord = record => {
  const jsonData = Buffer
    .from(record.kinesis.data, 'base64')
    .toString()

  return JSON.parse(jsonData)
}

module.exports = {
  transformRequestBody,
  transformResponse,
  transformErrors,
  transformStreamRecord
}
