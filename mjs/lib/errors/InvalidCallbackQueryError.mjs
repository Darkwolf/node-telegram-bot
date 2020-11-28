import BadRequestError from './BadRequestError.mjs'

export default class InvalidCallbackQueryError extends BadRequestError {
  static name = 'InvalidCallbackQueryError'
  static code = 'invalid-callback-query'

  constructor(id) {
    super(`Invalid callback query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidCallbackQueryError.code)
    this.setName(InvalidCallbackQueryError.name)
  }
}
