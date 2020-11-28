import InputMessageContent from './InputMessageContent.mjs'

export default class InputVenueMessageContent extends InputMessageContent {
  static from(latitude, longitude, title, address, options) {
    return new InputVenueMessageContent(latitude, longitude, title, address, options)
  }

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
