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
    ]
  },

  output: {
    requestBody: { name: 'ok' },

    response: '{"data":[{"name":"category name","description":"category description"}]}',

    errors: '{"errors":[{"message":"x is required","path":"x"}]}'
  }
}
