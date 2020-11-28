import Helper from '@darkwolf/helper.mjs'

export default class LoginUrl {
  static from(text, options, context) {
    return new LoginUrl(text, options, context)
  }

  static fromParams(params = {}, context) {
    return new LoginUrl({
      url: params.url,
      forwardText: params.forward_text,
      botUsername: params.bot_username,
      requestWriteAccess: params.request_write_access
    }, context)
  }

  constructor(url, options = {}, context) {
    this
      .setContext(context)
      .setUrl(url)
      .setForwardText(options.forwardText)
      .setBotUsername(options.botUsername)
      .setRequestWriteAccess(options.requestWriteAccess)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setForwardText(text) {
    this.forwardText = text
    return this
  }

  setBotUsername(username) {
    this.botUsername = username
    return this
  }

  setRequestWriteAccess(boolean) {
    this.requestWriteAccess = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.url) {
      params.url = this.url
    }
    if (Helper.exists(this.forwardText)) {
      params.forward_text = this.forwardText
    }
    if (this.botUsername) {
      params.bot_username = this.botUsername
    }
    if (Helper.exists(this.requestWriteAccess)) {
      params.request_write_access = this.requestWriteAccess
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.url) {
      data.url = this.url
    }
    if (Helper.exists(this.forwardText)) {
      data.forwardText = this.forwardText
    }
    if (this.botUsername) {
      data.botUsername = this.botUsername
    }
    if (Helper.exists(this.requestWriteAccess)) {
      data.requestWriteAccess = this.requestWriteAccess
    }
    return data
  }
}
