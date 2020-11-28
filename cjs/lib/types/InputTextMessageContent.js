const InputMessageContent = require('./InputMessageContent')

class InputTextMessageContent extends InputMessageContent {
  constructor(text, options) {
    super({
      ...options,
      text
    })
  }
}
InputTextMessageContent.from = (text, options) => new InputTextMessageContent(text, options)

module.exports = InputTextMessageContent
