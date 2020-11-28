import BadRequestError from './BadRequestError.mjs'

export default class InvalidShippingQueryError extends BadRequestError {
  static name = 'InvalidShippingQueryError'
  static code = 'invalid-shipping-query'

  constructor(id) {
    super(`Invalid shipping query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidShippingQueryError.code)
    this.setName(InvalidShippingQueryError.name)
  }
}
