const BadRequestError = require('./BadRequestError')

class InvalidPreCheckoutQueryError extends BadRequestError {
  constructor(id) {
    super(`Invalid pre checkout query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidPreCheckoutQueryError.code)
    this.setName(InvalidPreCheckoutQueryError.name)
  }
}
InvalidPreCheckoutQueryError.name = 'InvalidPreCheckoutQueryError'
InvalidPreCheckoutQueryError.code = 'invalid-pre-checkout-query'

module.exports = InvalidPreCheckoutQueryError
