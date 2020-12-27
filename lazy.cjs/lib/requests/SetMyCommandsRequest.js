const errors = require('../errors')
const constants = require('../constants')

class SetMyCommandsRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetMyCommandsRequest.queryMethod
    this
      .setContext(context)
      .setCommands(parameters.commands)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCommands(commands) {
    this.commands = commands
    return this
  }

  toParams() {
    const params = {}
    if (this.commands) {
      params.commands = this.commands.map(command => command.toParams())
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
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
SetMyCommandsRequest.queryMethod = 'setMyCommands'
SetMyCommandsRequest.from = (parameters, context) => new SetMyCommandsRequest(parameters, context)

module.exports = SetMyCommandsRequest
