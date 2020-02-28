'use strict'

const { EXPENSES_CATEGORIES_TABLE } = require('config')

const DatabaseConnection = require('database/Connection')
const db = DatabaseConnection.getInstance()

module.exports.seedExpensesCategories = async () => {
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

  try {
    const data = await db.batchWrite(records).promise()
    console.log('Seed - Expenses Categories: Finished!')
    console.log(data)

    return data
  } catch (err) {
    console.error('Seed - Expenses Categories didn\'t work:', err)
    throw err
  }
}
