export default class KeyboardButtonPollType {
  static from(options) {
    return new KeyboardButtonPollType(options)
  }

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
