import UnauthorizedError from './UnauthorizedError.mjs'

export default class InvalidBotTokenError extends UnauthorizedError {
  static name = 'InvalidBotTokenError'
  static code = 'invalid-bot-token'

  constructor(token) {
    super(`Invalid bot token: '${token}'.`, InvalidBotTokenError.code)
    this.setName(InvalidBotTokenError.name)
  }
}
