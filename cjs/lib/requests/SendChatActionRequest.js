const {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class SendChatActionRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendChatActionRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setAction(parameters.action)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setAction(action) {
    this.action = action
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.action) {
      params.action = this.action
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
              default: {
                error = new BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
          case 403: {
            switch (response.description) {
              case 'Forbidden: bot was blocked by the user': {
                error = new BotBlockedByUserError(this.chatId).setResponse(response)
                break
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
SendChatActionRequest.queryMethod = 'sendChatAction'
SendChatActionRequest.from = (parameters, context) => new SendChatActionRequest(parameters, context)

module.exports = SendChatActionRequest
