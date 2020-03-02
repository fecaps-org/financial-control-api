'use strict'

const { EXPENSES_CATEGORIES_TABLE } = require('config')

class Category {
  constructor (db) {
    this.db = db
  }

  async findByName (name) {
    const categoriesRequest = this._defineRequest(name)

    try {
      return await this.db.query(categoriesRequest).promise()
    } catch (err) {
      return []
    }
  }

  _defineRequest (name) {
    return {
      TableName: EXPENSES_CATEGORIES_TABLE,
      KeyConditionExpression: '#categoryName = :categoryValue',
      ExpressionAttributeNames: { '#categoryName': 'name' },
      ExpressionAttributeValues: { ':categoryValue': name }
    }
  }
}

module.exports = Category
