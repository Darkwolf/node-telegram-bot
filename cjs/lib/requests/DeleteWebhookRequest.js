const Helper = require('@darkwolf/helper.cjs')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

class DeleteWebhookRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = DeleteWebhookRequest.queryMethod
    this
      .setContext(context)
      .setDropPendingUpdates(parameters.dropPendingUpdates)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setDropPendingUpdates(boolean) {
    this.dropPendingUpdates = boolean
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.dropPendingUpdates)) {
      params.drop_pending_updates = this.dropPendingUpdates
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
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
DeleteWebhookRequest.queryMethod = 'deleteWebhook'
DeleteWebhookRequest.from = (parameters, context) => new DeleteWebhookRequest(parameters, context)

module.exports = DeleteWebhookRequest
