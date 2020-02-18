'use strict'

const EXPENSES_CATEGORIES_TABLE = process.env.EXPENSES_CATEGORIES_TABLE ||
  'expenses_categories'

const AWS_REGION = process.env.REGION || 'us-east-1'

module.exports = {
  EXPENSES_CATEGORIES_TABLE,
  AWS_REGION
}
