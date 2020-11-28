import InputMessageContent from './InputMessageContent.mjs'

export default class InputTextMessageContent extends InputMessageContent {
  static from(text, options) {
    return new InputTextMessageContent(text, options)
  }

  constructor(text, options) {
    super({
      ...options,
      text
    })
  }
}
