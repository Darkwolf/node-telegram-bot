import InputMessageContent from './InputMessageContent.mjs'

export default class InputLocationMessageContent extends InputMessageContent {
  static from(latitude, longitude, options) {
    return new InputLocationMessageContent(latitude, longitude, options)
  }

  constructor(latitude, longitude, options) {
    super({
      ...options,
      latitude,
      longitude
    })
  }
}
