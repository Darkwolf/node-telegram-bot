const BadRequestError = require('./BadRequestError')

class InvalidCallbackQueryError extends BadRequestError {
  constructor(id) {
    super(`Invalid callback query: '${id}'. Query is too old and response timeout expired or query ID is invalid.`, InvalidCallbackQueryError.code)
    this.setName(InvalidCallbackQueryError.name)
  }
}
InvalidCallbackQueryError.name = 'InvalidCallbackQueryError'
InvalidCallbackQueryError.code = 'invalid-callback-query'

module.exports = InvalidCallbackQueryError
