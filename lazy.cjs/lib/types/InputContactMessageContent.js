const types = require('./')

class InputContactMessageContent extends types.InputMessageContent {
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
