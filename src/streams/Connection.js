/* eslint-disable node/no-unpublished-require */
'use strict'

const { Kinesis } = require('aws-sdk')

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION
} = require('config')

class Connection {
  constructor () {
    this.dataStream = new Kinesis({
      ...(ACCESS_KEY_ID && { accessKeyId: ACCESS_KEY_ID } || {}),
      ...(SECRET_ACCESS_KEY && { secretAccessKey: SECRET_ACCESS_KEY } || {}),
      region: REGION
    })
  }

  get () {
    return this.dataStream
  }
}

module.exports = Connection
