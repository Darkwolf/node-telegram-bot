const errors = require('../errors')
const constants = require('../constants')

class DeleteStickerFromSetRequest {
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
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.BadRequestError(response.description).setResponse(response)
        this.context.telegramBot.emit(constants.EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
DeleteStickerFromSetRequest.queryMethod = 'deleteStickerFromSet'
DeleteStickerFromSetRequest.from = (parameters, context) => new DeleteStickerFromSetRequest(parameters, context)

module.exports = DeleteStickerFromSetRequest
