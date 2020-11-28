import { BadRequestError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class CloseRequest {
  static queryMethod = 'close'

  static from(context) {
    return new CloseRequest(context)
  }

  constructor(context) {
    this.queryMethod = CloseRequest.queryMethod
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
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
