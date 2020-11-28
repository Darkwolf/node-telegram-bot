const Helper = require('@darkwolf/helper.cjs')
const { UserProfilePhotos } = require('../types')
const {
  BadRequestError,
  UserNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class GetUserProfilePhotosRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = GetUserProfilePhotosRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setOffset(parameters.offset)
      .setLimit(parameters.limit)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setOffset(offset) {
    this.offset = offset
    return this
  }

  setLimit(limit) {
    this.limit = limit
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.user_id = this.id
    }
    if (Helper.exists(this.offset)) {
      params.offset = this.offset
    }
    if (this.limit) {
      params.limit = this.limit
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(UserProfilePhotos.fromParams(response.result, this.context))
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: user not found': {
                error = new UserNotFoundError(this.id).setResponse(response)
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
GetUserProfilePhotosRequest.queryMethod = 'getUserProfilePhotos'
GetUserProfilePhotosRequest.from = (parameters, context) => new GetUserProfilePhotosRequest(parameters, context)

module.exports = GetUserProfilePhotosRequest
