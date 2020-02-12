'use strict'

const AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'

const dynamodb = new AWS.DynamoDB.DocumentClient()

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

const putExpensesCategoriesRecords = expensesCategories.map(x => ({
  PutRequest: { Item: x }
}))

const records = { RequestItems: {
  expenses_categories: putExpensesCategoriesRecords
  } }

dynamodb.batchWrite(records)
  .then(() => console.log('Seed - Expenses Categories: Finished!'))
  .catch(err => console.error('Seed - Expenses Categories didn\'t work:', err))
