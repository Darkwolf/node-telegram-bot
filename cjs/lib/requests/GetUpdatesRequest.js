const Helper = require('@darkwolf/helper.cjs')
const { Update } = require('../types')
const { BadRequestError } = require('../errors')
const { EventType } = require('../constants')

class GetUpdatesRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = GetUpdatesRequest.queryMethod
    this
      .setContext(context)
      .setOffset(parameters.offset)
      .setLimit(parameters.limit)
      .setTimeout(parameters.timeout)
      .setAllowedUpdates(parameters.allowedUpdates)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOffset(offset) {
    this.offset = offset
    return this
  }

  setLimit(limit) {
    this.limit = limit
    return this
  }

  setTimeout(timeout) {
    this.timeout = timeout
    return this
  }

  setAllowedUpdates(updates) {
    this.allowedUpdates = updates
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.offset)) {
      params.offset = this.offset
    }
    if (this.limit) {
      params.limit = this.limit
    }
    if (Helper.exists(this.timeout)) {
      params.timeout = this.timeout
    }
    if (this.allowedUpdates) {
      params.allowed_updates = this.allowedUpdates
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(update => Update.fromParams(update, this.context)))
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
GetUpdatesRequest.queryMethod = 'getUpdates'
GetUpdatesRequest.from = (parameters, context) => new GetUpdatesRequest(parameters, context)

module.exports = GetUpdatesRequest
