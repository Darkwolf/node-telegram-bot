const errors = require('./')

class InvalidBotTokenError extends errors.UnauthorizedError {
  constructor(token) {
    super(`Invalid bot token: '${token}'.`, InvalidBotTokenError.code)
    this.setName(InvalidBotTokenError.name)
  }
}
InvalidBotTokenError.name = 'InvalidBotTokenError'
InvalidBotTokenError.code = 'invalid-bot-token'

module.exports = InvalidBotTokenError
