const { WebhookInfo } = require('../types')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

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
        response.setResult(WebhookInfo.fromParams(response.result, this.context))
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
GetWebhookInfoRequest.queryMethod = 'getWebhookInfo'
GetWebhookInfoRequest.from = context => new GetWebhookInfoRequest(context)

module.exports = GetWebhookInfoRequest
