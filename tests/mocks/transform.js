'use strict'

module.exports = {
  input: {
    requestBody: {
      body: JSON.stringify({ name: 'ok' })
    },

    response: [
      {
        name: 'category name',
        description: 'category description'
      }
    ],

    errors: [
      {
        message: 'x is required',
        path: 'x'
      }
    ],

    streams: [
      {
        kinesis: {
          partitionKey: '0deaed30-59a4-11ea-9243-1792f8dfcba2',
          sequenceNumber: '49604631341683657867295630657032921195561055316799913986',
          data: 'eyJleHBlbnNlSWQiOiIwZGVhZWQzMC01OWE0LTExZWEtOTI0My0xNzkyZjhkZmNiYTIiLCJjYXRlZ29yeSI6Im90aGVyIiwiZGVzY3JpcHRpb24iOiJEb24ndCBrbm93IiwiYW1vdW50IjoxOTAuOSwiZXZlbnRUeXBlIjoiZXhwZW5zZV9zZW50In0='
        }
      }
    ]
  },

  output: {
    requestBody: { name: 'ok' },

    response: '{"data":[{"name":"category name","description":"category description"}]}',

    errors: '{"errors":[{"message":"x is required","path":"x"}]}'
  }
}
