/* eslint-disable node/no-unpublished-require */
'use strict'

const { Kinesis } = require('aws-sdk')

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION
} = require('config')

class Connection {
  static getInstance () {
    if (this.dataStream) {
      return this.dataStream
    }

    this.dataStream = new Kinesis({
      ...(ACCESS_KEY_ID && { accessKeyId: ACCESS_KEY_ID } || {}),
      ...(SECRET_ACCESS_KEY && { secretAccessKey: SECRET_ACCESS_KEY } || {}),
      region: REGION
    })

    return this.dataStream
  }
}

module.exports = Connection
