import Helper from '@darkwolf/helper.mjs'

export default class User {
  static from(data, context) {
    return new User(data, context)
  }

  static fromParams(params = {}, context) {
    return new User({
      id: params.id,
      bot: params.is_bot,
      firstName: params.first_name,
      lastName: params.last_name,
      username: params.username,
      canJoinGroups: params.can_join_groups,
      canReadAllGroupMessages: params.can_read_all_group_messages,
      supportsInlineQueries: params.supports_inline_queries,
      language: params.language_code
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setBot(data.bot)
      .setFirstName(data.firstName)
      .setLastName(data.lastName)
      .setUsername(data.username)
      .setCanJoinGroups(data.canJoinGroups)
      .setCanReadAllGroupMessages(data.canReadAllGroupMessages)
      .setSupportsInlineQueries(data.supportsInlineQueries)
      .setLanguage(data.language)
  }

  get isBot() {
    return !!this.bot
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setBot(boolean) {
    this.bot = boolean
    return this
  }

  setFirstName(firstName) {
    this.firstName = firstName
    return this
  }

  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  setCanJoinGroups(boolean) {
    this.canJoinGroups = boolean
    return this
  }

  setCanReadAllGroupMessages(boolean) {
    this.canReadAllGroupMessages = boolean
    return this
  }

  setSupportsInlineQueries(boolean) {
    this.supportsInlineQueries = boolean
    return this
  }

  setLanguage(language) {
    this.language = language
    return this
  }

  getProfilePhotos(options) {
    return this.context.telegramBot.getUserProfilePhotos(this.id, options)
  }

  uploadStickerFile(sticker) {
    return this.context.telegramBot.uploadStickerFile(this.id, sticker)
  }

  createNewStickerSet(name, title, sticker, emojis, options) {
    return this.context.telegramBot.createNewStickerSet(this.id, name, title, sticker, emojis, options)
  }

  createNewAnimatedStickerSet(name, title, sticker, emojis, options) {
    return this.context.telegramBot.createNewAnimatedStickerSet(this.id, name, title, sticker, emojis, options)
  }

  addStickerToSet(name, sticker, emojis, options) {
    return this.context.telegramBot.addStickerToSet(this.id, name, sticker, emojis, options)
  }

  addAnimatedStickerToSet(name, sticker, emojis, options) {
    return this.context.telegramBot.addAnimatedStickerToSet(this.id, name, sticker, emojis, options)
  }

  setStickerSetThumb(name, thumb) {
    return this.context.telegramBot.setStickerSetThumb(this.id, name, thumb)
  }

  removeStickerSetThumb(name) {
    return this.context.telegramBot.removeStickerSetThumb(this.id, name)
  }

  setPassportDataErrors(errors) {
    return this.context.telegramBot.setPassportDataErrors(this.id, errors)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (Helper.exists(this.bot)) {
      data.bot = this.bot
    }
    if (Helper.exists(this.firstName)) {
      data.firstName = this.firstName
    }
    if (Helper.exists(this.lastName)) {
      data.lastName = this.lastName
    }
    if (this.username) {
      data.username = this.username
    }
    if (Helper.exists(this.canJoinGroups)) {
      data.canJoinGroups = this.canJoinGroups
    }
    if (Helper.exists(this.canReadAllGroupMessages)) {
      data.canReadAllGroupMessages = this.canReadAllGroupMessages
    }
    if (Helper.exists(this.supportsInlineQueries)) {
      data.supportsInlineQueries = this.supportsInlineQueries
    }
    if (this.language) {
      data.language = this.language
    }
    return data
  }
}
