import {
  BadRequestError,
  ChatNotFoundError,
  StickerSetNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetChatStickerSetRequest {
  static queryMethod = 'setChatStickerSet'

  static from(parameters, context) {
    return new SetChatStickerSetRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetChatStickerSetRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setName(parameters.name)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.name) {
      params.sticker_set_name = this.name
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
              case 'Bad Request: sticker set not found': {
                error = new StickerSetNotFoundError(this.name).setResponse(response)
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
