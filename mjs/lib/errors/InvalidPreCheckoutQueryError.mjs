import BadRequestError from './BadRequestError.mjs'

export default class InvalidPreCheckoutQueryError extends BadRequestError {
  static name = 'InvalidPreCheckoutQueryError'
  static code = 'invalid-pre-checkout-query'

  constructor(id) {
    super(`Invalid pre checkout query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidPreCheckoutQueryError.code)
    this.setName(InvalidPreCheckoutQueryError.name)
  }
}
