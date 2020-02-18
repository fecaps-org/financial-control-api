'use strict'

const { AWS_REGION, EXPENSES_CATEGORIES_TABLE } = require('../../defaults')

// eslint-disable-next-line node/no-unpublished-require
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ region: AWS_REGION })

const { transform } = require('../../transformers')

const Categories = require('./Categories')
const categories = new Categories(db)
categories.defineTableName(EXPENSES_CATEGORIES_TABLE)

module.exports.handler = async () => {
  const result = await categories.list()

  return {
    statusCode: 200,
    body: transform(result)
  }
}
