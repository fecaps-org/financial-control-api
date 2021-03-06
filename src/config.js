'use strict'

const EXPENSES_CATEGORIES_TABLE = process.env.EXPENSES_CATEGORIES_TABLE ||
  'expenses_categories'

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

const REGION = process.env.REGION || 'us-east-1'

const EXPENSES_STREAM = process.env.EXPENSES_STREAM || 'expense_events'

const EVENT_TYPE = process.env.EVENT_TYPE || 'expense_sent'

const EVENT_RECEIVED_TYPE = process.env.EVENT_RECEIVED_TYPE || 'expense_received'

module.exports = {
  EXPENSES_CATEGORIES_TABLE,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION,
  EXPENSES_STREAM,
  EVENT_TYPE,
  EVENT_RECEIVED_TYPE
}
