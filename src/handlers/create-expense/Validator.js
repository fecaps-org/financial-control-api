'use strict'

class Validator {
  constructor (joi) {
    this.joi = joi
    this._defineSchema()
  }

  _defineSchema () {
    try {
      this.schema = this.joi.object({
        category: this.joi.string()
          .valid('education', 'transportation', 'food', 'other')
          .description('Expense category')
          .required(),

        description: this.joi.string()
          .min(1)
          .max(255)
          .description('Expense description')
          .required(),

        amount: this.joi.number()
          .precision(2)
          .min(0)
          .description('Expense amount')
          .required()
      })
    } catch (err) {
      throw new Error(`Invalid Schema definition: ${err.message}`)
    }
  }

  async validate (params) {
    try {
      return await this.schema.validateAsync(params, { abortEarly: false })
    } catch (err) {
      throw err.isJoi
        ? this._defineJoiError(err)
        : err
    }
  }

  _defineJoiError (err) {
    return err.details.map(({ message, path }) => ({
      message,
      path: Array.isArray(path) && path.length
        ? path[0]
        : path
    }))
  }
}

module.exports = Validator
