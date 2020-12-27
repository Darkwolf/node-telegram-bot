const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class RestrictChatMemberRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = RestrictChatMemberRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setUserId(parameters.userId)
      .setPermissions(parameters.permissions)
      .setUntilDate(parameters.untilDate)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setPermissions(permissions) {
    this.permissions = permissions ? (
      permissions instanceof types.ChatPermissions ? permissions : new types.ChatPermissions(permissions)
    ) : undefined
    return this
  }

  setUntilDate(date) {
    this.untilDate = date
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.userId) {
      params.user_id = this.userId
    }
    if (this.permissions) {
      params.permissions = this.permissions.toParams()
    }
    if (this.untilDate) {
      params.until_date = this.untilDate
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
              case 'Bad Request: user not found': {
                error = new errors.UserNotFoundError(this.userId).setResponse(response)
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
RestrictChatMemberRequest.queryMethod = 'restrictChatMember'
RestrictChatMemberRequest.from = (parameters, context) => new RestrictChatMemberRequest(parameters, context)

module.exports = RestrictChatMemberRequest
