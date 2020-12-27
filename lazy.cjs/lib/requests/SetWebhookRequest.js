const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

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
      certificate instanceof types.InputFile ? certificate : new types.InputFile(certificate)
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
SetWebhookRequest.queryMethod = 'setWebhook'
SetWebhookRequest.from = (parameters, context) => new SetWebhookRequest(parameters, context)

module.exports = SetWebhookRequest
