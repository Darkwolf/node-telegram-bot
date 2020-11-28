const CustomError = require('@darkwolf/custom-error.cjs')

class TelegramBotError extends CustomError {
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
TelegramBotError.name = 'TelegramBotError'

module.exports = TelegramBotError
