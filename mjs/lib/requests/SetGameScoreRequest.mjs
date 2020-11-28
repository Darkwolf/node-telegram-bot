import Helper from '@darkwolf/helper.mjs'
import { Message } from '../types/index.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  MessageNotFoundError,
  UserNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetGameScoreRequest {
  static queryMethod = 'setGameScore'

  static from(parameters, context) {
    return new SetGameScoreRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetGameScoreRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setMessageId(parameters.messageId)
      .setInlineMessageId(parameters.inlineMessageId)
      .setUserId(parameters.userId)
      .setScore(parameters.score)
      .setForce(parameters.force)
      .setDisableEditMessage(parameters.disableEditMessage)
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

  setScore(score) {
    this.score = score
    return this
  }

  setForce(boolean) {
    this.force = boolean
    return this
  }

  setDisableEditMessage(boolean) {
    this.disableEditMessage = boolean
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
    if (Helper.exists(this.score)) {
      params.score = this.score
    }
    if (Helper.exists(this.force)) {
      params.force = this.force
    }
    if (Helper.exists(this.disableEditMessage)) {
      params.disable_edit_message = this.disableEditMessage
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        if (Helper.isObject(response.result)) {
          response.setResult(Message.fromParams(response.result, this.context))
        }
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
              case 'Bad Request: message to set game score not found': {
                error = new MessageNotFoundError(this.messageId).setResponse(response)
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
