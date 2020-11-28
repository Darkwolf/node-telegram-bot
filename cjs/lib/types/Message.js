const Helper = require('@darkwolf/helper.cjs')
const { MessageType } = require('../constants')
const User = require('./User')
const Chat = require('./Chat')
const MessageReply = require('./MessageReply')
const MessageEntity = require('./MessageEntity')
const Animation = require('./Animation')
const Audio = require('./Audio')
const Document = require('./Document')
const PhotoSize = require('./PhotoSize')
const Sticker = require('./Sticker')
const Video = require('./Video')
const VideoNote = require('./VideoNote')
const Voice = require('./Voice')
const Contact = require('./Contact')
const Dice = require('./Dice')
const Game = require('./Game')
const Poll = require('./Poll')
const Venue = require('./Venue')
const Location = require('./Location')
const Invoice = require('./Invoice')
const SuccessfulPayment = require('./SuccessfulPayment')
const PassportData = require('./PassportData')
const ProximityAlertTriggered = require('./ProximityAlertTriggered')
const InlineKeyboardMarkup = require('./InlineKeyboardMarkup')

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
    return this.type === MessageType.TEXT
  }

  get isAnimation() {
    return this.type === MessageType.ANIMATION
  }

  get isAudio() {
    return this.type === MessageType.AUDIO
  }

  get isDocument() {
    return this.type === MessageType.DOCUMENT
  }

  get isPhoto() {
    return this.type === MessageType.PHOTO
  }

  get isSticker() {
    return this.type === MessageType.STICKER
  }

  get isVideo() {
    return this.type === MessageType.VIDEO
  }

  get isVideoNote() {
    return this.type === MessageType.VIDEO_NOTE
  }

  get isVoice() {
    return this.type === MessageType.VOICE
  }

  get isContact() {
    return this.type === MessageType.CONTACT
  }

  get isDice() {
    return this.type === MessageType.DICE
  }

  get isGame() {
    return this.type === MessageType.GAME
  }

  get isPoll() {
    return this.type === MessageType.POLL
  }

  get isVenue() {
    return this.type === MessageType.VENUE
  }

  get isLocation() {
    return this.type === MessageType.LOCATION
  }

  get isNewChatMembers() {
    return this.type === MessageType.NEW_CHAT_MEMBERS
  }

  get isMemberLeftChat() {
    return this.type === MessageType.MEMBER_LEFT_CHAT
  }

  get isNewChatTitle() {
    return this.type === MessageType.NEW_CHAT_TITLE
  }

  get isNewChatPhoto() {
    return this.type === MessageType.NEW_CHAT_PHOTO
  }

  get isChatPhotoDeleted() {
    return this.type === MessageType.CHAT_PHOTO_DELETED
  }

  get isGroupChatCreated() {
    return this.type === MessageType.GROUP_CHAT_CREATED
  }

  get isSupergroupChatCreated() {
    return this.type === MessageType.SUPERGROUP_CHAT_CREATED
  }

  get isChannelChatCreated() {
    return this.type === MessageType.CHANNEL_CHAT_CREATED
  }

  get isChatMigrated() {
    return this.type === MessageType.CHAT_MIGRATED
  }

  get isMigratedFromChat() {
    return this.type === MessageType.MIGRATED_FROM_CHAT
  }

  get isPinned() {
    return this.type === MessageType.PINNED
  }

  get isInvoice() {
    return this.type === MessageType.INVOICE
  }

  get isSuccessfulPayment() {
    return this.type === MessageType.SUCCESSFUL_PAYMENT
  }

  get isUserLogged() {
    return this.type === MessageType.USER_LOGGED
  }

  get isPassportData() {
    return this.type === MessageType.PASSPORT_DATA
  }

  get isProximityAlertTriggered() {
    return this.type === MessageType.PROXIMITY_ALERT_TRIGGERED
  }

  get isForward() {
    return this.type === MessageType.FORWARD
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
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setSenderChat(chat) {
    this.senderChat = chat ? (
      chat instanceof Chat ? chat : new Chat(chat, this.context)
    ) : undefined
    return this
  }

  setChat(chat) {
    this.chat = chat ? (
      chat instanceof Chat ? chat : new Chat(chat, this.context)
    ) : undefined
    return this
  }

  setForwardFrom(user) {
    this.forwardFrom = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setForwardFromChat(chat) {
    this.forwardFromChat = chat ? (
      chat instanceof Chat ? chat : new Chat(chat, this.context)
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
      user instanceof User ? user : new User(user, this.context)
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
      entity instanceof MessageEntity ? entity : new MessageEntity(entity, this.context)
    ) : undefined
    return this
  }

  setAnimation(animation) {
    this.animation = animation ? (
      animation instanceof Animation ? animation : new Animation(animation, this.context)
    ) : undefined
    return this
  }

  setAudio(audio) {
    this.audio = audio ? (
      audio instanceof Audio ? audio : new Audio(audio, this.context)
    ) : undefined
    return this
  }

  setDocument(document) {
    this.document = document ? (
      document instanceof Document ? document : new Document(document, this.context)
    ) : undefined
    return this
  }

  setPhoto(photo) {
    this.photo = photo ? photo.map(photo =>
      photo instanceof PhotoSize ? photo : new PhotoSize(photo, this.context)
    ) : undefined
    return this
  }

  setSticker(sticker) {
    this.sticker = sticker ? (
      sticker instanceof Sticker ? sticker : new Sticker(sticker, this.context)
    ) : undefined
    return this
  }

  setVideo(video) {
    this.video = video ? (
      video instanceof Video ? video : new Video(video, this.context)
    ) : undefined
    return this
  }

  setVideoNote(videoNote) {
    this.videoNote = videoNote ? (
      videoNote instanceof VideoNote ? videoNote : new VideoNote(videoNote, this.context)
    ) : undefined
    return this
  }

  setVoice(voice) {
    this.voice = voice ? (
      voice instanceof Voice ? voice : new Voice(voice, this.context)
    ) : undefined
    return this
  }

  setCaption(caption) {
    this.caption = caption
    return this
  }

  setCaptionEntities(entities) {
    this.captionEntities = entities ? entities.map(entity =>
      entity instanceof MessageEntity ? entity : new MessageEntity(entity, this.context)
    ) : undefined
    return this
  }

  setContact(contact) {
    this.contact = contact ? (
      contact instanceof Contact ? contact : new Contact(contact, this.context)
    ) : undefined
    return this
  }

  setDice(dice) {
    this.dice = dice ? (
      dice instanceof Dice ? dice : new Dice(dice, this.context)
    ) : undefined
    return this
  }

  setGame(game) {
    this.game = game ? (
      game instanceof Game ? game : new Game(game, this.context)
    ) : undefined
    return this
  }

  setPoll(poll) {
    this.poll = poll ? (
      poll instanceof Poll ? poll : new Poll(poll, this.context)
    ) : undefined
    return this
  }

  setVenue(venue) {
    this.venue = venue ? (
      venue instanceof Venue ? venue : new Venue(venue, this.context)
    ) : undefined
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof Location ? location : new Location(location)
    ) : undefined
    return this
  }

  setNewChatMembers(users) {
    this.newChatMembers = users ? users.map(user =>
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setLeftChatMember(user) {
    this.leftChatMember = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setNewChatTitle(title) {
    this.newChatTitle = title
    return this
  }

  setNewChatPhoto(photo) {
    this.newChatPhoto = photo ? photo.map(photo =>
      photo instanceof PhotoSize ? photo : new PhotoSize(photo, this.context)
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
      invoice instanceof Invoice ? invoice : new Invoice(invoice, this.context)
    ) : undefined
    return this
  }

  setSuccessfulPayment(successfulPayment) {
    this.successfulPayment = successfulPayment ? (
      successfulPayment instanceof SuccessfulPayment ? successfulPayment : new SuccessfulPayment(successfulPayment, this.context)
    ) : undefined
    return this
  }

  setConnectedWebsite(website) {
    this.connectedWebsite = website
    return this
  }

  setPassportData(passportData) {
    this.passportData = passportData ? (
      passportData instanceof PassportData ? passportData : new PassportData(passportData, this.context)
    ) : undefined
    return this
  }

  setProximityAlertTriggered(proximityAlertTriggered) {
    this.proximityAlertTriggered = proximityAlertTriggered ? (
      proximityAlertTriggered instanceof ProximityAlertTriggered ? proximityAlertTriggered : new ProximityAlertTriggered(proximityAlertTriggered, this.context)
    ) : undefined
    return this
  }

  setReplyMarkup(markup) {
    this.replyMarkup = markup ? (
      markup instanceof InlineKeyboardMarkup ? markup : new InlineKeyboardMarkup(markup.inlineKeyboard, this.context)
    ) : undefined
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  reply() {
    return new MessageReply({
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
    data.from = User.fromParams(data.from, context)
  }
  if (data.senderChat) {
    data.senderChat = Chat.fromParams(data.senderChat, context)
  }
  if (data.chat) {
    data.chat = Chat.fromParams(data.chat, context)
  }
  if (data.forwardFrom) {
    data.type = MessageType.FORWARD
    data.forwardFrom = User.fromParams(data.forwardFrom, context)
  }
  if (data.forwardFromChat) {
    data.type = MessageType.FORWARD
    data.forwardFromChat = Chat.fromParams(data.forwardFromChat, context)
  }
  if (data.replyToMessage) {
    data.replyToMessage = Message.fromParams(data.replyToMessage, context)
  }
  if (data.viaBot) {
    data.viaBot = User.fromParams(data.viaBot, context)
  }
  if (Helper.exists(data.text)) {
    data.type = MessageType.TEXT
  }
  if (data.entities) {
    data.entities = data.entities.map(entity => MessageEntity.fromParams(entity, {
      ...context,
      text: data.text
    }))
  }
  if (data.animation) {
    data.type = MessageType.ANIMATION
    data.animation = Animation.fromParams(data.animation, context)
  }
  if (data.audio) {
    data.type = MessageType.AUDIO
    data.audio = Audio.fromParams(data.audio, context)
  }
  if (data.document) {
    if (data.type !== MessageType.ANIMATION) {
      data.type = MessageType.DOCUMENT
    }
    data.document = Document.fromParams(data.document, context)
  }
  if (data.photo) {
    data.type = MessageType.PHOTO
    data.photo = data.photo.map(photo => PhotoSize.fromParams(photo, context))
  }
  if (data.sticker) {
    data.type = MessageType.STICKER
    data.sticker = Sticker.fromParams(data.sticker, context)
  }
  if (data.video) {
    data.type = MessageType.VIDEO
    data.video = Video.fromParams(data.video, context)
  }
  if (data.videoNote) {
    data.type = MessageType.VIDEO_NOTE
    data.videoNote = VideoNote.fromParams(data.videoNote, context)
  }
  if (data.voice) {
    data.type = MessageType.VOICE
    data.voice = Voice.fromParams(data.voice, context)
  }
  if (data.captionEntities) {
    data.captionEntities = data.captionEntities.map(entity => MessageEntity.fromParams(entity, {
      ...context,
      text: data.caption
    }))
  }
  if (data.contact) {
    data.type = MessageType.CONTACT
    data.contact = Contact.fromParams(data.contact, context)
  }
  if (data.dice) {
    data.type = MessageType.DICE
    data.dice = Dice.fromParams(data.dice, context)
  }
  if (data.game) {
    data.type = MessageType.GAME
    data.game = Game.fromParams(data.game, context)
  }
  if (data.poll) {
    data.type = MessageType.POLL
    data.poll = Poll.fromParams(data.poll, context)
  }
  if (data.venue) {
    data.type = MessageType.VENUE
    data.venue = Venue.fromParams(data.venue, context)
  }
  if (data.location) {
    if (data.type !== MessageType.VENUE) {
      data.type = MessageType.LOCATION
    }
    data.location = Location.fromParams(data.location)
  }
  if (data.newChatMembers) {
    data.type = MessageType.NEW_CHAT_MEMBERS
    data.newChatMembers = data.newChatMembers.map(user => User.fromParams(user, context))
  }
  if (data.leftChatMember) {
    data.type = MessageType.MEMBER_LEFT_CHAT
    data.leftChatMember = User.fromParams(data.leftChatMember, context)
  }
  if (Helper.exists(data.newChatTitle)) {
    data.type = MessageType.NEW_CHAT_TITLE
  }
  if (data.newChatPhoto) {
    data.type = MessageType.NEW_CHAT_PHOTO
    data.newChatPhoto = data.newChatPhoto.map(photo => PhotoSize.fromParams(photo, context))
  }
  if (Helper.exists(data.chatPhotoDeleted)) {
    data.type = MessageType.CHAT_PHOTO_DELETED
  }
  if (Helper.exists(data.groupChatCreated)) {
    data.type = MessageType.GROUP_CHAT_CREATED
  }
  if (Helper.exists(data.supergroupChatCreated)) {
    data.type = MessageType.SUPERGROUP_CHAT_CREATED
  }
  if (Helper.exists(data.channelChatCreated)) {
    data.type = MessageType.CHANNEL_CHAT_CREATED
  }
  if (data.migrateFromChatId) {
    data.type = MessageType.MIGRATED_FROM_CHAT
  }
  if (data.migrateToChatId) {
    data.type = MessageType.CHAT_MIGRATED
  }
  if (data.pinnedMessage) {
    data.type = MessageType.PINNED
    data.pinnedMessage = Message.fromParams(data.pinnedMessage, context)
  }
  if (data.invoice) {
    data.type = MessageType.INVOICE
    data.invoice = Invoice.fromParams(data.invoice, context)
  }
  if (data.successfulPayment) {
    data.type = MessageType.SUCCESSFUL_PAYMENT
    data.successfulPayment = SuccessfulPayment.fromParams(data.successfulPayment, context)
  }
  if (data.connectedWebsite) {
    data.type = MessageType.USER_LOGGED
  }
  if (data.passportData) {
    data.type = MessageType.PASSPORT_DATA
    data.passportData = PassportData.fromParams(data.passportData, context)
  }
  if (data.proximityAlertTriggered) {
    data.type = MessageType.PROXIMITY_ALERT_TRIGGERED
    data.proximityAlertTriggered = ProximityAlertTriggered.fromParams(data.proximityAlertTriggered, context)
  }
  if (data.replyMarkup) {
    data.replyMarkup = InlineKeyboardMarkup.fromParams(data.replyMarkup, context)
  }
  return new Message(data, context)
}

module.exports = Message
