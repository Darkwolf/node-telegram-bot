const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

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
        response.setResult(response.result.map(command => types.BotCommand.fromParams(command)))
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.BadRequestError(response.description).setResponse(response)
        this.context.telegramBot.emit(constants.EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetMyCommandsRequest.queryMethod = 'getMyCommands'
GetMyCommandsRequest.from = context => new GetMyCommandsRequest(context)

module.exports = GetMyCommandsRequest
