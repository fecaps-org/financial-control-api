'use strict'

const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const EXPENSES_CATEGORIES_TABLE = process.env.expenses_categories_table

module.exports.getCategories = () => new Promise(resolve => {
  const categoriesRequest = {
    TableName: EXPENSES_CATEGORIES_TABLE,
    Limit: 10
  }

  dynamoDB.scan(categoriesRequest, (err, data) => {
    if (err) {
      return resolve([])
    }
    resolve(data.Items || [])
  })
})
