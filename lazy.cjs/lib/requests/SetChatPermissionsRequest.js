const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SetChatPermissionsRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetChatPermissionsRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setPermissions(parameters.permissions)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setPermissions(permissions) {
    this.permissions = permissions ? (
      permissions instanceof types.ChatPermissions ? permissions : new types.ChatPermissions(permissions)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.permissions) {
      params.permissions = this.permissions.toParams()
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
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new errors.ChatNotFoundError(this.id).setResponse(response)
                break
              }
              default: {
                error = new errors.BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
        }
        if (!error) {
          error = new errors.UnknownError(response.description).setResponse(response)
        }
        this.context.telegramBot.emit(constants.EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SetChatPermissionsRequest.queryMethod = 'setChatPermissions'
SetChatPermissionsRequest.from = (parameters, context) => new SetChatPermissionsRequest(parameters, context)

module.exports = SetChatPermissionsRequest
