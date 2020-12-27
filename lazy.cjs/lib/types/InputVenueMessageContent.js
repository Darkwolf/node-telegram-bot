const types = require('./')

class InputVenueMessageContent extends types.InputMessageContent {
  constructor(latitude, longitude, title, address, options) {
    super({
      ...options,
      latitude,
      longitude,
      title,
      address
    })
  }
}
InputVenueMessageContent.from = (latitude, longitude, title, address, options) => new InputVenueMessageContent(latitude, longitude, title, address, options)

module.exports = InputVenueMessageContent
