const Helper = require('@darkwolf/helper.cjs')
const types = require('./')
const constants = require('../constants')

class Message {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setFrom(data.from)
      .setSenderChat(data.senderChat)
      .setChat(data.chat)
      .setSenderChat(data.senderChat)
      .setForwardFrom(data.forwardFrom)
      .setForwardFromChat(data.forwardFromChat)
      .setForwardFromMessageId(data.forwardFromMessageId)
      .setForwardSignature(data.forwardSignature)
      .setForwardSenderName(data.forwardSenderName)
      .setForwardDate(data.forwardDate)
      .setReplyToMessage(data.replyToMessage)
      .setViaBot(data.viaBot)
      .setEditDate(data.editDate)
      .setMediaGroupId(data.mediaGroupId)
      .setAuthorSignature(data.authorSignature)
      .setText(data.text)
      .setEntities(data.entities)
      .setAnimation(data.animation)
      .setAudio(data.audio)
      .setDocument(data.document)
      .setPhoto(data.photo)
      .setSticker(data.sticker)
      .setVideo(data.video)
      .setVideoNote(data.videoNote)
      .setVoice(data.voice)
      .setCaption(data.caption)
      .setCaptionEntities(data.captionEntities)
      .setContact(data.contact)
      .setDice(data.dice)
      .setGame(data.game)
      .setPoll(data.poll)
      .setVenue(data.venue)
      .setLocation(data.location)
      .setNewChatMembers(data.newChatMembers)
      .setLeftChatMember(data.leftChatMember)
      .setNewChatTitle(data.newChatTitle)
      .setNewChatPhoto(data.newChatPhoto)
      .setChatPhotoDeleted(data.chatPhotoDeleted)
      .setGroupChatCreated(data.groupChatCreated)
      .setSupergroupChatCreated(data.supergroupChatCreated)
      .setChannelChatCreated(data.channelChatCreated)
      .setMigrateFromChatId(data.migrateFromChatId)
      .setMigrateToChatId(data.migrateToChatId)
      .setPinnedMessage(data.pinnedMessage)
      .setInvoice(data.invoice)
      .setSuccessfulPayment(data.successfulPayment)
      .setConnectedWebsite(data.connectedWebsite)
      .setPassportData(data.passportData)
      .setProximityAlertTriggered(data.proximityAlertTriggered)
      .setReplyMarkup(data.replyMarkup)
      .setDate(data.date)
  }

  get isText() {
    return this.type === constants.MessageType.TEXT
  }

  get isAnimation() {
    return this.type === constants.MessageType.ANIMATION
  }

  get isAudio() {
    return this.type === constants.MessageType.AUDIO
  }

  get isDocument() {
    return this.type === constants.MessageType.DOCUMENT
  }

  get isPhoto() {
    return this.type === constants.MessageType.PHOTO
  }

  get isSticker() {
    return this.type === constants.MessageType.STICKER
  }

  get isVideo() {
    return this.type === constants.MessageType.VIDEO
  }

  get isVideoNote() {
    return this.type === constants.MessageType.VIDEO_NOTE
  }

  get isVoice() {
    return this.type === constants.MessageType.VOICE
  }

  get isContact() {
    return this.type === constants.MessageType.CONTACT
  }

  get isDice() {
    return this.type === constants.MessageType.DICE
  }

  get isGame() {
    return this.type === constants.MessageType.GAME
  }

  get isPoll() {
    return this.type === constants.MessageType.POLL
  }

  get isVenue() {
    return this.type === constants.MessageType.VENUE
  }

  get isLocation() {
    return this.type === constants.MessageType.LOCATION
  }

  get isNewChatMembers() {
    return this.type === constants.MessageType.NEW_CHAT_MEMBERS
  }

  get isMemberLeftChat() {
    return this.type === constants.MessageType.MEMBER_LEFT_CHAT
  }

  get isNewChatTitle() {
    return this.type === constants.MessageType.NEW_CHAT_TITLE
  }

  get isNewChatPhoto() {
    return this.type === constants.MessageType.NEW_CHAT_PHOTO
  }

  get isChatPhotoDeleted() {
    return this.type === constants.MessageType.CHAT_PHOTO_DELETED
  }

  get isGroupChatCreated() {
    return this.type === constants.MessageType.GROUP_CHAT_CREATED
  }

  get isSupergroupChatCreated() {
    return this.type === constants.MessageType.SUPERGROUP_CHAT_CREATED
  }

  get isChannelChatCreated() {
    return this.type === constants.MessageType.CHANNEL_CHAT_CREATED
  }

  get isChatMigrated() {
    return this.type === constants.MessageType.CHAT_MIGRATED
  }

  get isMigratedFromChat() {
    return this.type === constants.MessageType.MIGRATED_FROM_CHAT
  }

  get isPinned() {
    return this.type === constants.MessageType.PINNED
  }

  get isInvoice() {
    return this.type === constants.MessageType.INVOICE
  }

  get isSuccessfulPayment() {
    return this.type === constants.MessageType.SUCCESSFUL_PAYMENT
  }

  get isUserLogged() {
    return this.type === constants.MessageType.USER_LOGGED
  }

  get isPassportData() {
    return this.type === constants.MessageType.PASSPORT_DATA
  }

  get isProximityAlertTriggered() {
    return this.type === constants.MessageType.PROXIMITY_ALERT_TRIGGERED
  }

  get isForward() {
    return this.type === constants.MessageType.FORWARD
  }

  get isMedia() {
    return (
      this.isAnimation ||
      this.isDocument ||
      this.isAudio ||
      this.isPhoto ||
      this.isVideo
    )
  }

  get isService() {
    return (
      this.isNewChatMembers ||
      this.isMemberLeftChat ||
      this.isNewChatTitle ||
      this.isNewChatPhoto ||
      this.isChatPhotoDeleted ||
      this.isGroupChatCreated ||
      this.isSupergroupChatCreated ||
      this.isChannelChatCreated ||
      this.isChatMigrated ||
      this.isMigratedFromChat ||
      this.isProximityAlertTriggered
    )
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

  setFrom(user) {
    this.from = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setSenderChat(chat) {
    this.senderChat = chat ? (
      chat instanceof types.Chat ? chat : new types.Chat(chat, this.context)
    ) : undefined
    return this
  }

  setChat(chat) {
    this.chat = chat ? (
      chat instanceof types.Chat ? chat : new types.Chat(chat, this.context)
    ) : undefined
    return this
  }

  setForwardFrom(user) {
    this.forwardFrom = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setForwardFromChat(chat) {
    this.forwardFromChat = chat ? (
      chat instanceof types.Chat ? chat : new types.Chat(chat, this.context)
    ) : undefined
    return this
  }

  setForwardFromMessageId(id) {
    this.forwardFromMessageId = id
    return this
  }

  setForwardSignature(signature) {
    this.forwardSignature = signature
    return this
  }

  setForwardSenderName(name) {
    this.forwardSenderName = name
    return this
  }

  setForwardDate(date) {
    this.forwardDate = date
    return this
  }

  setReplyToMessage(message) {
    this.replyToMessage = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setViaBot(user) {
    this.viaBot = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setEditDate(date) {
    this.editDate = date
    return this
  }

  setMediaGroupId(id) {
    this.mediaGroupId = id
    return this
  }

  setAuthorSignature(signature) {
    this.authorSignature = signature
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setEntities(entities) {
    this.entities = entities ? entities.map(entity =>
      entity instanceof types.MessageEntity ? entity : new types.MessageEntity(entity, this.context)
    ) : undefined
    return this
  }

  setAnimation(animation) {
    this.animation = animation ? (
      animation instanceof types.Animation ? animation : new types.Animation(animation, this.context)
    ) : undefined
    return this
  }

  setAudio(audio) {
    this.audio = audio ? (
      audio instanceof types.Audio ? audio : new types.Audio(audio, this.context)
    ) : undefined
    return this
  }

  setDocument(document) {
    this.document = document ? (
      document instanceof types.Document ? document : new types.Document(document, this.context)
    ) : undefined
    return this
  }

  setPhoto(photo) {
    this.photo = photo ? photo.map(photo =>
      photo instanceof types.PhotoSize ? photo : new types.PhotoSize(photo, this.context)
    ) : undefined
    return this
  }

  setSticker(sticker) {
    this.sticker = sticker ? (
      sticker instanceof types.Sticker ? sticker : new types.Sticker(sticker, this.context)
    ) : undefined
    return this
  }

  setVideo(video) {
    this.video = video ? (
      video instanceof types.Video ? video : new types.Video(video, this.context)
    ) : undefined
    return this
  }

  setVideoNote(videoNote) {
    this.videoNote = videoNote ? (
      videoNote instanceof types.VideoNote ? videoNote : new types.VideoNote(videoNote, this.context)
    ) : undefined
    return this
  }

  setVoice(voice) {
    this.voice = voice ? (
      voice instanceof types.Voice ? voice : new types.Voice(voice, this.context)
    ) : undefined
    return this
  }

  setCaption(caption) {
    this.caption = caption
    return this
  }

  setCaptionEntities(entities) {
    this.captionEntities = entities ? entities.map(entity =>
      entity instanceof types.MessageEntity ? entity : new types.MessageEntity(entity, this.context)
    ) : undefined
    return this
  }

  setContact(contact) {
    this.contact = contact ? (
      contact instanceof types.Contact ? contact : new types.Contact(contact, this.context)
    ) : undefined
    return this
  }

  setDice(dice) {
    this.dice = dice ? (
      dice instanceof types.Dice ? dice : new types.Dice(dice, this.context)
    ) : undefined
    return this
  }

  setGame(game) {
    this.game = game ? (
      game instanceof types.Game ? game : new types.Game(game, this.context)
    ) : undefined
    return this
  }

  setPoll(poll) {
    this.poll = poll ? (
      poll instanceof types.Poll ? poll : new types.Poll(poll, this.context)
    ) : undefined
    return this
  }

  setVenue(venue) {
    this.venue = venue ? (
      venue instanceof types.Venue ? venue : new types.Venue(venue, this.context)
    ) : undefined
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof types.Location ? location : new types.Location(location)
    ) : undefined
    return this
  }

  setNewChatMembers(users) {
    this.newChatMembers = users ? users.map(user =>
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setLeftChatMember(user) {
    this.leftChatMember = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setNewChatTitle(title) {
    this.newChatTitle = title
    return this
  }

  setNewChatPhoto(photo) {
    this.newChatPhoto = photo ? photo.map(photo =>
      photo instanceof types.PhotoSize ? photo : new types.PhotoSize(photo, this.context)
    ) : undefined
    return this
  }

  setChatPhotoDeleted(boolean) {
    this.chatPhotoDeleted = boolean
    return this
  }

  setGroupChatCreated(boolean) {
    this.groupChatCreated = boolean
    return this
  }

  setSupergroupChatCreated(boolean) {
    this.supergroupChatCreated = boolean
    return this
  }

  setChannelChatCreated(boolean) {
    this.channelChatCreated = boolean
    return this
  }

  setMigrateFromChatId(id) {
    this.migrateFromChatId = id
    return this
  }

  setMigrateToChatId(id) {
    this.migrateToChatId = id
    return this
  }

  setPinnedMessage(message) {
    this.pinnedMessage = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setInvoice(invoice) {
    this.invoice = invoice ? (
      invoice instanceof types.Invoice ? invoice : new types.Invoice(invoice, this.context)
    ) : undefined
    return this
  }

  setSuccessfulPayment(successfulPayment) {
    this.successfulPayment = successfulPayment ? (
      successfulPayment instanceof types.SuccessfulPayment ? successfulPayment : new types.SuccessfulPayment(successfulPayment, this.context)
    ) : undefined
    return this
  }

  setConnectedWebsite(website) {
    this.connectedWebsite = website
    return this
  }

  setPassportData(passportData) {
    this.passportData = passportData ? (
      passportData instanceof types.PassportData ? passportData : new types.PassportData(passportData, this.context)
    ) : undefined
    return this
  }

  setProximityAlertTriggered(proximityAlertTriggered) {
    this.proximityAlertTriggered = proximityAlertTriggered ? (
      proximityAlertTriggered instanceof types.ProximityAlertTriggered ? proximityAlertTriggered : new types.ProximityAlertTriggered(proximityAlertTriggered, this.context)
    ) : undefined
    return this
  }

  setReplyMarkup(markup) {
    this.replyMarkup = markup ? (
      markup instanceof types.InlineKeyboardMarkup ? markup : new types.InlineKeyboardMarkup(markup.inlineKeyboard, this.context)
    ) : undefined
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  reply() {
    return new types.MessageReply({
      ...this.context,
      chatId: this.chat.id,
      messageId: this.id
    })
  }

  forward(chatId, options) {
    return this.context.telegramBot.forwardMessage(this.chat.id, this.id, chatId, options)
  }

  forwardToCurrentChat(options) {
    return this.context.telegramBot.forwardMessage(this.chat.id, this.id, this.chat.id, options)
  }

  copy(chatId, options) {
    return this.context.telegramBot.copyMessage(this.chat.id, this.id, chatId, options)
  }

  copyToCurrentChat(options) {
    return this.context.telegramBot.copyMessage(this.chat.id, this.id, this.chat.id, options)
  }

  editLiveLocation(latitude, longitude, options) {
    return this.context.telegramBot.editMessageLiveLocation(this.chat.id, this.id, latitude, longitude, options)
  }

  stopLiveLocation(options) {
    return this.context.telegramBot.stopMessageLiveLocation(this.chat.id, this.id, options)
  }

  pin(options) {
    return this.context.telegramBot.pinChatMessage(this.chat.id, this.id, options)
  }

  editText(text, options) {
    return this.context.telegramBot.editMessageText(this.chat.id, this.id, text, options)
  }

  removeText(options) {
    return this.context.telegramBot.removeMessageText(this.chat.id, this.id, options)
  }

  editCaption(caption, options) {
    return this.context.telegramBot.editMessageCaption(this.chat.id, this.id, caption, options)
  }

  removeCaption(options) {
    return this.context.telegramBot.removeMessageCaption(this.chat.id, this.id, options)
  }

  editMedia(media, options) {
    return this.context.telegramBot.editMessageMedia(this.chat.id, this.id, media, options)
  }

  editReplyMarkup(replyMarkup) {
    return this.context.telegramBot.editMessageReplyMarkup(this.chat.id, this.id, replyMarkup)
  }

  removeReplyMarkup() {
    return this.context.telegramBot.removeMessageReplyMarkup(this.chat.id, this.id)
  }

  stopPoll(options) {
    return this.context.telegramBot.stopPoll(this.chat.id, this.id, options)
  }

  delete() {
    return this.context.telegramBot.deleteMessage(this.chat.id, this.id)
  }

  setGameScore(userId, score, options) {
    return this.context.telegramBot.setGameScore(this.chat.id, this.id, userId, score, options)
  }

  getGameHighScores(userId) {
    return this.context.telegramBot.getGameHighScores(this.chat.id, this.id, userId)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.senderChat) {
      data.senderChat = this.senderChat.toJSON()
    }
    if (this.chat) {
      data.chat = this.chat.toJSON()
    }
    if (this.forwardFrom) {
      data.forwardFrom = this.forwardFrom.toJSON()
    }
    if (this.forwardFromChat) {
      data.forwardFromChat = this.forwardFromChat.toJSON()
    }
    if (this.forwardFromMessageId) {
      data.forwardFromMessageId = this.forwardFromMessageId
    }
    if (Helper.exists(this.forwardSignature)) {
      data.forwardSignature = this.forwardSignature
    }
    if (Helper.exists(this.forwardSenderName)) {
      data.forwardSenderName = this.forwardSenderName
    }
    if (this.forwardDate) {
      data.forwardDate = this.forwardDate
    }
    if (this.replyToMessage) {
      data.replyToMessage = this.replyToMessage.toJSON()
    }
    if (this.viaBot) {
      data.viaBot = this.viaBot.toJSON()
    }
    if (this.editDate) {
      data.editDate = this.editDate
    }
    if (this.mediaGroupId) {
      data.mediaGroupId = this.mediaGroupId
    }
    if (Helper.exists(this.authorSignature)) {
      data.authorSignature = this.authorSignature
    }
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (this.entities) {
      data.entities = this.entities.map(entity => entity.toJSON())
    }
    if (this.animation) {
      data.animation = this.animation.toJSON()
    }
    if (this.audio) {
      data.audio = this.audio.toJSON()
    }
    if (this.document) {
      data.document = this.document.toJSON()
    }
    if (this.photo) {
      data.photo = this.photo.map(photo => photo.toJSON())
    }
    if (this.sticker) {
      data.sticker = this.sticker.toJSON()
    }
    if (this.video) {
      data.video = this.video.toJSON()
    }
    if (this.videoNote) {
      data.videoNote = this.videoNote.toJSON()
    }
    if (this.voice) {
      data.voice = this.voice.toJSON()
    }
    if (Helper.exists(this.caption)) {
      data.caption = this.caption
    }
    if (this.captionEntities) {
      data.captionEntities = this.captionEntities.map(entity => entity.toJSON())
    }
    if (this.contact) {
      data.contact = this.contact.toJSON()
    }
    if (this.dice) {
      data.dice = this.dice.toJSON()
    }
    if (this.game) {
      data.game = this.game.toJSON()
    }
    if (this.poll) {
      data.poll = this.poll.toJSON()
    }
    if (this.venue) {
      data.venue = this.venue.toJSON()
    }
    if (this.location) {
      data.location = this.location.toJSON()
    }
    if (this.newChatMembers) {
      data.newChatMembers = this.newChatMembers.map(user => user.toJSON())
    }
    if (this.leftChatMember) {
      data.leftChatMember = this.leftChatMember.toJSON()
    }
    if (Helper.exists(this.newChatTitle)) {
      data.newChatTitle = this.newChatTitle
    }
    if (this.newChatPhoto) {
      data.newChatPhoto = this.newChatPhoto.map(photo => photo.toJSON())
    }
    if (Helper.exists(this.chatPhotoDeleted)) {
      data.chatPhotoDeleted = this.chatPhotoDeleted
    }
    if (Helper.exists(this.groupChatCreated)) {
      data.groupChatCreated = this.groupChatCreated
    }
    if (Helper.exists(this.supergroupChatCreated)) {
      data.supergroupChatCreated = this.supergroupChatCreated
    }
    if (Helper.exists(this.channelChatCreated)) {
      data.channelChatCreated = this.channelChatCreated
    }
    if (Helper.exists(this.migrateFromChatId)) {
      data.migrateFromChatId = this.migrateFromChatId
    }
    if (Helper.exists(this.migrateToChatId)) {
      data.migrateToChatId = this.migrateToChatId
    }
    if (this.pinnedMessage) {
      data.pinnedMessage = this.pinnedMessage.toJSON()
    }
    if (this.invoice) {
      data.invoice = this.invoice.toJSON()
    }
    if (this.successfulPayment) {
      data.successfulPayment = this.successfulPayment.toJSON()
    }
    if (this.connectedWebsite) {
      data.connectedWebsite = this.connectedWebsite
    }
    if (this.passportData) {
      data.passportData = this.passportData.toJSON()
    }
    if (this.proximityAlertTriggered) {
      data.proximityAlertTriggered = this.proximityAlertTriggered.toJSON()
    }
    if (this.replyMarkup) {
      data.replyMarkup = this.replyMarkup.toJSON()
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
Message.from = (data, context) => new Message(data, context)
Message.fromParams = (params = {}, context) => {
  const data = {
    id: params.message_id,
    from: params.from,
    senderChat: params.sender_chat,
    chat: params.chat,
    forwardFrom: params.forward_from,
    forwardFromChat: params.forward_from_chat,
    forwardFromMessageId: params.forward_from_message_id,
    forwardSignature: params.forward_signature,
    forwardSenderName: params.forward_sender_name,
    forwardDate: params.forward_date,
    replyToMessage: params.reply_to_message,
    viaBot: params.via_bot,
    editDate: params.edit_date,
    mediaGroupId: params.media_group_id,
    authorSignature: params.author_signature,
    text: params.text,
    entities: params.entities,
    animation: params.animation,
    audio: params.audio,
    document: params.document,
    photo: params.photo,
    sticker: params.sticker,
    video: params.video,
    videoNote: params.video_note,
    voice: params.voice,
    caption: params.caption,
    captionEntities: params.caption_entities,
    contact: params.contact,
    dice: params.dice,
    game: params.game,
    poll: params.poll,
    venue: params.venue,
    location: params.location,
    newChatMembers: params.new_chat_members,
    leftChatMember: params.left_chat_member,
    newChatTitle: params.new_chat_title,
    newChatPhoto: params.new_chat_photo,
    chatPhotoDeleted: params.delete_chat_photo,
    groupChatCreated: params.group_chat_created,
    supergroupChatCreated: params.supergroup_chat_created,
    channelChatCreated: params.channel_chat_created,
    migrateFromChatId: params.migrate_from_chat_id,
    migrateToChatId: params.migrate_to_chat_id,
    pinnedMessage: params.pinned_message,
    invoice: params.invoice,
    successfulPayment: params.successful_payment,
    connectedWebsite: params.connected_website,
    passportData: params.passport_data,
    proximityAlertTriggered: params.proximity_alert_triggered,
    replyMarkup: params.reply_markup,
    date: params.date
  }
  if (data.from) {
    data.from = types.User.fromParams(data.from, context)
  }
  if (data.senderChat) {
    data.senderChat = types.Chat.fromParams(data.senderChat, context)
  }
  if (data.chat) {
    data.chat = types.Chat.fromParams(data.chat, context)
  }
  if (data.forwardFrom) {
    data.type = constants.MessageType.FORWARD
    data.forwardFrom = types.User.fromParams(data.forwardFrom, context)
  }
  if (data.forwardFromChat) {
    data.type = constants.MessageType.FORWARD
    data.forwardFromChat = types.Chat.fromParams(data.forwardFromChat, context)
  }
  if (data.replyToMessage) {
    data.replyToMessage = Message.fromParams(data.replyToMessage, context)
  }
  if (data.viaBot) {
    data.viaBot = types.User.fromParams(data.viaBot, context)
  }
  if (Helper.exists(data.text)) {
    data.type = constants.MessageType.TEXT
  }
  if (data.entities) {
    data.entities = data.entities.map(entity => types.MessageEntity.fromParams(entity, {
      ...context,
      text: data.text
    }))
  }
  if (data.animation) {
    data.type = constants.MessageType.ANIMATION
    data.animation = types.Animation.fromParams(data.animation, context)
  }
  if (data.audio) {
    data.type = constants.MessageType.AUDIO
    data.audio = types.Audio.fromParams(data.audio, context)
  }
  if (data.document) {
    if (data.type !== constants.MessageType.ANIMATION) {
      data.type = constants.MessageType.DOCUMENT
    }
    data.document = types.Document.fromParams(data.document, context)
  }
  if (data.photo) {
    data.type = constants.MessageType.PHOTO
    data.photo = data.photo.map(photo => types.PhotoSize.fromParams(photo, context))
  }
  if (data.sticker) {
    data.type = constants.MessageType.STICKER
    data.sticker = types.Sticker.fromParams(data.sticker, context)
  }
  if (data.video) {
    data.type = constants.MessageType.VIDEO
    data.video = types.Video.fromParams(data.video, context)
  }
  if (data.videoNote) {
    data.type = constants.MessageType.VIDEO_NOTE
    data.videoNote = types.VideoNote.fromParams(data.videoNote, context)
  }
  if (data.voice) {
    data.type = constants.MessageType.VOICE
    data.voice = types.Voice.fromParams(data.voice, context)
  }
  if (data.captionEntities) {
    data.captionEntities = data.captionEntities.map(entity => types.MessageEntity.fromParams(entity, {
      ...context,
      text: data.caption
    }))
  }
  if (data.contact) {
    data.type = constants.MessageType.CONTACT
    data.contact = types.Contact.fromParams(data.contact, context)
  }
  if (data.dice) {
    data.type = constants.MessageType.DICE
    data.dice = types.Dice.fromParams(data.dice, context)
  }
  if (data.game) {
    data.type = constants.MessageType.GAME
    data.game = types.Game.fromParams(data.game, context)
  }
  if (data.poll) {
    data.type = constants.MessageType.POLL
    data.poll = types.Poll.fromParams(data.poll, context)
  }
  if (data.venue) {
    data.type = constants.MessageType.VENUE
    data.venue = types.Venue.fromParams(data.venue, context)
  }
  if (data.location) {
    if (data.type !== constants.MessageType.VENUE) {
      data.type = constants.MessageType.LOCATION
    }
    data.location = types.Location.fromParams(data.location)
  }
  if (data.newChatMembers) {
    data.type = constants.MessageType.NEW_CHAT_MEMBERS
    data.newChatMembers = data.newChatMembers.map(user => types.User.fromParams(user, context))
  }
  if (data.leftChatMember) {
    data.type = constants.MessageType.MEMBER_LEFT_CHAT
    data.leftChatMember = types.User.fromParams(data.leftChatMember, context)
  }
  if (Helper.exists(data.newChatTitle)) {
    data.type = constants.MessageType.NEW_CHAT_TITLE
  }
  if (data.newChatPhoto) {
    data.type = constants.MessageType.NEW_CHAT_PHOTO
    data.newChatPhoto = data.newChatPhoto.map(photo => types.PhotoSize.fromParams(photo, context))
  }
  if (Helper.exists(data.chatPhotoDeleted)) {
    data.type = constants.MessageType.CHAT_PHOTO_DELETED
  }
  if (Helper.exists(data.groupChatCreated)) {
    data.type = constants.MessageType.GROUP_CHAT_CREATED
  }
  if (Helper.exists(data.supergroupChatCreated)) {
    data.type = constants.MessageType.SUPERGROUP_CHAT_CREATED
  }
  if (Helper.exists(data.channelChatCreated)) {
    data.type = constants.MessageType.CHANNEL_CHAT_CREATED
  }
  if (data.migrateFromChatId) {
    data.type = constants.MessageType.MIGRATED_FROM_CHAT
  }
  if (data.migrateToChatId) {
    data.type = constants.MessageType.CHAT_MIGRATED
  }
  if (data.pinnedMessage) {
    data.type = constants.MessageType.PINNED
    data.pinnedMessage = Message.fromParams(data.pinnedMessage, context)
  }
  if (data.invoice) {
    data.type = constants.MessageType.INVOICE
    data.invoice = types.Invoice.fromParams(data.invoice, context)
  }
  if (data.successfulPayment) {
    data.type = constants.MessageType.SUCCESSFUL_PAYMENT
    data.successfulPayment = types.SuccessfulPayment.fromParams(data.successfulPayment, context)
  }
  if (data.connectedWebsite) {
    data.type = constants.MessageType.USER_LOGGED
  }
  if (data.passportData) {
    data.type = constants.MessageType.PASSPORT_DATA
    data.passportData = types.PassportData.fromParams(data.passportData, context)
  }
  if (data.proximityAlertTriggered) {
    data.type = constants.MessageType.PROXIMITY_ALERT_TRIGGERED
    data.proximityAlertTriggered = types.ProximityAlertTriggered.fromParams(data.proximityAlertTriggered, context)
  }
  if (data.replyMarkup) {
    data.replyMarkup = types.InlineKeyboardMarkup.fromParams(data.replyMarkup, context)
  }
  return new Message(data, context)
}

module.exports = Message
