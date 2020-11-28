import Helper from '@darkwolf/helper.mjs'
import KeyboardButtonPollType from './KeyboardButtonPollType.mjs'

export default class KeyboardButton {
  static from(text, options) {
    return new KeyboardButton(text, options)
  }

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
      type instanceof KeyboardButtonPollType ? type : new KeyboardButtonPollType(type)
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
