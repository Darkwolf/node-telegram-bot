const { InputFile } = require('../types')
const {
  BadRequestError,
  ChatNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class SetChatPhotoRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SetChatPhotoRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setPhoto(parameters.photo)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setPhoto(photo) {
    this.photo = photo ? (
      photo instanceof InputFile ? photo : new InputFile(photo)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.photo) {
      params.photo = this.photo
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
SetChatPhotoRequest.queryMethod = 'setChatPhoto'
SetChatPhotoRequest.from = (parameters, context) => new SetChatPhotoRequest(parameters, context)

module.exports = SetChatPhotoRequest
