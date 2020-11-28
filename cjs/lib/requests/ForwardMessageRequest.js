const Helper = require('@darkwolf/helper.cjs')
const { Message } = require('../types')
const {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  MessageNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class ForwardMessageRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = ForwardMessageRequest.queryMethod
    this
      .setContext(context)
      .setFromChatId(parameters.fromChatId)
      .setMessageId(parameters.messageId)
      .setChatId(parameters.chatId)
      .setDisableNotification(parameters.disableNotification)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setFromChatId(id) {
    this.fromChatId = id
    return this
  }

  setMessageId(id) {
    this.messageId = id
    return this
  }

  setChatId(id) {
    this.chatId = id
    return this
  }

  setDisableNotification(boolean) {
    this.disableNotification = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.fromChatId) {
      params.from_chat_id = this.fromChatId
    }
    if (this.messageId) {
      params.message_id = this.messageId
    }
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (Helper.exists(this.disableNotification)) {
      params.disable_notification = this.disableNotification
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Message.fromParams(response.result, this.context))
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new ChatNotFoundError(this.chatId).setResponse(response)
                break
              }
              case 'Bad Request: message to forward not found': {
                error = new MessageNotFoundError(this.messageId).setResponse(response)
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
ForwardMessageRequest.queryMethod = 'forwardMessage'
ForwardMessageRequest.from = (parameters, context) => new ForwardMessageRequest(parameters, context)

module.exports = ForwardMessageRequest
