const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class CreateNewStickerSetRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = CreateNewStickerSetRequest.queryMethod
    this
      .setContext(context)
      .setUserId(parameters.userId)
      .setName(parameters.name)
      .setTitle(parameters.title)
      .setPngSticker(parameters.pngSticker)
      .setTgsSticker(parameters.tgsSticker)
      .setEmojis(parameters.emojis)
      .setContainsMasks(parameters.containsMasks)
      .setMaskPosition(parameters.maskPosition)
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

  setTitle(title) {
    this.title = title
    return this
  }

  setPngSticker(sticker) {
    this.pngSticker = sticker ? (
      (Helper.isString(sticker) || sticker instanceof types.InputFile) ? sticker : new types.InputFile(sticker)
    ) : undefined
    return this
  }

  setTgsSticker(sticker) {
    this.tgsSticker = sticker ? (
      sticker instanceof types.InputFile ? sticker : new types.InputFile(sticker)
    ) : undefined
    return this
  }

  setEmojis(emojis) {
    this.emojis = emojis
    return this
  }

  setContainsMasks(boolean) {
    this.containsMasks = boolean
    return this
  }

  setMaskPosition(maskPosition) {
    this.maskPosition = maskPosition ? (
      maskPosition instanceof types.MaskPosition ? maskPosition : new types.MaskPosition(maskPosition.point, maskPosition.xShift, maskPosition.yShift, maskPosition.scale)
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
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (this.pngSticker) {
      params.png_sticker = this.pngSticker
    }
    if (this.tgsSticker) {
      params.tgs_sticker = this.tgsSticker
    }
    if (this.emojis) {
      params.emojis = this.emojis
    }
    if (Helper.exists(this.containsMasks)) {
      params.contains_masks = this.containsMasks
    }
    if (this.maskPosition) {
      params.mask_position = this.maskPosition.toParams()
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
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: user not found': {
                error = new errors.UserNotFoundError(this.userId).setResponse(response)
                break
              }
              default: {
                error = new errors.BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
        }
        if (!error) {
          error = new errors.UnknownError(response.description).setResponse(response)
        }
        this.context.telegramBot.emit(constants.EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
CreateNewStickerSetRequest.queryMethod = 'createNewStickerSet'
CreateNewStickerSetRequest.from = (parameters, context) => new CreateNewStickerSetRequest(parameters, context)

module.exports = CreateNewStickerSetRequest
