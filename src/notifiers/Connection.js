/* eslint-disable node/no-unpublished-require */
'use strict'

const { SNS } = require('aws-sdk')

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION
} = require('config')

class Connection {
  static getInstance () {
    if (this.sns) {
      return this.sns
    }

    this.sns = new SNS({
      ...(ACCESS_KEY_ID && { accessKeyId: ACCESS_KEY_ID } || {}),
      ...(SECRET_ACCESS_KEY && { secretAccessKey: SECRET_ACCESS_KEY } || {}),
      region: REGION
    })

    return this.sns
  }
}

module.exports = Connection
