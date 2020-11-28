const Helper = require('@darkwolf/helper.cjs')
const User = require('./User')
const Message = require('./Message')

class CallbackQuery {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setFrom(data.from)
      .setMessage(data.message)
      .setInlineMessageId(data.inlineMessageId)
      .setChatInstance(data.chatInstance)
      .setData(data.data)
      .setGameShortName(data.gameShortName)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setMessage(message) {
    this.message = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setInlineMessageId(id) {
    this.inlineMessageId = id
    return this
  }

  setChatInstance(id) {
    this.chatInstance = id
    return this
  }

  setData(data) {
    this.data = data
    return this
  }

  setGameShortName(name) {
    this.gameShortName = name
    return this
  }

  answer(options) {
    return this.context.telegramBot.answerCallbackQuery(this.id, options)
  }

  editInlineMessageText(text, options) {
    return this.context.telegramBot.editInlineMessageText(this.inlineMessageId, text, options)
  }

  removeInlineMessageText(options) {
    return this.context.telegramBot.removeInlineMessageText(this.inlineMessageId, options)
  }

  editInlineMessageCaption(caption, options) {
    return this.context.telegramBot.editInlineMessageCaption(this.inlineMessageId, caption, options)
  }

  removeInlineMessageCaption(options) {
    return this.context.telegramBot.removeInlineMessageCaption(this.inlineMessageId, options)
  }

  editInlineMessageMedia(media, options) {
    return this.context.telegramBot.editInlineMessageMedia(this.inlineMessageId, media, options)
  }

  editInlineMessageReplyMarkup(replyMarkup) {
    return this.context.telegramBot.editInlineMessageReplyMarkup(this.inlineMessageId, replyMarkup)
  }

  removeInlineMessageReplyMarkup() {
    return this.context.telegramBot.removeInlineMessageReplyMarkup(this.inlineMessageId)
  }

  setInlineGameScore(userId, score, options) {
    return this.context.telegramBot.setInlineGameScore(this.inlineMessageId, userId, score, options)
  }

  getInlineGameHighScores(userId) {
    return this.context.telegramBot.getInlineGameHighScores(this.inlineMessageId, userId)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.message) {
      data.message = this.message.toJSON()
    }
    if (this.inlineMessageId) {
      data.inlineMessageId = this.inlineMessageId
    }
    if (this.chatInstance) {
      data.chatInstance = this.chatInstance
    }
    if (Helper.exists(this.data)) {
      data.data = this.data
    }
    if (this.gameShortName) {
      data.gameShortName = this.gameShortName
    }
    return data
  }
}
CallbackQuery.from = (data, context) => new CallbackQuery(data, context)
CallbackQuery.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    from: params.from,
    message: params.message,
    inlineMessageId: params.inline_message_id,
    chatInstance: params.chat_instance,
    data: params.data,
    gameShortName: params.game_short_name
  }
  if (data.from) {
    data.from = User.fromParams(data.from, context)
  }
  if (data.message) {
    data.message = Message.fromParams(data.message, context)
  }
  return new CallbackQuery(data, context)
}

module.exports = CallbackQuery
