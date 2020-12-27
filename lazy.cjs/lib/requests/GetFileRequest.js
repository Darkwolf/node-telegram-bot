const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetFileRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = GetFileRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.file_id = this.id
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(types.File.fromParams(response.result, this.context))
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: file not found': {
                error = new errors.FileNotFoundError(this.id).setResponse(response)
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
GetFileRequest.queryMethod = 'getFile'
GetFileRequest.from = (parameters, context) => new GetFileRequest(parameters, context)

module.exports = GetFileRequest
