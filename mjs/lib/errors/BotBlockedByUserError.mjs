import ForbiddenError from './ForbiddenError.mjs'

export default class BotBlockedByUserError extends ForbiddenError {
  static name = 'BotBlockedByUserError'
  static code = 'bot-blocked-by-user'

  constructor(id) {
    super(`Bot blocked by user: '${id}'.`, BotBlockedByUserError.code)
    this.setName(BotBlockedByUserError.name)
  }
}
