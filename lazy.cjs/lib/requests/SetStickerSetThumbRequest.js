const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SetStickerSetThumbRequest {
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
      (Helper.isString(thumb) || thumb instanceof types.InputFile) ? thumb : new types.InputFile(thumb)
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
              case 'Bad Request: STICKERSET_INVALID': {
                error = new errors.StickerSetNotFoundError(this.name).setResponse(response)
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
SetStickerSetThumbRequest.queryMethod = 'setStickerSetThumb'
SetStickerSetThumbRequest.from = (parameters, context) => new SetStickerSetThumbRequest(parameters, context)

module.exports = SetStickerSetThumbRequest
