const types = require('./')

class InputTextMessageContent extends types.InputMessageContent {
  constructor(text, options) {
    super({
      ...options,
      text
    })
  }
}
InputTextMessageContent.from = (text, options) => new InputTextMessageContent(text, options)

module.exports = InputTextMessageContent
