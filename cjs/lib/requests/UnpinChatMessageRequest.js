const {
  BadRequestError,
  ChatNotFoundError,
  MessageNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class UnpinChatMessageRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = UnpinChatMessageRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setMessageId(parameters.messageId)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setMessageId(id) {
    this.messageId = id
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.messageId) {
      params.message_id = this.messageId
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
              case 'Bad Request: message to unpin not found': {
                error = new MessageNotFoundError(this.messageId).setResponse(response)
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
UnpinChatMessageRequest.queryMethod = 'unpinChatMessage'
UnpinChatMessageRequest.from = (parameters, context) => new UnpinChatMessageRequest(parameters, context)

module.exports = UnpinChatMessageRequest
