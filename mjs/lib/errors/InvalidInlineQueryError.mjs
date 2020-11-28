import BadRequestError from './BadRequestError.mjs'

export default class InvalidInlineQueryError extends BadRequestError {
  static name = 'InvalidInlineQueryError'
  static code = 'invalid-inline-query'

  constructor(id) {
    super(`Invalid inline query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidInlineQueryError.code)
    this.setName(InvalidInlineQueryError.name)
  }
}
