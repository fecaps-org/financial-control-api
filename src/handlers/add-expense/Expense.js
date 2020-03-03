'use strict'

const { get, pick } = require('lodash')
const { EXPENSES_CATEGORIES_TABLE, EVENT_RECEIVED_TYPE } = require('config')
const { transformStreamRecord } = require('transformers')

const EXPENSE_FIELDS = [ 'description', 'amount', 'expenseId' ]

class Expense {
  constructor (db, category) {
    this.db = db
    this.category = category
  }

  defineEvents (event) {
    this.events = event.Records
      .map(transformStreamRecord)
      .filter(({ eventType }) => eventType === EVENT_RECEIVED_TYPE)
  }

  async addExpenses () {
    let updatedItems = []

    try {
      for (let i = 0; i < this.events.length; i++) {
        const updatedItem = await this._updateCategoryExpenses(this.events[i])
        updatedItems = [ ...updatedItems, updatedItem ]
      }

      return updatedItems
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async _updateCategoryExpenses (event) {
    const category = await this.category.findByName(event.category)

    if (!get(category, 'Items[0].name')) {
      return []
    }

    const expenseRequest = this._defineRequest(category, event)
    return this.db.update(expenseRequest).promise()
  }

  _defineRequest (category, params) {
    const categoryExpenses = get(category, 'Items[0].expenses', [])
    const expenseContent = pick(params, EXPENSE_FIELDS)
    const expenses = [ ...categoryExpenses, expenseContent ]

    return {
      TableName: EXPENSES_CATEGORIES_TABLE,
      Key: { name: params.category },
      UpdateExpression: 'SET #expensesName = :expensesValue',
      ExpressionAttributeNames: { '#expensesName': 'expenses' },
      ExpressionAttributeValues: { ':expensesValue': expenses },
      ReturnValues: 'UPDATED_NEW'
    }
  }
}

module.exports = Expense
