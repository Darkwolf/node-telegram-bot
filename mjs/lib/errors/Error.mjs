import CustomError from '@darkwolf/custom-error.mjs'

export default class TelegramBotError extends CustomError {
  static name = 'TelegramBotError'

  constructor(message, code) {
    super(message, code)
    this.setName(TelegramBotError.name)
  }

  setRequest(request) {
    this.request = request
    return this
  }

  setResponse(response) {
    this.response = response
    return this
  }
}
