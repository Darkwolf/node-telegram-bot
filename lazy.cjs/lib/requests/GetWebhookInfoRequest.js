const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetWebhookInfoRequest {
  constructor(context) {
    this.queryMethod = GetWebhookInfoRequest.queryMethod
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
        response.setResult(types.WebhookInfo.fromParams(response.result, this.context))
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
GetWebhookInfoRequest.queryMethod = 'getWebhookInfo'
GetWebhookInfoRequest.from = context => new GetWebhookInfoRequest(context)

module.exports = GetWebhookInfoRequest
