const errors = require('./')

class InvalidShippingQueryError extends errors.BadRequestError {
  constructor(id) {
    super(`Invalid shipping query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidShippingQueryError.code)
    this.setName(InvalidShippingQueryError.name)
  }
}
InvalidShippingQueryError.name = 'InvalidShippingQueryError'
InvalidShippingQueryError.code = 'invalid-shipping-query'

module.exports = InvalidShippingQueryError
