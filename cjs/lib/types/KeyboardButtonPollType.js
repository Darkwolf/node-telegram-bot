class KeyboardButtonPollType {
  constructor(options = {}) {
    this.setType(options.type)
  }

  setType(type) {
    this.type = type
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      params.type = this.type
    }
    return params
  }
}
KeyboardButtonPollType.from = options => new KeyboardButtonPollType(options)

module.exports = KeyboardButtonPollType
