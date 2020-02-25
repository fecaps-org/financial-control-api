/* eslint-disable node/no-unpublished-require */
'use strict'

const {
  EXPENSES_CATEGORIES_TABLE,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION
} = require('config')

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  ...(ACCESS_KEY_ID && { accessKeyId: ACCESS_KEY_ID } || {}),
  ...(SECRET_ACCESS_KEY && { secretAccessKey: SECRET_ACCESS_KEY } || {}),
  region: REGION
})

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
