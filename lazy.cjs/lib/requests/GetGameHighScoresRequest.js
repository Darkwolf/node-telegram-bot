const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetGameHighScoresRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = GetGameHighScoresRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setMessageId(parameters.messageId)
      .setInlineMessageId(parameters.inlineMessageId)
      .setUserId(parameters.userId)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setChatId(id) {
    this.chatId = id
    return this
  }

  setMessageId(id) {
    this.messageId = id
    return this
  }

  setInlineMessageId(id) {
    this.inlineMessageId = id
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  toParams() {
    const params = {}
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (this.messageId) {
      params.message_id = this.messageId
    }
    if (this.inlineMessageId) {
      params.inline_message_id = this.inlineMessageId
    }
    if (this.userId) {
      params.user_id = this.userId
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(score => types.GameHighScore.fromParams(score, this.context)))
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new errors.ChatNotFoundError(this.chatId).setResponse(response)
                break
              }
              case 'Bad Request: message to get game high scores not found': {
                error = new errors.MessageNotFoundError(this.messageId).setResponse(response)
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
GetGameHighScoresRequest.queryMethod = 'getGameHighScores'
GetGameHighScoresRequest.from = (parameters, context) => new GetGameHighScoresRequest(parameters, context)

module.exports = GetGameHighScoresRequest
