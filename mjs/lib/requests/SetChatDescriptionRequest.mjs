import Helper from '@darkwolf/helper.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetChatDescriptionRequest {
  static queryMethod = 'setChatDescription'

  static from(parameters, context) {
    return new SetChatDescriptionRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetChatDescriptionRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setDescription(parameters.description)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (Helper.exists(this.description)) {
      params.description = this.description
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
