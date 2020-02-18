'use strict'

const { AWS_REGION, EXPENSES_CATEGORIES_TABLE } = require('../../defaults')

// eslint-disable-next-line node/no-unpublished-require
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: AWS_REGION })

module.exports.getCategories = () => new Promise(resolve => {
  const categoriesRequest = {
    TableName: EXPENSES_CATEGORIES_TABLE,
    Limit: 10
  }

  dynamoDB.scan(categoriesRequest, (err, data) =>
    err
      ? resolve([])
      : resolve(data.Items || [])
  )
})
