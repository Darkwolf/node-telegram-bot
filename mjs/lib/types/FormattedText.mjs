import Text from '@darkwolf/text.mjs'

export default class FormattedText extends Text {
  static from(text) {
    return new FormattedText(text)
  }

  constructor(text) {
    super(text)
  }

  clone() {
    return new FormattedText(this.value)
  }
}
