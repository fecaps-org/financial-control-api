'use strict'

const DatabaseConnection = require('database/Connection')
const db = DatabaseConnection.getInstance()

const Category = require('./Category')
const category = new Category(db)

const Expense = require('./Expense')
const expense = new Expense(db, category)

module.exports.handler = async event => {
  expense.defineEvents(event)
  const result = await expense.addExpenses()
  return result
}
