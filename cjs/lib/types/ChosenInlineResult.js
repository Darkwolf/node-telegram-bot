const Helper = require('@darkwolf/helper.cjs')
const User = require('./User')
const Location = require('./Location')

class ChosenInlineResult {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setFrom(data.from)
      .setLocation(data.location)
      .setInlineMessageId(data.inlineMessageId)
      .setQuery(data.query)
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

  setLocation(location) {
    this.location = location ? (
      location instanceof Location ? location : new Location(location)
    ) : undefined
    return this
  }

  setInlineMessageId(id) {
    this.inlineMessageId = id
    return this
  }

  setQuery(query) {
    this.query = query
    return this
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
    if (this.location) {
      data.location = this.location.toJSON()
    }
    if (this.inlineMessageId) {
      data.inlineMessageId = this.inlineMessageId
    }
    if (Helper.exists(this.query)) {
      data.query = this.query
    }
    return data
  }
}
ChosenInlineResult.from = (data, context) => new ChosenInlineResult(data, context)
ChosenInlineResult.fromParams = (params = {}, context) => {
  const data = {
    id: params.result_id,
    from: params.from,
    location: params.location,
    inlineMessageId: params.inline_message_id,
    query: params.query
  }
  if (data.from) {
    data.from = User.fromParams(data.from, context)
  }
  if (data.location) {
    data.location = Location.fromParams(data.location)
  }
  return new ChosenInlineResult(data, context)
}

module.exports = ChosenInlineResult
