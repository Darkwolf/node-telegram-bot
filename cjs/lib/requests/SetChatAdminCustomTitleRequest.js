const Helper = require('@darkwolf/helper.cjs')
const {
  BadRequestError,
  ChatNotFoundError,
  UserNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class SetChatAdminCustomTitleRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetChatAdminCustomTitleRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setUserId(parameters.userId)
      .setTitle(parameters.title)
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

  setTitle(title) {
    this.title = title
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
    if (Helper.exists(this.title)) {
      params.custom_title = this.title
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
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new ChatNotFoundError(this.id).setResponse(response)
                break
              }
              case 'Bad Request: user not found': {
                error = new UserNotFoundError(this.userId).setResponse(response)
                break
              }
              default: {
                error = new BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
        }
        if (!error) {
          error = new UnknownError(response.description).setResponse(response)
        }
        this.context.telegramBot.emit(EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SetChatAdminCustomTitleRequest.queryMethod = 'setChatAdministratorCustomTitle'
SetChatAdminCustomTitleRequest.from = (parameters, context) => new SetChatAdminCustomTitleRequest(parameters, context)

module.exports = SetChatAdminCustomTitleRequest
