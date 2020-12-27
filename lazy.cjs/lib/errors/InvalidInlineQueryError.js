const errors = require('./')

class InvalidInlineQueryError extends errors.BadRequestError {
  constructor(id) {
    super(`Invalid inline query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidInlineQueryError.code)
    this.setName(InvalidInlineQueryError.name)
  }
}
InvalidInlineQueryError.name = 'InvalidInlineQueryError'
InvalidInlineQueryError.code = 'invalid-inline-query'

module.exports = InvalidInlineQueryError
