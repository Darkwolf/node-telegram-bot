import { BadRequestError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DeleteStickerFromSetRequest {
  static queryMethod = 'deleteStickerFromSet'

  static from(parameters, context) {
    return new DeleteStickerFromSetRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = DeleteStickerFromSetRequest.queryMethod
    this
      .setContext(context)
      .setSticker(parameters.sticker)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setSticker(sticker) {
    this.sticker = sticker
    return this
  }

  toParams() {
    const params = {}
    if (this.sticker) {
      params.sticker = this.sticker
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
        const error = new BadRequestError(response.description).setResponse(response)
        this.context.telegramBot.emit(EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
