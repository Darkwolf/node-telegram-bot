const { StickerSet } = require('../types')
const {
  BadRequestError,
  StickerSetNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class GetStickerSetRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = GetStickerSetRequest.queryMethod
    this
      .setContext(context)
      .setName(parameters.name)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  toParams() {
    const params = {}
    if (this.name) {
      params.name = this.name
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(StickerSet.fromParams(response.result, this.context))
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
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
GetStickerSetRequest.queryMethod = 'getStickerSet'
GetStickerSetRequest.from = (parameters, context) => new GetStickerSetRequest(parameters, context)

module.exports = GetStickerSetRequest
