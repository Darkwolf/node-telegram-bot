const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class KeyboardButton {
  constructor(text, options = {}) {
    this
      .setText(text)
      .setRequestContact(options.requestContact)
      .setRequestLocation(options.requestLocation)
      .setRequestPoll(options.requestPoll)
  }

  setText(text) {
    this.text = text
    return this
  }

  setRequestContact(boolean) {
    this.requestContact = boolean
    return this
  }

  setRequestLocation(boolean) {
    this.requestLocation = boolean
    return this
  }

  setRequestPoll(type) {
    this.requestPoll = type ? (
      type instanceof types.KeyboardButtonPollType ? type : new types.KeyboardButtonPollType(type)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.text)) {
      params.text = `${this.text}`
    }
    if (Helper.exists(this.requestContact)) {
      params.request_contact = this.requestContact
    }
    if (Helper.exists(this.requestLocation)) {
      params.request_location = this.requestLocation
    }
    if (this.requestPoll) {
      params.request_poll = this.requestPoll.toParams()
    }
    return params
  }
}
KeyboardButton.from = (text, options) => new KeyboardButton(text, options)

module.exports = KeyboardButton
