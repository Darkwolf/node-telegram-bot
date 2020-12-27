const Helper = require('@darkwolf/helper.cjs')
const errors = require('../errors')
const constants = require('../constants')

class SetStickerPositionInSetRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetStickerPositionInSetRequest.queryMethod
    this
      .setContext(context)
      .setSticker(parameters.sticker)
      .setPosition(parameters.position)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setSticker(sticker) {
    this.sticker = sticker
    return this
  }

  setPosition(position) {
    this.position = position
    return this
  }

  toParams() {
    const params = {}
    if (this.sticker) {
      params.sticker = this.sticker
    }
    if (Helper.exists(this.position)) {
      params.position = this.position
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
SetStickerPositionInSetRequest.queryMethod = 'setStickerPositionInSet'
SetStickerPositionInSetRequest.from = (parameters, context) => new SetStickerPositionInSetRequest(parameters, context)

module.exports = SetStickerPositionInSetRequest
