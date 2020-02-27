'use strict'

const EXPENSES_CATEGORIES_TABLE = process.env.EXPENSES_CATEGORIES_TABLE ||
  'expenses_categories'

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

const REGION = process.env.REGION || 'us-east-1'

const EXPENSES_STREAM = process.env.EXPENSES_STREAM || 'expense_events'

module.exports = {
  EXPENSES_CATEGORIES_TABLE,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION,
  EXPENSES_STREAM
}
