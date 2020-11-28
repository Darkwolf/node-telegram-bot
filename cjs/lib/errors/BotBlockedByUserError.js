const ForbiddenError = require('./ForbiddenError')

class BotBlockedByUserError extends ForbiddenError {
  constructor(id) {
    super(`Bot blocked by user: '${id}'.`, BotBlockedByUserError.code)
    this.setName(BotBlockedByUserError.name)
  }
}
BotBlockedByUserError.name = 'BotBlockedByUserError'
BotBlockedByUserError.code = 'bot-blocked-by-user'

module.exports = BotBlockedByUserError
