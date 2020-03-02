'use strict'

const { output: defaultOutput } = require('./default')
const DatabaseConnection = require('database/Connection')
const db = DatabaseConnection.getInstance()

module.exports = {
  input: {
    db,

    name: 'other',

    streams: {
      Records: [
        {
          kinesis: {
            partitionKey: '0deaed30-59a4-11ea-9243-1792f8dfcba2',
            sequenceNumber: '49604631341683657867295630657032921195561055316799913986',
            data: 'eyJleHBlbnNlSWQiOiIwZGVhZWQzMC01OWE0LTExZWEtOTI0My0xNzkyZjhkZmNiYTIiLCJjYXRlZ29yeSI6Im90aGVyIiwiZGVzY3JpcHRpb24iOiJEb24ndCBrbm93IiwiYW1vdW50IjoxOTAuOSwiZXZlbnRUeXBlIjoiZXhwZW5zZV9zZW50In0='
          }
        }
      ]
    }
  },

  output: {
    ...defaultOutput,
    QUANTITY_OF_CATEGORIES: 1
  }
}
