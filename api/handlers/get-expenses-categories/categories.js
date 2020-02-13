'use strict'

// eslint-disable-next-line node/no-unpublished-require
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const { EXPENSES_CATEGORIES_TABLE } = require('../../defaults')

module.exports.getCategories = () => new Promise(resolve => {
  const categoriesRequest = {
    TableName: EXPENSES_CATEGORIES_TABLE,
    Limit: 10
  }

  dynamoDB.scan(categoriesRequest, (err, data) => err
    ? resolve([])
    : resolve(data.Items || [])
  )
})
