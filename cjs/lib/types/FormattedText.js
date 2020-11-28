const Text = require('@darkwolf/text.cjs')

class FormattedText extends Text {
  constructor(text) {
    super(text)
  }

  clone() {
    return new FormattedText(this.value)
  }
}
FormattedText.from = text => new FormattedText(text)

module.exports = FormattedText
