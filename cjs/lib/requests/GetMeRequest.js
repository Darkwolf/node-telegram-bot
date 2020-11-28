const { User } = require('../types')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

class GetMeRequest {
  constructor(context) {
    this.queryMethod = GetMeRequest.queryMethod
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(User.fromParams(response.result, this.context))
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new BadRequestError(response.description).setResponse(response)
        this.context.telegramBot.emit(EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetMeRequest.queryMethod = 'getMe'
GetMeRequest.from = context => new GetMeRequest(context)

module.exports = GetMeRequest
