import InputMessageContent from './InputMessageContent.mjs'

export default class InputContactMessageContent extends InputMessageContent {
  static from(phoneNumber, firstName, options) {
    return new InputContactMessageContent(phoneNumber, firstName, options)
  }

  constructor(phoneNumber, firstName, options) {
    super({
      ...options,
      phoneNumber,
      firstName
    })
  }
}
