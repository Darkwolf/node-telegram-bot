const Helper = require('@darkwolf/helper.cjs')
const { InputFile } = require('../types')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

class SetWebhookRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetWebhookRequest.queryMethod
    this
      .setContext(context)
      .setUrl(parameters.url)
      .setCertificate(parameters.certificate)
      .setIPAddress(parameters.ipAddress)
      .setMaxConnections(parameters.maxConnections)
      .setAllowedUpdates(parameters.allowedUpdates)
      .setDropPendingUpdates(parameters.dropPendingUpdates)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setCertificate(certificate) {
    this.certificate = certificate ? (
      certificate instanceof InputFile ? certificate : new InputFile(certificate)
    ) : undefined
    return this
  }

  setIPAddress(ipAddress) {
    this.ipAddress = ipAddress
    return this
  }

  setMaxConnections(value) {
    this.maxConnections = value
    return this
  }

  setAllowedUpdates(updates) {
    this.allowedUpdates = updates
    return this
  }

  setDropPendingUpdates(boolean) {
    this.dropPendingUpdates = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.url) {
      params.url = this.url
    }
    if (this.certificate) {
      params.certificate = this.certificate
    }
    if (this.ipAddress) {
      params.ip_address = this.ipAddress
    }
    if (this.maxConnections) {
      params.max_connections = this.maxConnections
    }
    if (this.allowedUpdates) {
      params.allowed_updates = this.allowedUpdates
    }
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
SetWebhookRequest.queryMethod = 'setWebhook'
SetWebhookRequest.from = (parameters, context) => new SetWebhookRequest(parameters, context)

module.exports = SetWebhookRequest
