/* eslint-disable node/no-unpublished-require */
'use strict'

const { DynamoDB } = require('aws-sdk')

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION
} = require('config')

class Connection {
  static getInstance () {
    if (this.db) {
      return this.db
    }

    this.db = new DynamoDB.DocumentClient({
      ...(ACCESS_KEY_ID && { accessKeyId: ACCESS_KEY_ID } || {}),
      ...(SECRET_ACCESS_KEY && { secretAccessKey: SECRET_ACCESS_KEY } || {}),
      region: REGION
    })

    return this.db
  }
}

module.exports = Connection
