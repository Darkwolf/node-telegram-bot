const types = require('./')

class InputLocationMessageContent extends types.InputMessageContent {
  constructor(latitude, longitude, options) {
    super({
      ...options,
      latitude,
      longitude
    })
  }
}
InputLocationMessageContent.from = (latitude, longitude, options) => new InputLocationMessageContent(latitude, longitude, options)

module.exports = InputLocationMessageContent
