export default class MessageReply {
  static from(context) {
    return new MessageReply(context)
  }

  constructor(context) {
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  sendMessage(text, options) {
    return this.context.telegramBot.sendMessage(this.context.chatId, text, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  copy(options) {
    return this.context.telegramBot.copyMessage(this.context.chatId, this.context.messageId, this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  copyMessage(id, options) {
    return this.context.telegramBot.copyMessage(this.context.chatId, id, this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  copyMessageFromAnotherChat(chatId, messageId, options) {
    return this.context.telegramBot.copyMessage(chatId, messageId, this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendPhoto(photo, options) {
    return this.context.telegramBot.sendPhoto(this.context.chatId, photo, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendAudio(audio, options) {
    return this.context.telegramBot.sendAudio(this.context.chatId, audio, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendDocument(document, options) {
    return this.context.telegramBot.sendDocument(this.context.chatId, document, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendVideo(video, options) {
    return this.context.telegramBot.sendVideo(this.context.chatId, video, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendAnimation(animation, options) {
    return this.context.telegramBot.sendAnimation(this.context.chatId, animation, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendVoice(voice, options) {
    return this.context.telegramBot.sendVoice(this.context.chatId, voice, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendVideoNote(videoNote, options) {
    return this.context.telegramBot.sendVideoNote(this.context.chatId, videoNote, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendMediaGroup(media, options) {
    return this.context.telegramBot.sendMediaGroup(this.context.chatId, media, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendLocation(latitude, longitude, options) {
    return this.context.telegramBot.sendLocation(this.context.chatId, latitude, longitude, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendVenue(latitude, longitude, title, address, options) {
    return this.context.telegramBot.sendVenue(this.context.chatId, latitude, longitude, title, address, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendContact(phoneNumber, firstName, options) {
    return this.context.telegramBot.sendContact(this.context.chatId, phoneNumber, firstName, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendPoll(question, pollOptions, options) {
    return this.context.telegramBot.sendPoll(this.context.chatId, question, pollOptions, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendQuizPoll(question, pollOptions, correctOptionId, options) {
    return this.context.telegramBot.sendQuizPoll(this.context.chatId, question, pollOptions, correctOptionId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendDice(options) {
    return this.context.telegramBot.sendDice(this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendDartsDice(options) {
    return this.context.telegramBot.sendDartsDice(this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendBasketballDice(options) {
    return this.context.telegramBot.sendBasketballDice(this.context.chatId, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendSticker(sticker, options) {
    return this.context.telegramBot.sendSticker(this.context.chatId, sticker, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendInvoice(providerToken, title, description, currency, prices, payload, startParameter, options) {
    return this.context.telegramBot.sendInvoice(this.context.chatId, providerToken, title, description, currency, prices, payload, startParameter, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }

  sendGame(gameShortName, options) {
    return this.context.telegramBot.sendGame(this.context.chatId, gameShortName, {
      ...options,
      replyToMessageId: this.context.messageId
    })
  }
}
