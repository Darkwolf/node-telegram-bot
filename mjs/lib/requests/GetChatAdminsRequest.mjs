import { ChatMember } from '../types/index.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetChatAdminsRequest {
  static queryMethod = 'getChatAdministrators'

  static from(parameters, context) {
    return new GetChatAdminsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = GetChatAdminsRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(member => ChatMember.fromParams(member, {
          ...this.context,
          chatId: this.id
        })))
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
