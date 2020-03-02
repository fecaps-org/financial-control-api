'use strict'

const { EXPENSES_CATEGORIES_TABLE } = require('config')

class Categories {
  constructor (db) {
    this.db = db
  }

  async list () {
    const categoriesRequest = this._defineRequest()

    try {
      const result = await this.db.scan(categoriesRequest).promise()
      return result && result.Items || []
    } catch (err) {
      return []
    }
  }

  _defineRequest () {
    return {
      TableName: EXPENSES_CATEGORIES_TABLE,
      Limit: 10
    }
  }
}

module.exports = Categories
