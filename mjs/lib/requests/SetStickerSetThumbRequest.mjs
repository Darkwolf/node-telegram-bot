import Helper from '@darkwolf/helper.mjs'
import { InputFile } from '../types/index.mjs'
import {
  BadRequestError,
  UserNotFoundError,
  StickerSetNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetStickerSetThumbRequest {
  static queryMethod = 'setStickerSetThumb'

  static from(parameters, context) {
    return new SetStickerSetThumbRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetStickerSetThumbRequest.queryMethod
    this
      .setContext(context)
      .setUserId(parameters.userId)
      .setName(parameters.name)
      .setThumb(parameters.thumb)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      (Helper.isString(thumb) || thumb instanceof InputFile) ? thumb : new InputFile(thumb)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.userId) {
      params.user_id = this.userId
    }
    if (this.name) {
      params.name = this.name
    }
    if (this.thumb) {
      params.thumb = this.thumb
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
              case 'Bad Request: user not found': {
                error = new UserNotFoundError(this.userId).setResponse(response)
                break
              }
              case 'Bad Request: STICKERSET_INVALID': {
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
