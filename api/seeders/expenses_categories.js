'use strict'

// eslint-disable-next-line node/no-unpublished-require
const AWS = require('aws-sdk')
const { AWS_REGION } = require('../defaults')
AWS.config.region = AWS_REGION

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { EXPENSES_CATEGORIES_TABLE } = require('../defaults')

module.exports.seedExpensesCategories = () => {
  const expensesCategories = [
    {
      name: 'transportation',
      description: 'Public transport, cars, etc'
    },
    {
      name: 'education',
      description: 'Courses, trainings, books, etc'
    },
    {
      name: 'food',
      description: 'Restaurants, dining, food, etc'
    },
    {
      name: 'other',
      description: 'Bank, Online purchases, Taxes, etc'
    }
  ]

  const putExpensesCategoriesRecords = expensesCategories.map(item => ({
    PutRequest: { Item: item }
  }))

  const records = {
    RequestItems: {
      [EXPENSES_CATEGORIES_TABLE]: putExpensesCategoriesRecords
    }
  }

  return new Promise((resolve, reject) => {
    dynamoDb.batchWrite(records, (err, data) => {
      if (err) {
        console.error('Seed - Expenses Categories didn\'t work:', err)
        return reject(err)
      }

      console.log('Seed - Expenses Categories: Finished!')
      console.log(data)
      resolve(data)
    })
  })
}
