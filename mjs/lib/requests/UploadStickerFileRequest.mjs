import { File, InputFile } from '../types/index.mjs'
import {
  BadRequestError,
  UserNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class UploadStickerFileRequest {
  static queryMethod = 'uploadStickerFile'

  static from(parameters, context) {
    return new UploadStickerFileRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = UploadStickerFileRequest.queryMethod
    this
      .setContext(context)
      .setUserId(parameters.userId)
      .setPngSticker(parameters.pngSticker)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setPngSticker(sticker) {
    this.pngSticker = sticker ? (
      sticker instanceof InputFile ? sticker : new InputFile(sticker)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.userId) {
      params.user_id = this.userId
    }
    if (this.pngSticker) {
      params.png_sticker = this.pngSticker
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(File.fromParams(response.result, this.context))
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
