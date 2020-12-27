const Helper = require('@darkwolf/helper.cjs')
const types = require('./')
const constants = require('../constants')

class MessageEntity {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setValue(data.value)
      .setOffset(data.offset)
      .setLength(data.length)
      .setUrl(data.url)
      .setUser(data.user)
      .setLanguage(data.language)
  }

  get isMention() {
    return this.type === constants.MessageEntityType.MENTION
  }

  get isHashtag() {
    return this.type === constants.MessageEntityType.HASHTAG
  }

  get isCashtag() {
    return this.type === constants.MessageEntityType.CASHTAG
  }

  get isBotCommand() {
    return this.type === constants.MessageEntityType.BOT_COMMAND
  }

  get isUrl() {
    return this.type === constants.MessageEntityType.URL
  }

  get isEmail() {
    return this.type === constants.MessageEntityType.EMAIL
  }

  get isPhoneNumber() {
    return this.type === constants.MessageEntityType.PHONE_NUMBER
  }

  get isBold() {
    return this.type === constants.MessageEntityType.BOLD
  }

  get isItalic() {
    return this.type === constants.MessageEntityType.ITALIC
  }

  get isUnderline() {
    return this.type === constants.MessageEntityType.UNDERLINE
  }

  get isStrikethrough() {
    return this.type === constants.MessageEntityType.STRIKETHROUGH
  }

  get isCode() {
    return this.type === constants.MessageEntityType.CODE
  }

  get isPre() {
    return this.type === constants.MessageEntityType.PRE
  }

  get isTextLink() {
    return this.type === constants.MessageEntityType.TEXT_LINK
  }

  get isTextMention() {
    return this.type === constants.MessageEntityType.TEXT_MENTION
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setValue(value) {
    this.value = value
    return this
  }

  setOffset(offset) {
    this.offset = offset
    return this
  }

  setLength(length) {
    this.length = length
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setUser(user) {
    this.user = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setLanguage(language) {
    this.language = language
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      params.type = this.type
    }
    if (Helper.exists(this.offset)) {
      params.offset = this.offset
    }
    if (Helper.exists(this.length)) {
      params.length = this.length
    }
    if (this.url) {
      params.url = this.url
    }
    if (this.user) {
      params.user = this.user.toParams()
    }
    if (Helper.exists(this.language)) {
      params.language = this.language
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = type
    }
    if (Helper.exists(this.value)) {
      data.value = this.value
    }
    if (Helper.exists(this.offset)) {
      data.offset = this.offset
    }
    if (Helper.exists(this.length)) {
      data.length = this.length
    }
    if (this.url) {
      data.url = this.url
    }
    if (this.user) {
      data.user = this.user.toJSON()
    }
    if (Helper.exists(this.language)) {
      data.language = this.language
    }
    return data
  }
}
MessageEntity.from = (data, context) => new MessageEntity(data, context)
MessageEntity.fromParams = (params = {}, context = {}) => {
  const data = {
    type: params.type,
    offset: params.offset,
    length: params.length,
    url: params.url,
    user: params.user,
    language: params.language
  }
  if (Helper.exists(context.text)) {
    data.value = context.text.slice(data.offset, data.offset + data.length)
  }
  if (data.user) {
    data.user = types.User.fromParams(data.user, context)
  }
  return new MessageEntity(data, context)
}

module.exports = MessageEntity
