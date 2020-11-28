const InputMessageContent = require('./InputMessageContent')

class InputContactMessageContent extends InputMessageContent {
  constructor(phoneNumber, firstName, options) {
    super({
      ...options,
      phoneNumber,
      firstName
    })
  }
}
InputContactMessageContent.from = (phoneNumber, firstName, options) => new InputContactMessageContent(phoneNumber, firstName, options)

module.exports = InputContactMessageContent
