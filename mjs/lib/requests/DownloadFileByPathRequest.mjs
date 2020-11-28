import { BadRequestError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DownloadFileByPathRequest {
  static from(parameters, context) {
    return new DownloadFileByPathRequest(parameters, context)
  }

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
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new BadRequestError(response.description).setResponse(response)
        this.context.telegramBot.emit(EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
