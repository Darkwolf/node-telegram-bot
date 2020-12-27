const errors = require('../errors')
const constants = require('../constants')

class DownloadFileByPathRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setPath(parameters.path)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPath(path) {
    this.path = path
    return this
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
DownloadFileByPathRequest.from = (parameters, context) => new DownloadFileByPathRequest(parameters, context)

module.exports = DownloadFileByPathRequest
