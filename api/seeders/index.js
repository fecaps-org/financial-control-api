'use strict'

const { seedExpensesCategories } = require('./expenses_categories')

seedExpensesCategories()
  .then(() => console.log('All seeders were already executed!'))
  .catch(() => console.err('A seeder have failed!'))

