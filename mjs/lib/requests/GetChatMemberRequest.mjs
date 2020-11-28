import { ChatMember } from '../types/index.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  UserNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetChatMemberRequest {
  static queryMethod = 'getChatMember'

  static from(parameters, context) {
    return new GetChatMemberRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = GetChatMemberRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setUserId(parameters.userId)
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

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
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
        response.setResult(ChatMember.fromParams(response.result, {
          ...this.context,
          chatId: this.id
        }))
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
