'use strict'

class Categories {
  constructor (db) {
    this.db = db
  }

  defineTableName (tableName) {
    this.tableName = tableName
  }

  async list () {
    const categoriesRequest = {
      TableName: this.tableName,
      Limit: 10
    }

    try {
      const result = await this.db.scan(categoriesRequest).promise()
      return result && result.Items || []
    } catch (err) {
      return []
    }
  }
}

module.exports = Categories
