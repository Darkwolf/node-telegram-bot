const Helper = require('@darkwolf/helper.cjs')
const { ChatType, ChatAction, ChatMemberStatus } = require('../constants')
const ChatPhoto = require('./ChatPhoto')
const ChatPermissions = require('./ChatPermissions')
const ChatLocation = require('./ChatLocation')

let _Message
const Message = () => {
  if (!_Message) {
    _Message = require('./Message')
  }
  return _Message
}

class Chat {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setUsername(data.username)
      .setPhoto(data.photo)
      .setFirstName(data.firstName)
      .setLastName(data.lastName)
      .setTitle(data.title)
      .setDescription(data.description)
      .setBio(data.bio)
      .setInviteLink(data.inviteLink)
      .setPinnedMessage(data.pinnedMessage)
      .setPermissions(data.permissions)
      .setSlowModeDelay(data.slowModeDelay)
      .setStickerSetName(data.stickerSetName)
      .setCanSetStickerSet(data.canSetStickerSet)
      .setLinkedChatId(data.linkedChatId)
      .setLocation(data.location)
  }

  get isPrivate() {
    return this.type === ChatType.PRIVATE
  }

  get isGroup() {
    return this.type === ChatType.GROUP
  }

  get isSupergroup() {
    return this.type === ChatType.SUPERGROUP
  }

  get isChannel() {
    return this.type === ChatType.CHANNEL
  }

  get isGroupLike() {
    return this.isGroup || this.isSupergroup
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  setPhoto(photo) {
    this.photo = photo ? (
      photo instanceof ChatPhoto ? photo : new ChatPhoto(photo, {
        ...this.context,
        chatId: this.id
      })
    ) : undefined
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

  setTitle(title) {
    this.title = title
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setBio(bio) {
    this.bio = bio
    return this
  }

  setInviteLink(link) {
    this.inviteLink = link
    return this
  }

  setPinnedMessage(message) {
    this.pinnedMessage = message ? (
      message instanceof Message() ? message : new (Message())(message, this.context)
    ) : undefined
    return this
  }

  setPermissions(permissions) {
    this.permissions = permissions ? (
      permissions instanceof ChatPermissions ? permissions : new ChatPermissions(permissions, {
        ...this.context,
        chatId: this.id
      })
    ) : undefined
    return this
  }

  setSlowModeDelay(delay) {
    this.slowModeDelay = delay
    return this
  }

  setStickerSetName(name) {
    this.stickerSetName = name
    return this
  }

  setCanSetStickerSet(boolean) {
    this.canSetStickerSet = boolean
    return this
  }

  setLinkedChatId(id) {
    this.linkedChatId = id
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof ChatLocation ? location : new ChatLocation(location, this.context)
    ) : undefined
    return this
  }

  sendMessage(text, options) {
    return this.context.telegramBot.sendMessage(this.id, text, options)
  }

  forwardMessage(id, chatId, options) {
    return this.context.telegramBot.forwardMessage(this.id, id, chatId, options)
  }

  forwardMessageFromAnotherChat(chatId, messageId, options) {
    return this.context.telegramBot.forwardMessage(chatId, messageId, this.id, options)
  }

  forwardMessageToCurrentChat(id, options) {
    return this.context.telegramBot.forwardMessage(this.id, id, this.id, options)
  }

  copyMessage(id, chatId, options) {
    return this.context.telegramBot.copyMessage(this.id, id, chatId, options)
  }

  copyMessageFromAnotherChat(chatId, messageId, options) {
    return this.context.telegramBot.copyMessage(chatId, messageId, this.id, options)
  }

  copyMessageToCurrentChat(id, options) {
    return this.context.telegramBot.copyMessage(this.id, id, this.id, options)
  }

  sendPhoto(photo, options) {
    return this.context.telegramBot.sendPhoto(this.id, photo, options)
  }

  sendAudio(audio, options) {
    return this.context.telegramBot.sendAudio(this.id, audio, options)
  }

  sendDocument(document, options) {
    return this.context.telegramBot.sendDocument(this.id, document, options)
  }

  sendVideo(video, options) {
    return this.context.telegramBot.sendVideo(this.id, video, options)
  }

  sendAnimation(animation, options) {
    return this.context.telegramBot.sendAnimation(this.id, animation, options)
  }

  sendVoice(voice, options) {
    return this.context.telegramBot.sendVoice(this.id, voice, options)
  }

  sendVideoNote(videoNote, options) {
    return this.context.telegramBot.sendVideoNote(this.id, videoNote, options)
  }

  sendMediaGroup(media, options) {
    return this.context.telegramBot.sendMediaGroup(this.id, media, options)
  }

  sendLocation(latitude, longitude, options) {
    return this.context.telegramBot.sendLocation(this.id, latitude, longitude, options)
  }

  editMessageLiveLocation(id, latitude, longitude, options) {
    return this.context.telegramBot.editMessageLiveLocation(this.id, id, latitude, longitude, options)
  }

  stopMessageLiveLocation(id, options) {
    return this.context.telegramBot.stopMessageLiveLocation(this.id, id, options)
  }

  sendVenue(latitude, longitude, title, address, options) {
    return this.context.telegramBot.sendVenue(this.id, latitude, longitude, title, address, options)
  }

  sendContact(phoneNumber, firstName, options) {
    return this.context.telegramBot.sendContact(this.id, phoneNumber, firstName, options)
  }

  sendPoll(question, pollOptions, options) {
    return this.context.telegramBot.sendPoll(this.id, question, pollOptions, options)
  }

  sendQuizPoll(question, pollOptions, correctOptionId, options) {
    return this.context.telegramBot.sendQuizPoll(this.id, question, pollOptions, correctOptionId, options)
  }

  sendDice(options) {
    return this.context.telegramBot.sendDice(this.id, options)
  }

  sendDartsDice(options) {
    return this.context.telegramBot.sendDartsDice(this.id, options)
  }

  sendBasketballDice(options) {
    return this.context.telegramBot.sendBasketballDice(this.id, options)
  }

  sendFootballDice(options) {
    return this.context.telegramBot.sendFootballDice(this.id, options)
  }

  sendSlotMachineDice(options) {
    return this.context.telegramBot.sendSlotMachineDice(this.id, options)
  }

  sendAction(action) {
    return this.context.telegramBot.sendChatAction(this.id, action)
  }

  sendActionTyping() {
    return this.context.telegramBot.sendChatActionTyping(this.id)
  }

  sendActionUploadPhoto() {
    return this.context.telegramBot.sendChatActionUploadPhoto(this.id)
  }

  sendActionRecordVideo() {
    return this.context.telegramBot.sendChatActionRecordVideo(this.id)
  }

  sendActionUploadVideo() {
    return this.context.telegramBot.sendChatActionUploadVideo(this.id)
  }

  sendActionRecordAudio() {
    return this.context.telegramBot.sendChatActionRecordAudio(this.id)
  }

  sendActionUploadAudio() {
    return this.context.telegramBot.sendChatActionUploadAudio(this.id)
  }

  sendActionUploadDocument() {
    return this.context.telegramBot.sendChatActionUploadDocument(this.id)
  }

  sendActionFindLocation() {
    return this.context.telegramBot.sendChatActionFindLocation(this.id)
  }

  sendActionRecordVideoNote() {
    return this.context.telegramBot.sendChatActionRecordVideoNote(this.id)
  }

  sendActionUploadVideoNote() {
    return this.context.telegramBot.sendChatActionUploadVideoNote(this.id)
  }

  kickMember(id, options) {
    return this.context.telegramBot.kickChatMember(this.id, id, options)
  }

  banMember(id, options) {
    return this.context.telegramBot.banChatMember(this.id, id, options)
  }

  unbanMember(id, options) {
    return this.context.telegramBot.unbanChatMember(this.id, id, options)
  }

  restrictMember(id, permissions, options) {
    return this.context.telegramBot.restrictChatMember(this.id, id, permissions, options)
  }

  promoteMember(id, options) {
    return this.context.telegramBot.promoteChatMember(this.id, id, options)
  }

  setAdminCustomTitle(id, title) {
    return this.context.telegramBot.setChatAdminCustomTitle(this.id, id, title)
  }

  removeAdminCustomTitle(id) {
    return this.context.telegramBot.removeChatAdminCustomTitle(this.id, id)
  }

  setNewPermissions(permissions) {
    return this.context.telegramBot.setChatPermissions(this.id, permissions)
  }

  exportInviteLink() {
    return this.context.telegramBot.exportChatInviteLink(this.id)
  }

  setNewPhoto(photo) {
    return this.context.telegramBot.setChatPhoto(this.id, photo)
  }

  deletePhoto() {
    return this.context.telegramBot.deleteChatPhoto(this.id)
  }

  setNewTitle(title) {
    return this.context.telegramBot.setChatTitle(this.id, title)
  }

  removeTitle() {
    return this.context.telegramBot.removeChatTitle(this.id)
  }

  setNewDescription(description) {
    return this.context.telegramBot.setChatDescription(this.id, description)
  }

  removeDescription() {
    return this.context.telegramBot.removeChatDescription(this.id)
  }

  pinMessage(id, options) {
    return this.context.telegramBot.pinChatMessage(this.id, id, options)
  }

  unpinMessage(messageId) {
    return this.context.telegramBot.unpinChatMessage(this.id, messageId)
  }

  unpinAllMessages() {
    return this.context.telegramBot.unpinAllChatMessages(this.id)
  }

  leave() {
    return this.context.telegramBot.leaveChat(this.id)
  }

  get() {
    return this.context.telegramBot.getChat(this.id)
  }

  getAdmins() {
    return this.context.telegramBot.getChatAdmins(this.id)
  }

  getMembersCount() {
    return this.context.telegramBot.getChatMembersCount(this.id)
  }

  getMember(id) {
    return this.context.telegramBot.getChatMember(this.id, id)
  }

  setStickerSet(name) {
    return this.context.telegramBot.setChatStickerSet(this.id, name)
  }

  deleteStickerSet() {
    return this.context.telegramBot.deleteChatStickerSet(this.id)
  }

  editMessageText(id, text, options) {
    return this.context.telegramBot.editMessageText(this.id, id, text, options)
  }

  removeMessageText(id, options) {
    return this.context.telegramBot.removeMessageText(this.id, id, options)
  }

  editMessageCaption(id, caption, options) {
    return this.context.telegramBot.editMessageCaption(this.id, id, caption, options)
  }

  removeMessageCaption(id, options) {
    return this.context.telegramBot.removeMessageCaption(this.id, id, options)
  }

  editMessageMedia(id, media, options) {
    return this.context.telegramBot.editMessageMedia(this.id, id, media, options)
  }

  editMessageReplyMarkup(id, replyMarkup) {
    return this.context.telegramBot.editMessageReplyMarkup(this.id, id, replyMarkup)
  }

  removeMessageReplyMarkup(id) {
    return this.context.telegramBot.removeMessageReplyMarkup(this.id, id)
  }

  stopPoll(messageId, options) {
    return this.context.telegramBot.stopPoll(this.id, messageId, options)
  }

  deleteMessage(id) {
    return this.context.telegramBot.deleteMessage(this.id, id)
  }

  sendSticker(sticker, options) {
    return this.context.telegramBot.sendSticker(this.id, sticker, options)
  }

  sendInvoice(providerToken, title, description, currency, prices, payload, startParameter, options) {
    return this.context.telegramBot.sendInvoice(this.id, providerToken, title, description, currency, prices, payload, startParameter, options)
  }

  sendGame(gameShortName, options) {
    return this.context.telegramBot.sendGame(this.id, gameShortName, options)
  }

  setGameScore(messageId, userId, score, options) {
    return this.context.telegramBot.setGameScore(this.id, messageId, userId, score, options)
  }

  getGameHighScores(messageId, userId) {
    return this.context.telegramBot.getGameHighScores(this.id, messageId, userId)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.username) {
      data.username = this.username
    }
    if (this.photo) {
      data.photo = this.photo.toJSON()
    }
    if (Helper.exists(this.firstName)) {
      data.firstName = this.firstName
    }
    if (Helper.exists(this.lastName)) {
      data.lastName = this.lastName
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (Helper.exists(this.bio)) {
      data.bio = this.bio
    }
    if (this.inviteLink) {
      data.inviteLink = this.inviteLink
    }
    if (this.pinnedMessage) {
      data.pinnedMessage = this.pinnedMessage.toJSON()
    }
    if (this.permissions) {
      data.permissions = this.permissions.toJSON()
    }
    if (Helper.exists(this.slowModeDelay)) {
      data.slowModeDelay = this.slowModeDelay
    }
    if (this.stickerSetName) {
      data.stickerSetName = this.stickerSetName
    }
    if (Helper.exists(this.canSetStickerSet)) {
      data.canSetStickerSet = this.canSetStickerSet
    }
    if (this.linkedChatId) {
      data.linkedChatId = this.linkedChatId
    }
    if (this.location) {
      data.location = this.location.toJSON()
    }
    return data
  }
}
Chat.from = (data, context) => new Chat(data, context)
Chat.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    type: params.type,
    username: params.username,
    photo: params.photo,
    firstName: params.first_name,
    lastName: params.last_name,
    title: params.title,
    description: params.description,
    bio: params.bio,
    inviteLink: params.invite_link,
    pinnedMessage: params.pinned_message,
    permissions: params.permissions,
    slowModeDelay: params.slow_mode_delay,
    stickerSetName: params.sticker_set_name,
    canSetStickerSet: params.can_set_sticker_set,
    linkedChatId: params.linked_chat_id,
    location: params.location
  }
  if (data.photo) {
    data.photo = ChatPhoto.fromParams(data.photo, {
      ...context,
      chatId: data.id
    })
  }
  if (data.pinnedMessage) {
    data.pinnedMessage = Message().fromParams(data.pinnedMessage, context)
  }
  if (data.permissions) {
    data.permissions = ChatPermissions.fromParams(data.permissions, {
      ...context,
      chatId: data.id
    })
  }
  if (data.location) {
    data.location = ChatLocation.fromParams(data.location, {
      ...context,
      chatId: data.id
    })
  }
  return new Chat(data, context)
}

module.exports = Chat
