const { BotCommand } = require('../types')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

 class GetMyCommandsRequest {
  constructor(context) {
    this.queryMethod = GetMyCommandsRequest.queryMethod
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
        response.setResult(response.result.map(command => BotCommand.fromParams(command)))
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
GetMyCommandsRequest.queryMethod = 'getMyCommands'
GetMyCommandsRequest.from = context => new GetMyCommandsRequest(context)

module.exports = GetMyCommandsRequest
