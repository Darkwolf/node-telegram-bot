import Helper from '@darkwolf/helper.mjs'
import { BadRequestError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DeleteWebhookRequest {
  static queryMethod = 'deleteWebhook'

  static from(parameters, context) {
    return new DeleteWebhookRequest(parameters, context)
  }

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
