const UnauthorizedError = require('./UnauthorizedError')

class InvalidBotTokenError extends UnauthorizedError {
  constructor(token) {
    super(`Invalid bot token: '${token}'.`, InvalidBotTokenError.code)
    this.setName(InvalidBotTokenError.name)
  }
}
InvalidBotTokenError.name = 'InvalidBotTokenError'
InvalidBotTokenError.code = 'invalid-bot-token'

module.exports = InvalidBotTokenError
