const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class InlineKeyboardButton {
  constructor(text, options = {}, context) {
    this
      .setContext(context)
      .setText(text)
      .setUrl(options.url)
      .setLoginUrl(options.loginUrl)
      .setCallbackData(options.callbackData)
      .setSwitchInlineQuery(options.switchInlineQuery)
      .setSwitchInlineQueryCurrentChat(options.switchInlineQueryCurrentChat)
      .setCallbackGame(options.callbackGame)
      .setPay(options.pay)
  }

  get isPay() {
    return !!this.pay
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setLoginUrl(loginUrl) {
    this.loginUrl = loginUrl ? (
      loginUrl instanceof types.LoginUrl ? loginUrl : new types.LoginUrl(loginUrl.url, loginUrl, this.context)
    ) : undefined
    return this
  }

  setCallbackData(data) {
    this.callbackData = data
    return this
  }

  setSwitchInlineQuery(query) {
    this.switchInlineQuery = query
    return this
  }

  setSwitchInlineQueryCurrentChat(query) {
    this.switchInlineQueryCurrentChat = query
    return this
  }

  setCallbackGame(callbackGame) {
    this.callbackGame = callbackGame ? (
      callbackGame instanceof types.CallbackGame ? callbackGame : new types.CallbackGame(callbackGame)
    ) : undefined
    return this
  }

  setPay(boolean) {
    this.pay = boolean
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.text)) {
      params.text = `${this.text}`
    }
    if (this.url) {
      params.url = this.url
    }
    if (this.loginUrl) {
      params.login_url = this.loginUrl.toParams()
    }
    if (Helper.exists(this.callbackData)) {
      params.callback_data = this.callbackData
    }
    if (Helper.exists(this.switchInlineQuery)) {
      params.switch_inline_query = this.switchInlineQuery
    }
    if (Helper.exists(this.switchInlineQueryCurrentChat)) {
      params.switch_inline_query_current_chat = this.switchInlineQueryCurrentChat
    }
    if (this.callbackGame) {
      params.callback_game = this.callbackGame.toParams()
    }
    if (Helper.exists(this.pay)) {
      params.pay = this.pay
    }
    return params
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (this.url) {
      data.url = this.url
    }
    if (this.loginUrl) {
      data.loginUrl = this.loginUrl.toJSON()
    }
    if (Helper.exists(this.callbackData)) {
      data.callbackData = this.callbackData
    }
    if (Helper.exists(this.switchInlineQuery)) {
      data.switchInlineQuery = this.switchInlineQuery
    }
    if (Helper.exists(this.switchInlineQueryCurrentChat)) {
      data.switchInlineQueryCurrentChat = this.switchInlineQueryCurrentChat
    }
    if (this.callbackGame) {
      data.callbackGame = this.callbackGame.toJSON()
    }
    if (Helper.exists(this.pay)) {
      data.pay = this.pay
    }
    return data
  }
}
InlineKeyboardButton.from = (text, options, context) => new InlineKeyboardButton(text, options, context)
InlineKeyboardButton.fromParams = (params = {}, context) => {
  const data = {
    text: params.text,
    url: params.url,
    loginUrl: params.login_url,
    callbackData: params.callback_data,
    switchInlineQuery: params.switch_inline_query,
    switchInlineQueryCurrentChat: params.switch_inline_query_current_chat,
    callbackGame: params.callback_game,
    pay: params.pay
  }
  if (data.loginUrl) {
    data.loginUrl = types.LoginUrl.fromParams(data.loginUrl, context)
  }
  if (data.callbackGame) {
    data.callbackGame = types.CallbackGame.fromParams(data.callbackGame)
  }
  return new InlineKeyboardButton(data.text, data, context)
}

module.exports = InlineKeyboardButton
