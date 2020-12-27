const errors = require('../errors')
const constants = require('../constants')

class SetChatStickerSetRequest {
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
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new errors.ChatNotFoundError(this.id).setResponse(response)
                break
              }
              case 'Bad Request: sticker set not found': {
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
SetChatStickerSetRequest.queryMethod = 'setChatStickerSet'
SetChatStickerSetRequest.from = (parameters, context) => new SetChatStickerSetRequest(parameters, context)

module.exports = SetChatStickerSetRequest
