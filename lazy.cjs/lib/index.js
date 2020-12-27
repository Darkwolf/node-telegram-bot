const EventEmitter = require('events')
const fetch = require('node-fetch')
const FormData = require('form-data')
const Helper = require('@darkwolf/helper.cjs')
const types = require('./types')
const requests = require('./requests')
const errors = require('./errors')
const constants = require('./constants')

class TelegramBot extends EventEmitter {
  constructor(token, settings) {
    super()
    this
      .setToken(token)
      .setSettings(settings)
  }

  setToken(token) {
    this.token = token
    return this
  }

  setSettings(settings) {
    this.settings = {
      ...TelegramBot.settings,
      ...settings
    }
    return this
  }

  setIgnoreErrors(boolean) {
    this.settings.ignoreErrors = boolean
    return this
  }

  setAutoMigrateToChats(boolean) {
    this.settings.autoMigrateToChats = boolean
    return this
  }

  setAgent(agent) {
    this.settings.agent = agent
    return this
  }

  getFileDownloadLinkByPath(path) {
    return `${TelegramBot.BOT_FILE_STORAGE_URL}${this.token}/${path}`
  }

  async request(request) {
    this.emit(constants.EventType.REQUEST, request)
    try {
      if (request instanceof requests.DownloadFileByPathRequest) {
        const url = this.getFileDownloadLinkByPath(request.path)
        const res = await fetch(url, {
          agent: this.settings.agent
        })
        let response = new types.Response({
          ok: false
        }, {
          telegramBot: this,
          request,
          response: res
        })
        switch (res.status) {
          case 401: throw new errors.InvalidBotTokenError(this.token).setResponse(response)
          case 404: throw new errors.FileNotFoundError(request.path).setResponse(response)
        }
        try {
          res.data = await res.blob()
          response
            .setOk(true)
            .setResult(res.data)
        } catch (e) {}
        return response
      } else {
        const url = `${TelegramBot.BOT_API_URL}${this.token}/${request.queryMethod}`
        let method
        let headers
        let body
        if (request.toParams) {
          method = 'POST'
          const params = request.toParams()
          const uploadFiles = Object.values(params).some(param => param instanceof types.InputFile)
          if (uploadFiles) {
            body = Object.entries(params).reduce((form, [key, value]) => {
              if (Helper.exists(value)) {
                if (Helper.isObject(value)) {
                  if (value instanceof Boolean || value instanceof Number || value instanceof String) {
                    form.append(key, value.valueOf())
                  } else if (value instanceof types.InputFile) {
                    form.append(key, value.file)
                  } else {
                    form.append(key, JSON.stringify(value))
                  }
                } else {
                  form.append(key, value)
                }
              }
              return form
            }, new FormData())
          } else {
            headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
            body = JSON.stringify(params)
          }
        }
        const res = await fetch(url, {
          method,
          headers,
          body,
          agent: this.settings.agent
        })
        let response = new types.Response({
          ok: false
        }, {
          telegramBot: this,
          request,
          response: res
        })
        switch (res.status) {
          case 401:
          case 404: throw new errors.InvalidBotTokenError(this.token).setResponse(response)
        }
        try {
          res.data = await res.json()
          response = types.Response.fromParams(res.data, {
            telegramBot: this,
            request,
            response: res
          })
        } catch (e) {}
        if (response.parameters) {
          if (response.parameters.retryAfter) {
            throw new errors.TooManyRequestsError(response.parameters.retryAfter).setResponse(response)
          } else if (response.parameters.migrateToChatId) {
            const migrateFromChatId = request.chatId || request.id
            const error = new errors.ChatMigratedError(migrateFromChatId, response.parameters.migrateToChatId).setResponse(response)
            if (this.settings.autoMigrateToChats && !request.migrateFromChatId) {
              this.emit(constants.EventType.ERROR, error)
              request.migrateFromChatId = migrateFromChatId
              if (request.setChatId) {
                request.setChatId(response.parameters.migrateToChatId)
              } else if (request.setId) {
                request.setId(response.parameters.migrateToChatId)
              }
              return request.send()
            } else {
              throw error
            }
          }
        }
        return response
      }
    } catch (e) {
      this.emit(constants.EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  getUpdates(options) {
    return new requests.GetUpdatesRequest(options, {
      telegramBot: this
    }).send()
  }

  setWebhook(url, options) {
    return new requests.SetWebhookRequest({
      ...options,
      url
    }, {
      telegramBot: this
    }).send()
  }

  deleteWebhook(options) {
    return new requests.DeleteWebhookRequest(options, {
      telegramBot: this
    }).send()
  }

  getWebhookInfo() {
    return new requests.GetWebhookInfoRequest({
      telegramBot: this
    }).send()
  }

  getMe() {
    return new requests.GetMeRequest({
      telegramBot: this
    }).send()
  }

  logOut() {
    return new requests.LogOutRequest({
      telegramBot: this
    }).send()
  }

  close() {
    return new requests.CloseRequest({
      telegramBot: this
    }).send()
  }

  sendMessage(chatId, text, options) {
    return new requests.SendMessageRequest({
      ...options,
      chatId,
      text
    }, {
      telegramBot: this
    }).send()
  }

  forwardMessage(fromChatId, messageId, chatId, options) {
    return new requests.ForwardMessageRequest({
      ...options,
      fromChatId,
      messageId,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  copyMessage(fromChatId, messageId, chatId, options) {
    return new requests.CopyMessageRequest({
      ...options,
      fromChatId,
      messageId,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  sendPhoto(chatId, photo, options) {
    return new requests.SendPhotoRequest({
      ...options,
      chatId,
      photo
    }, {
      telegramBot: this
    }).send()
  }

  sendAudio(chatId, audio, options) {
    return new requests.SendAudioRequest({
      ...options,
      chatId,
      audio
    }, {
      telegramBot: this
    }).send()
  }

  sendDocument(chatId, document, options) {
    return new requests.SendDocumentRequest({
      ...options,
      chatId,
      document
    }, {
      telegramBot: this
    }).send()
  }

  sendVideo(chatId, video, options) {
    return new requests.SendVideoRequest({
      ...options,
      chatId,
      video
    }, {
      telegramBot: this
    }).send()
  }

  sendAnimation(chatId, animation, options) {
    return new requests.SendAnimationRequest({
      ...options,
      chatId,
      animation
    }, {
      telegramBot: this
    }).send()
  }

  sendVoice(chatId, voice, options) {
    return new requests.SendVoiceRequest({
      ...options,
      chatId,
      voice
    }, {
      telegramBot: this
    }).send()
  }

  sendVideoNote(chatId, videoNote, options) {
    return new requests.SendVideoNoteRequest({
      ...options,
      chatId,
      videoNote
    }, {
      telegramBot: this
    }).send()
  }

  sendMediaGroup(chatId, media, options) {
    return new requests.SendMediaGroupRequest({
      ...options,
      chatId,
      media
    }, {
      telegramBot: this
    }).send()
  }

  sendLocation(chatId, latitude, longitude, options) {
    return new requests.SendLocationRequest({
      ...options,
      chatId,
      latitude,
      longitude
    }, {
      telegramBot: this
    }).send()
  }

  editMessageLiveLocation(chatId, messageId, latitude, longitude, options) {
    return new requests.EditMessageLiveLocationRequest({
      ...options,
      chatId,
      messageId,
      latitude,
      longitude
    }, {
      telegramBot: this
    }).send()
  }

  editInlineMessageLiveLocation(id, latitude, longitude, options) {
    return new requests.EditMessageLiveLocationRequest({
      ...options,
      inlineMessageId: id,
      latitude,
      longitude
    }, {
      telegramBot: this
    }).send()
  }

  stopMessageLiveLocation(chatId, messageId, options) {
    return new requests.StopMessageLiveLocationRequest({
      ...options,
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  stopInlineMessageLiveLocation(id, options) {
    return new requests.StopMessageLiveLocationRequest({
      ...options,
      inlineMessageId: id
    }, {
      telegramBot: this
    }).send()
  }

  sendVenue(chatId, latitude, longitude, title, address, options) {
    return new requests.SendVenueRequest({
      ...options,
      chatId,
      latitude,
      longitude,
      title,
      address
    }, {
      telegramBot: this
    }).send()
  }

  sendContact(chatId, phoneNumber, firstName, options) {
    return new requests.SendContactRequest({
      ...options,
      chatId,
      phoneNumber,
      firstName
    }, {
      telegramBot: this
    }).send()
  }

  sendPoll(chatId, question, pollOptions, options) {
    return new requests.SendPollRequest({
      ...options,
      chatId,
      question,
      options: pollOptions
    }, {
      telegramBot: this
    }).send()
  }

  sendQuizPoll(chatId, question, pollOptions, correctOptionId, options) {
    return new requests.SendPollRequest({
      ...options,
      chatId,
      question,
      options: pollOptions,
      correctOptionId
    }, {
      telegramBot: this
    }).send()
  }

  sendDice(chatId, options) {
    return new requests.SendDiceRequest({
      ...options,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  sendDartsDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: constants.DiceEmoji.DARTS
    })
  }

  sendBasketballDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: constants.DiceEmoji.BASKETBALL
    })
  }

  sendFootballDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: constants.DiceEmoji.FOOTBALL
    })
  }

  sendSlotMachineDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: constants.DiceEmoji.SLOT_MACHINE
    })
  }

  sendChatAction(id, action) {
    return new requests.SendChatActionRequest({
      id,
      action
    }, {
      telegramBot: this
    }).send()
  }

  sendChatActionTyping(id) {
    return this.sendChatAction(id, constants.ChatAction.TYPING)
  }

  sendChatActionUploadPhoto(id) {
    return this.sendChatAction(id, constants.ChatAction.UPLOAD_PHOTO)
  }

  sendChatActionRecordVideo(id) {
    return this.sendChatAction(id, constants.ChatAction.RECORD_VIDEO)
  }

  sendChatActionUploadVideo(id) {
    return this.sendChatAction(id, constants.ChatAction.UPLOAD_VIDEO)
  }

  sendChatActionRecordAudio(id) {
    return this.sendChatAction(id, constants.ChatAction.RECORD_AUDIO)
  }

  sendChatActionUploadAudio(id) {
    return this.sendChatAction(id, constants.ChatAction.UPLOAD_AUDIO)
  }

  sendChatActionUploadDocument(id) {
    return this.sendChatAction(id, constants.ChatAction.UPLOAD_DOCUMENT)
  }

  sendChatActionFindLocation(id) {
    return this.sendChatAction(id, constants.ChatAction.FIND_LOCATION)
  }

  sendChatActionRecordVideoNote(id) {
    return this.sendChatAction(id, constants.ChatAction.RECORD_VIDEO_NOTE)
  }

  sendChatActionUploadVideoNote(id) {
    return this.sendChatAction(id, constants.ChatAction.UPLOAD_VIDEO_NOTE)
  }

  getUserProfilePhotos(id, options) {
    return new requests.GetUserProfilePhotosRequest({
      ...options,
      id
    }, {
      telegramBot: this
    }).send()
  }

  getFile(id) {
    return new requests.GetFileRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  async downloadFile(id) {
    const file = await this.getFile(id)
    return file.download()
  }

  downloadFileByPath(path) {
    return new requests.DownloadFileByPathRequest({
      path
    }, {
      telegramBot: this
    }).send()
  }

  kickChatMember(id, userId, options) {
    return new requests.KickChatMemberRequest({
      ...options,
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  banChatMember(id, userId, options) {
    return this.kickChatMember(id, userId, options)
  }

  unbanChatMember(id, userId, options) {
    return new requests.UnbanChatMemberRequest({
      ...options,
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  restrictChatMember(id, userId, permissions, options) {
    return new requests.RestrictChatMemberRequest({
      ...options,
      id,
      userId,
      permissions
    }, {
      telegramBot: this
    }).send()
  }

  promoteChatMember(id, userId, options) {
    return new requests.PromoteChatMemberRequest({
      ...options,
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  setChatAdminCustomTitle(id, userId, title) {
    return new requests.SetChatAdminCustomTitleRequest({
      id,
      userId,
      title
    }, {
      telegramBot: this
    }).send()
  }

  removeChatAdminCustomTitle(id, userId) {
    return this.setChatAdminCustomTitle(id, userId, '')
  }

  setChatPermissions(id, permissions) {
    return new requests.SetChatPermissionsRequest({
      id,
      permissions
    }, {
      telegramBot: this
    }).send()
  }

  exportChatInviteLink(id) {
    return new requests.ExportChatInviteLinkRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  setChatPhoto(id, photo) {
    return new requests.SetChatPhotoRequest({
      id,
      photo
    }, {
      telegramBot: this
    }).send()
  }

  deleteChatPhoto(id) {
    return new requests.DeleteChatPhotoRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  setChatTitle(id, title) {
    return new requests.SetChatTitleRequest({
      id,
      title
    }, {
      telegramBot: this
    }).send()
  }

  removeChatTitle(id) {
    return this.setChatTitle(id, FormattedText.MAGICK_CHAR)
  }

  setChatDescription(id, description) {
    return new requests.SetChatDescriptionRequest({
      id,
      description
    }, {
      telegramBot: this
    }).send()
  }

  removeChatDescription(id) {
    return this.setChatDescription(id, '')
  }

  pinChatMessage(id, messageId, options) {
    return new requests.PinChatMessageRequest({
      ...options,
      id,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  unpinChatMessage(id, messageId) {
    return new requests.UnpinChatMessageRequest({
      id,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  unpinAllChatMessages(id) {
    return new requests.UnpinAllChatMessagesRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  leaveChat(id) {
    return new requests.LeaveChatRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChat(id) {
    return new requests.GetChatRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatAdmins(id) {
    return new requests.GetChatAdminsRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatMembersCount(id) {
    return new requests.GetChatMembersCountRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatMember(id, userId) {
    return new requests.GetChatMemberRequest({
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  setChatStickerSet(id, name) {
    return new requests.SetChatStickerSetRequest({
      id,
      name
    }, {
      telegramBot: this
    }).send()
  }

  deleteChatStickerSet(id) {
    return new requests.DeleteChatStickerSetRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  answerCallbackQuery(id, options) {
    return new requests.AnswerCallbackQueryRequest({
      ...options,
      id
    }, {
      telegramBot: this
    }).send()
  }

  setMyCommands(commands) {
    return new requests.SetMyCommandsRequest({
      commands
    }, {
      telegramBot: this
    }).send()
  }

  getMyCommands() {
    return new requests.GetMyCommandsRequest({
      telegramBot: this
    }).send()
  }

  editMessageText(chatId, messageId, text, options) {
    return new requests.EditMessageTextRequest({
      ...options,
      chatId,
      messageId,
      text
    }, {
      telegramBot: this
    }).send()
  }

  removeMessageText(chatId, messageId, options) {
    return this.editMessageText(chatId, messageId, FormattedText.MAGICK_CHAR, options)
  }

  editInlineMessageText(id, text, options) {
    return new requests.EditMessageTextRequest({
      ...options,
      inlineMessageId: id,
      text
    }, {
      telegramBot: this
    }).send()
  }

  removeInlineMessageText(id, options) {
    return this.editInlineMessageText(id, FormattedText.MAGICK_CHAR, options)
  }

  editMessageCaption(chatId, messageId, caption, options) {
    return new requests.EditMessageCaptionRequest({
      ...options,
      chatId,
      messageId,
      caption
    }, {
      telegramBot: this
    }).send()
  }

  removeMessageCaption(chatId, messageId, options) {
    return this.editMessageCaption(chatId, messageId, '', options)
  }

  editInlineMessageCaption(id, caption, options) {
    return new requests.EditMessageCaptionRequest({
      ...options,
      inlineMessageId: id,
      caption
    }, {
      telegramBot: this
    }).send()
  }

  removeInlineMessageCaption(id, options) {
    return this.editInlineMessageCaption(id, '', options)
  }

  editMessageMedia(chatId, messageId, media, options) {
    return new requests.EditMessageMediaRequest({
      ...options,
      chatId,
      messageId,
      media
    }, {
      telegramBot: this
    }).send()
  }

  editInlineMessageMedia(id, media, options) {
    return new requests.EditMessageMediaRequest({
      ...options,
      inlineMessageId: id,
      media
    }, {
      telegramBot: this
    }).send()
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup) {
    return new requests.EditMessageReplyMarkupRequest({
      chatId,
      messageId,
      replyMarkup
    }, {
      telegramBot: this
    }).send()
  }

  removeMessageReplyMarkup(chatId, messageId) {
    return this.editMessageReplyMarkup(chatId, messageId)
  }

  editInlineMessageReplyMarkup(id, replyMarkup) {
    return new requests.EditMessageReplyMarkupRequest({
      inlineMessageId: id,
      replyMarkup
    }, {
      telegramBot: this
    }).send()
  }

  removeInlineMessageReplyMarkup(id) {
    return this.editInlineMessageReplyMarkup(id)
  }

  stopPoll(chatId, messageId, options) {
    return new requests.StopPollRequest({
      ...options,
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  deleteMessage(chatId, messageId) {
    return new requests.DeleteMessageRequest({
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  sendSticker(chatId, sticker, options) {
    return new requests.SendStickerRequest({
      ...options,
      chatId,
      sticker
    }, {
      telegramBot: this
    }).send()
  }

  getStickerSet(name) {
    return new requests.GetStickerSetRequest({
      name
    }, {
      telegramBot: this
    }).send()
  }

  uploadStickerFile(userId, sticker) {
    return new requests.UploadStickerFileRequest({
      userId,
      pngSticker: sticker
    }, {
      telegramBot: this
    }).send()
  }

  createNewStickerSet(userId, name, title, sticker, emojis, options) {
    return new requests.CreateNewStickerSetRequest({
      ...options,
      userId,
      name,
      title,
      pngSticker: sticker,
      emojis
    }, {
      telegramBot: this
    }).send()
  }

  createNewAnimatedStickerSet(userId, name, title, sticker, emojis, options) {
    return new requests.CreateNewStickerSetRequest({
      ...options,
      userId,
      name,
      title,
      tgsSticker: sticker,
      emojis
    }, {
      telegramBot: this
    }).send()
  }

  addStickerToSet(userId, name, sticker, emojis, options) {
    return new requests.AddStickerToSetRequest({
      ...options,
      userId,
      name,
      pngSticker: sticker,
      emojis
    }, {
      telegramBot: this
    }).send()
  }

  addAnimatedStickerToSet(userId, name, sticker, emojis, options) {
    return new requests.AddStickerToSetRequest({
      ...options,
      userId,
      name,
      tgsSticker: sticker,
      emojis
    }, {
      telegramBot: this
    }).send()
  }

  setStickerPositionInSet(sticker, position) {
    return new requests.SetStickerPositionInSetRequest({
      sticker,
      position
    }, {
      telegramBot: this
    }).send()
  }

  deleteStickerFromSet(sticker) {
    return new requests.DeleteStickerFromSetRequest({
      sticker
    }, {
      telegramBot: this
    }).send()
  }

  setStickerSetThumb(userId, name, thumb) {
    return new requests.SetStickerSetThumbRequest({
      userId,
      name,
      thumb
    }, {
      telegramBot: this
    }).send()
  }

  removeStickerSetThumb(userId, name) {
    return this.setStickerSetThumb(userId, name)
  }

  answerInlineQuery(id, results, options) {
    return new requests.AnswerInlineQueryRequest({
      ...options,
      id,
      results
    }, {
      telegramBot: this
    }).send()
  }

  sendInvoice(chatId, providerToken, title, description, currency, prices, payload, startParameter, options) {
    return new requests.SendInvoiceRequest({
      ...options,
      chatId,
      providerToken,
      title,
      description,
      currency,
      prices,
      payload,
      startParameter
    }, {
      telegramBot: this
    }).send()
  }

  answerShippingQuery(id, shippingOptions) {
    return new requests.AnswerShippingQueryRequest({
      id,
      ok: true,
      shippingOptions
    }, {
      telegramBot: this
    }).send()
  }

  answerShippingQueryError(id, errorMessage) {
    return new requests.AnswerShippingQueryRequest({
      id,
      ok: false,
      errorMessage
    }, {
      telegramBot: this
    }).send()
  }

  answerPreCheckoutQuery(id) {
    return new requests.AnswerPreCheckoutQueryRequest({
      id,
      ok: true
    }, {
      telegramBot: this
    }).send()
  }

  answerPreCheckoutQueryError(id, errorMessage) {
    return new requests.AnswerPreCheckoutQueryRequest({
      id,
      ok: false,
      errorMessage
    }, {
      telegramBot: this
    }).send()
  }

  setPassportDataErrors(userId, errors) {
    return new requests.SetPassportDataErrorsRequest({
      userId,
      errors
    }, {
      telegramBot: this
    }).send()
  }

  sendGame(chatId, gameShortName, options) {
    return new requests.SendGameRequest({
      ...options,
      chatId,
      gameShortName
    }, {
      telegramBot: this
    }).send()
  }

  setGameScore(chatId, messageId, userId, score, options) {
    return new requests.SetGameScoreRequest({
      ...options,
      chatId,
      messageId,
      userId,
      score
    }, {
      telegramBot: this
    }).send()
  }

  setInlineGameScore(id, userId, score, options) {
    return new requests.SetGameScoreRequest({
      ...options,
      inlineMessageId: id,
      userId,
      score
    }, {
      telegramBot: this
    }).send()
  }

  getGameHighScores(chatId, messageId, userId) {
    return new requests.GetGameHighScoresRequest({
      chatId,
      messageId,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  getInlineGameHighScores(id, userId) {
    return new requests.GetGameHighScoresRequest({
      inlineMessageId: id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  processUpdate(params, callback) {
    const update = types.Update.fromParams(params, {
      telegramBot: this
    })
    if (callback) {
      callback(update)
    }
    return update
  }
}
TelegramBot.API_URL = 'https://api.telegram.org'
TelegramBot.BOT_API_URL = `${TelegramBot.API_URL}/bot`
TelegramBot.BOT_FILE_STORAGE_URL = `${TelegramBot.API_URL}/file/bot`
TelegramBot.WEBHOOK_SUBNETS = [
  '149.154.160.0/20',
  '91.108.4.0/22'
]
TelegramBot.settings = {
  ignoreErrors: false,
  autoMigrateToChats: true
}
TelegramBot.types = types
TelegramBot.requests = requests
TelegramBot.errors = errors
TelegramBot.constants = constants
TelegramBot.from = (token, settings) => new TelegramBot(token, settings)
Object.defineProperty(TelegramBot, 'Response', {
  get: () => types.Response
})
Object.defineProperty(TelegramBot, 'ResponseParameters', {
  get: () => types.ResponseParameters
})
Object.defineProperty(TelegramBot, 'Update', {
  get: () => types.Update
})
Object.defineProperty(TelegramBot, 'WebhookInfo', {
  get: () => types.WebhookInfo
})
Object.defineProperty(TelegramBot, 'User', {
  get: () => types.User
})
Object.defineProperty(TelegramBot, 'Chat', {
  get: () => types.Chat
})
Object.defineProperty(TelegramBot, 'Message', {
  get: () => types.Message
})
Object.defineProperty(TelegramBot, 'MessageId', {
  get: () => types.MessageId
})
Object.defineProperty(TelegramBot, 'MessageReply', {
  get: () => types.MessageReply
})
Object.defineProperty(TelegramBot, 'MessageEntity', {
  get: () => types.MessageEntity
})
Object.defineProperty(TelegramBot, 'PhotoSize', {
  get: () => types.PhotoSize
})
Object.defineProperty(TelegramBot, 'Animation', {
  get: () => types.Animation
})
Object.defineProperty(TelegramBot, 'Audio', {
  get: () => types.Audio
})
Object.defineProperty(TelegramBot, 'Document', {
  get: () => types.Document
})
Object.defineProperty(TelegramBot, 'Video', {
  get: () => types.Video
})
Object.defineProperty(TelegramBot, 'VideoNote', {
  get: () => types.VideoNote
})
Object.defineProperty(TelegramBot, 'Voice', {
  get: () => types.Voice
})
Object.defineProperty(TelegramBot, 'Contact', {
  get: () => types.Contact
})
Object.defineProperty(TelegramBot, 'Dice', {
  get: () => types.Dice
})
Object.defineProperty(TelegramBot, 'PollOption', {
  get: () => types.PollOption
})
Object.defineProperty(TelegramBot, 'PollAnswer', {
  get: () => types.PollAnswer
})
Object.defineProperty(TelegramBot, 'Poll', {
  get: () => types.Poll
})
Object.defineProperty(TelegramBot, 'Location', {
  get: () => types.Location
})
Object.defineProperty(TelegramBot, 'Venue', {
  get: () => types.Venue
})
Object.defineProperty(TelegramBot, 'ProximityAlertTriggered', {
  get: () => types.ProximityAlertTriggered
})
Object.defineProperty(TelegramBot, 'UserProfilePhotos', {
  get: () => types.UserProfilePhotos
})
Object.defineProperty(TelegramBot, 'File', {
  get: () => types.File
})
Object.defineProperty(TelegramBot, 'ReplyKeyboardMarkup', {
  get: () => types.ReplyKeyboardMarkup
})
Object.defineProperty(TelegramBot, 'Keyboard', {
  get: () => types.Keyboard
})
Object.defineProperty(TelegramBot, 'KeyboardButton', {
  get: () => types.KeyboardButton
})
Object.defineProperty(TelegramBot, 'KeyboardButtonPollType', {
  get: () => types.KeyboardButtonPollType
})
Object.defineProperty(TelegramBot, 'ReplyKeyboardRemove', {
  get: () => types.ReplyKeyboardRemove
})
Object.defineProperty(TelegramBot, 'InlineKeyboardMarkup', {
  get: () => types.InlineKeyboardMarkup
})
Object.defineProperty(TelegramBot, 'InlineKeyboard', {
  get: () => types.InlineKeyboard
})
Object.defineProperty(TelegramBot, 'InlineKeyboardButton', {
  get: () => types.InlineKeyboardButton
})
Object.defineProperty(TelegramBot, 'LoginUrl', {
  get: () => types.LoginUrl
})
Object.defineProperty(TelegramBot, 'CallbackQuery', {
  get: () => types.CallbackQuery
})
Object.defineProperty(TelegramBot, 'ForceReply', {
  get: () => types.ForceReply
})
Object.defineProperty(TelegramBot, 'ChatPhoto', {
  get: () => types.ChatPhoto
})
Object.defineProperty(TelegramBot, 'ChatMember', {
  get: () => types.ChatMember
})
Object.defineProperty(TelegramBot, 'ChatPermissions', {
  get: () => types.ChatPermissions
})
Object.defineProperty(TelegramBot, 'ChatLocation', {
  get: () => types.ChatLocation
})
Object.defineProperty(TelegramBot, 'BotCommand', {
  get: () => types.BotCommand
})
Object.defineProperty(TelegramBot, 'InputMedia', {
  get: () => types.InputMedia
})
Object.defineProperty(TelegramBot, 'InputMediaPhoto', {
  get: () => types.InputMediaPhoto
})
Object.defineProperty(TelegramBot, 'InputMediaVideo', {
  get: () => types.InputMediaVideo
})
Object.defineProperty(TelegramBot, 'InputMediaAnimation', {
  get: () => types.InputMediaAnimation
})
Object.defineProperty(TelegramBot, 'InputMediaAudio', {
  get: () => types.InputMediaAudio
})
Object.defineProperty(TelegramBot, 'InputMediaDocument', {
  get: () => types.InputMediaDocument
})
Object.defineProperty(TelegramBot, 'InputFile', {
  get: () => types.InputFile
})
Object.defineProperty(TelegramBot, 'Sticker', {
  get: () => types.Sticker
})
Object.defineProperty(TelegramBot, 'StickerSet', {
  get: () => types.StickerSet
})
Object.defineProperty(TelegramBot, 'MaskPosition', {
  get: () => types.MaskPosition
})
Object.defineProperty(TelegramBot, 'InlineQuery', {
  get: () => types.InlineQuery
})
Object.defineProperty(TelegramBot, 'InlineQueryResult', {
  get: () => types.InlineQueryResult
})
Object.defineProperty(TelegramBot, 'InlineQueryResultArticle', {
  get: () => types.InlineQueryResultArticle
})
Object.defineProperty(TelegramBot, 'InlineQueryResultPhoto', {
  get: () => types.InlineQueryResultPhoto
})
Object.defineProperty(TelegramBot, 'InlineQueryResultGif', {
  get: () => types.InlineQueryResultGif
})
Object.defineProperty(TelegramBot, 'InlineQueryResultMpeg4Gif', {
  get: () => types.InlineQueryResultMpeg4Gif
})
Object.defineProperty(TelegramBot, 'InlineQueryResultVideo', {
  get: () => types.InlineQueryResultVideo
})
Object.defineProperty(TelegramBot, 'InlineQueryResultAudio', {
  get: () => types.InlineQueryResultAudio
})
Object.defineProperty(TelegramBot, 'InlineQueryResultVoice', {
  get: () => types.InlineQueryResultVoice
})
Object.defineProperty(TelegramBot, 'InlineQueryResultDocument', {
  get: () => types.InlineQueryResultDocument
})
Object.defineProperty(TelegramBot, 'InlineQueryResultLocation', {
  get: () => types.InlineQueryResultLocation
})
Object.defineProperty(TelegramBot, 'InlineQueryResultVenue', {
  get: () => types.InlineQueryResultVenue
})
Object.defineProperty(TelegramBot, 'InlineQueryResultContact', {
  get: () => types.InlineQueryResultContact
})
Object.defineProperty(TelegramBot, 'InlineQueryResultGame', {
  get: () => types.InlineQueryResultGame
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedPhoto', {
  get: () => types.InlineQueryResultCachedPhoto
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedGif', {
  get: () => types.InlineQueryResultCachedGif
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedMpeg4Gif', {
  get: () => types.InlineQueryResultCachedMpeg4Gif
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedSticker', {
  get: () => types.InlineQueryResultCachedSticker
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedDocument', {
  get: () => types.InlineQueryResultCachedDocument
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedVideo', {
  get: () => types.InlineQueryResultCachedVideo
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedVoice', {
  get: () => types.InlineQueryResultCachedVoice
})
Object.defineProperty(TelegramBot, 'InlineQueryResultCachedAudio', {
  get: () => types.InlineQueryResultCachedAudio
})
Object.defineProperty(TelegramBot, 'InputMessageContent', {
  get: () => types.InputMessageContent
})
Object.defineProperty(TelegramBot, 'InputTextMessageContent', {
  get: () => types.InputTextMessageContent
})
Object.defineProperty(TelegramBot, 'InputLocationMessageContent', {
  get: () => types.InputLocationMessageContent
})
Object.defineProperty(TelegramBot, 'InputVenueMessageContent', {
  get: () => types.InputVenueMessageContent
})
Object.defineProperty(TelegramBot, 'InputContactMessageContent', {
  get: () => types.InputContactMessageContent
})
Object.defineProperty(TelegramBot, 'ChosenInlineResult', {
  get: () => types.ChosenInlineResult
})
Object.defineProperty(TelegramBot, 'LabeledPrice', {
  get: () => types.LabeledPrice
})
Object.defineProperty(TelegramBot, 'Invoice', {
  get: () => types.Invoice
})
Object.defineProperty(TelegramBot, 'ShippingAddress', {
  get: () => types.ShippingAddress
})
Object.defineProperty(TelegramBot, 'OrderInfo', {
  get: () => types.OrderInfo
})
Object.defineProperty(TelegramBot, 'ShippingOption', {
  get: () => types.ShippingOption
})
Object.defineProperty(TelegramBot, 'SuccessfulPayment', {
  get: () => types.SuccessfulPayment
})
Object.defineProperty(TelegramBot, 'ShippingQuery', {
  get: () => types.ShippingQuery
})
Object.defineProperty(TelegramBot, 'PreCheckoutQuery', {
  get: () => types.PreCheckoutQuery
})
Object.defineProperty(TelegramBot, 'PassportData', {
  get: () => types.PassportData
})
Object.defineProperty(TelegramBot, 'PassportFile', {
  get: () => types.PassportFile
})
Object.defineProperty(TelegramBot, 'EncryptedPassportElement', {
  get: () => types.EncryptedPassportElement
})
Object.defineProperty(TelegramBot, 'EncryptedCredentials', {
  get: () => types.EncryptedCredentials
})
Object.defineProperty(TelegramBot, 'PassportElementError', {
  get: () => types.PassportElementError
})
Object.defineProperty(TelegramBot, 'PassportElementErrorDataField', {
  get: () => types.PassportElementErrorDataField
})
Object.defineProperty(TelegramBot, 'PassportElementErrorFrontSide', {
  get: () => types.PassportElementErrorFrontSide
})
Object.defineProperty(TelegramBot, 'PassportElementErrorReverseSide', {
  get: () => types.PassportElementErrorReverseSide
})
Object.defineProperty(TelegramBot, 'PassportElementErrorSelfie', {
  get: () => types.PassportElementErrorSelfie
})
Object.defineProperty(TelegramBot, 'PassportElementErrorFile', {
  get: () => types.PassportElementErrorFile
})
Object.defineProperty(TelegramBot, 'PassportElementErrorFiles', {
  get: () => types.PassportElementErrorFiles
})
Object.defineProperty(TelegramBot, 'PassportElementErrorTranslationFile', {
  get: () => types.PassportElementErrorTranslationFile
})
Object.defineProperty(TelegramBot, 'PassportElementErrorTranslationFiles', {
  get: () => types.PassportElementErrorTranslationFiles
})
Object.defineProperty(TelegramBot, 'PassportElementErrorUnspecified', {
  get: () => types.PassportElementErrorUnspecified
})
Object.defineProperty(TelegramBot, 'Game', {
  get: () => types.Game
})
Object.defineProperty(TelegramBot, 'CallbackGame', {
  get: () => types.CallbackGame
})
Object.defineProperty(TelegramBot, 'GameHighScore', {
  get: () => types.GameHighScore
})
Object.defineProperty(TelegramBot, 'FormattedText', {
  get: () => types.FormattedText
})
Object.defineProperty(TelegramBot, 'MarkdownText', {
  get: () => types.MarkdownText
})
Object.defineProperty(TelegramBot, 'MarkdownV2Text', {
  get: () => types.MarkdownV2Text
})
Object.defineProperty(TelegramBot, 'HtmlText', {
  get: () => types.HtmlText
})
Object.defineProperty(TelegramBot, 'GetUpdatesRequest', {
  get: () => requests.GetUpdatesRequest
})
Object.defineProperty(TelegramBot, 'SetWebhookRequest', {
  get: () => requests.SetWebhookRequest
})
Object.defineProperty(TelegramBot, 'DeleteWebhookRequest', {
  get: () => requests.DeleteWebhookRequest
})
Object.defineProperty(TelegramBot, 'GetWebhookInfoRequest', {
  get: () => requests.GetWebhookInfoRequest
})
Object.defineProperty(TelegramBot, 'GetMeRequest', {
  get: () => requests.GetMeRequest
})
Object.defineProperty(TelegramBot, 'LogOutRequest', {
  get: () => requests.LogOutRequest
})
Object.defineProperty(TelegramBot, 'CloseRequest', {
  get: () => requests.CloseRequest
})
Object.defineProperty(TelegramBot, 'SendMessageRequest', {
  get: () => requests.SendMessageRequest
})
Object.defineProperty(TelegramBot, 'ForwardMessageRequest', {
  get: () => requests.ForwardMessageRequest
})
Object.defineProperty(TelegramBot, 'CopyMessageRequest', {
  get: () => requests.CopyMessageRequest
})
Object.defineProperty(TelegramBot, 'SendPhotoRequest', {
  get: () => requests.SendPhotoRequest
})
Object.defineProperty(TelegramBot, 'SendAudioRequest', {
  get: () => requests.SendAudioRequest
})
Object.defineProperty(TelegramBot, 'SendDocumentRequest', {
  get: () => requests.SendDocumentRequest
})
Object.defineProperty(TelegramBot, 'SendVideoRequest', {
  get: () => requests.SendVideoRequest
})
Object.defineProperty(TelegramBot, 'SendAnimationRequest', {
  get: () => requests.SendAnimationRequest
})
Object.defineProperty(TelegramBot, 'SendVoiceRequest', {
  get: () => requests.SendVoiceRequest
})
Object.defineProperty(TelegramBot, 'SendVideoNoteRequest', {
  get: () => requests.SendVideoNoteRequest
})
Object.defineProperty(TelegramBot, 'SendMediaGroupRequest', {
  get: () => requests.SendMediaGroupRequest
})
Object.defineProperty(TelegramBot, 'SendLocationRequest', {
  get: () => requests.SendLocationRequest
})
Object.defineProperty(TelegramBot, 'EditMessageLiveLocationRequest', {
  get: () => requests.EditMessageLiveLocationRequest
})
Object.defineProperty(TelegramBot, 'StopMessageLiveLocationRequest', {
  get: () => requests.StopMessageLiveLocationRequest
})
Object.defineProperty(TelegramBot, 'SendVenueRequest', {
  get: () => requests.SendVenueRequest
})
Object.defineProperty(TelegramBot, 'SendContactRequest', {
  get: () => requests.SendContactRequest
})
Object.defineProperty(TelegramBot, 'SendPollRequest', {
  get: () => requests.SendPollRequest
})
Object.defineProperty(TelegramBot, 'SendDiceRequest', {
  get: () => requests.SendDiceRequest
})
Object.defineProperty(TelegramBot, 'SendChatActionRequest', {
  get: () => requests.SendChatActionRequest
})
Object.defineProperty(TelegramBot, 'GetUserProfilePhotosRequest', {
  get: () => requests.GetUserProfilePhotosRequest
})
Object.defineProperty(TelegramBot, 'GetFileRequest', {
  get: () => requests.GetFileRequest
})
Object.defineProperty(TelegramBot, 'DownloadFileByPathRequest', {
  get: () => requests.DownloadFileByPathRequest
})
Object.defineProperty(TelegramBot, 'KickChatMemberRequest', {
  get: () => requests.KickChatMemberRequest
})
Object.defineProperty(TelegramBot, 'UnbanChatMemberRequest', {
  get: () => requests.UnbanChatMemberRequest
})
Object.defineProperty(TelegramBot, 'RestrictChatMemberRequest', {
  get: () => requests.RestrictChatMemberRequest
})
Object.defineProperty(TelegramBot, 'PromoteChatMemberRequest', {
  get: () => requests.PromoteChatMemberRequest
})
Object.defineProperty(TelegramBot, 'SetChatAdminCustomTitleRequest', {
  get: () => requests.SetChatAdminCustomTitleRequest
})
Object.defineProperty(TelegramBot, 'SetChatPermissionsRequest', {
  get: () => requests.SetChatPermissionsRequest
})
Object.defineProperty(TelegramBot, 'ExportChatInviteLinkRequest', {
  get: () => requests.ExportChatInviteLinkRequest
})
Object.defineProperty(TelegramBot, 'SetChatPhotoRequest', {
  get: () => requests.SetChatPhotoRequest
})
Object.defineProperty(TelegramBot, 'DeleteChatPhotoRequest', {
  get: () => requests.DeleteChatPhotoRequest
})
Object.defineProperty(TelegramBot, 'SetChatTitleRequest', {
  get: () => requests.SetChatTitleRequest
})
Object.defineProperty(TelegramBot, 'SetChatDescriptionRequest', {
  get: () => requests.SetChatDescriptionRequest
})
Object.defineProperty(TelegramBot, 'PinChatMessageRequest', {
  get: () => requests.PinChatMessageRequest
})
Object.defineProperty(TelegramBot, 'UnpinChatMessageRequest', {
  get: () => requests.UnpinChatMessageRequest
})
Object.defineProperty(TelegramBot, 'UnpinAllChatMessagesRequest', {
  get: () => requests.UnpinAllChatMessagesRequest
})
Object.defineProperty(TelegramBot, 'LeaveChatRequest', {
  get: () => requests.LeaveChatRequest
})
Object.defineProperty(TelegramBot, 'GetChatRequest', {
  get: () => requests.GetChatRequest
})
Object.defineProperty(TelegramBot, 'GetChatAdminsRequest', {
  get: () => requests.GetChatAdminsRequest
})
Object.defineProperty(TelegramBot, 'GetChatMembersCountRequest', {
  get: () => requests.GetChatMembersCountRequest
})
Object.defineProperty(TelegramBot, 'GetChatMemberRequest', {
  get: () => requests.GetChatMemberRequest
})
Object.defineProperty(TelegramBot, 'SetChatStickerSetRequest', {
  get: () => requests.SetChatStickerSetRequest
})
Object.defineProperty(TelegramBot, 'DeleteChatStickerSetRequest', {
  get: () => requests.DeleteChatStickerSetRequest
})
Object.defineProperty(TelegramBot, 'AnswerCallbackQueryRequest', {
  get: () => requests.AnswerCallbackQueryRequest
})
Object.defineProperty(TelegramBot, 'SetMyCommandsRequest', {
  get: () => requests.SetMyCommandsRequest
})
Object.defineProperty(TelegramBot, 'GetMyCommandsRequest', {
  get: () => requests.GetMyCommandsRequest
})
Object.defineProperty(TelegramBot, 'EditMessageTextRequest', {
  get: () => requests.EditMessageTextRequest
})
Object.defineProperty(TelegramBot, 'EditMessageCaptionRequest', {
  get: () => requests.EditMessageCaptionRequest
})
Object.defineProperty(TelegramBot, 'EditMessageMediaRequest', {
  get: () => requests.EditMessageMediaRequest
})
Object.defineProperty(TelegramBot, 'EditMessageReplyMarkupRequest', {
  get: () => requests.EditMessageReplyMarkupRequest
})
Object.defineProperty(TelegramBot, 'StopPollRequest', {
  get: () => requests.StopPollRequest
})
Object.defineProperty(TelegramBot, 'DeleteMessageRequest', {
  get: () => requests.DeleteMessageRequest
})
Object.defineProperty(TelegramBot, 'SendStickerRequest', {
  get: () => requests.SendStickerRequest
})
Object.defineProperty(TelegramBot, 'GetStickerSetRequest', {
  get: () => requests.GetStickerSetRequest
})
Object.defineProperty(TelegramBot, 'UploadStickerFileRequest', {
  get: () => requests.UploadStickerFileRequest
})
Object.defineProperty(TelegramBot, 'CreateNewStickerSetRequest', {
  get: () => requests.CreateNewStickerSetRequest
})
Object.defineProperty(TelegramBot, 'AddStickerToSetRequest', {
  get: () => requests.AddStickerToSetRequest
})
Object.defineProperty(TelegramBot, 'SetStickerPositionInSetRequest', {
  get: () => requests.SetStickerPositionInSetRequest
})
Object.defineProperty(TelegramBot, 'DeleteStickerFromSetRequest', {
  get: () => requests.DeleteStickerFromSetRequest
})
Object.defineProperty(TelegramBot, 'SetStickerSetThumbRequest', {
  get: () => requests.SetStickerSetThumbRequest
})
Object.defineProperty(TelegramBot, 'AnswerInlineQueryRequest', {
  get: () => requests.AnswerInlineQueryRequest
})
Object.defineProperty(TelegramBot, 'SendInvoiceRequest', {
  get: () => requests.SendInvoiceRequest
})
Object.defineProperty(TelegramBot, 'AnswerShippingQueryRequest', {
  get: () => requests.AnswerShippingQueryRequest
})
Object.defineProperty(TelegramBot, 'AnswerPreCheckoutQueryRequest', {
  get: () => requests.AnswerPreCheckoutQueryRequest
})
Object.defineProperty(TelegramBot, 'SetPassportDataErrorsRequest', {
  get: () => requests.SetPassportDataErrorsRequest
})
Object.defineProperty(TelegramBot, 'SendGameRequest', {
  get: () => requests.SendGameRequest
})
Object.defineProperty(TelegramBot, 'SetGameScoreRequest', {
  get: () => requests.SetGameScoreRequest
})
Object.defineProperty(TelegramBot, 'GetGameHighScoresRequest', {
  get: () => requests.GetGameHighScoresRequest
})
Object.defineProperty(TelegramBot, 'Error', {
  get: () => errors.Error
})
Object.defineProperty(TelegramBot, 'UnauthorizedError', {
  get: () => errors.UnauthorizedError
})
Object.defineProperty(TelegramBot, 'BadRequestError', {
  get: () => errors.BadRequestError
})
Object.defineProperty(TelegramBot, 'ForbiddenError', {
  get: () => errors.ForbiddenError
})
Object.defineProperty(TelegramBot, 'NotFoundError', {
  get: () => errors.NotFoundError
})
Object.defineProperty(TelegramBot, 'TooManyRequestsError', {
  get: () => errors.TooManyRequestsError
})
Object.defineProperty(TelegramBot, 'InvalidBotTokenError', {
  get: () => errors.InvalidBotTokenError
})
Object.defineProperty(TelegramBot, 'BotBlockedByUserError', {
  get: () => errors.BotBlockedByUserError
})
Object.defineProperty(TelegramBot, 'ChatMigratedError', {
  get: () => errors.ChatMigratedError
})
Object.defineProperty(TelegramBot, 'InlineModeDisabledError', {
  get: () => errors.InlineModeDisabledError
})
Object.defineProperty(TelegramBot, 'UserNotFoundError', {
  get: () => errors.UserNotFoundError
})
Object.defineProperty(TelegramBot, 'ChatNotFoundError', {
  get: () => errors.ChatNotFoundError
})
Object.defineProperty(TelegramBot, 'MessageNotFoundError', {
  get: () => errors.MessageNotFoundError
})
Object.defineProperty(TelegramBot, 'ReplyMessageNotFoundError', {
  get: () => errors.ReplyMessageNotFoundError
})
Object.defineProperty(TelegramBot, 'FileNotFoundError', {
  get: () => errors.FileNotFoundError
})
Object.defineProperty(TelegramBot, 'StickerSetNotFoundError', {
  get: () => errors.StickerSetNotFoundError
})
Object.defineProperty(TelegramBot, 'InvalidCallbackQueryError', {
  get: () => errors.InvalidCallbackQueryError
})
Object.defineProperty(TelegramBot, 'InvalidInlineQueryError', {
  get: () => errors.InvalidInlineQueryError
})
Object.defineProperty(TelegramBot, 'InvalidShippingQueryError', {
  get: () => errors.InvalidShippingQueryError
})
Object.defineProperty(TelegramBot, 'InvalidPreCheckoutQueryError', {
  get: () => errors.InvalidPreCheckoutQueryError
})
Object.defineProperty(TelegramBot, 'UnknownError', {
  get: () => errors.UnknownError
})
Object.defineProperty(TelegramBot, 'EventType', {
  get: () => constants.EventType
})
Object.defineProperty(TelegramBot, 'UpdateType', {
  get: () => constants.UpdateType
})
Object.defineProperty(TelegramBot, 'ParseMode', {
  get: () => constants.ParseMode
})
Object.defineProperty(TelegramBot, 'ChatType', {
  get: () => constants.ChatType
})
Object.defineProperty(TelegramBot, 'MessageType', {
  get: () => constants.MessageType
})
Object.defineProperty(TelegramBot, 'MessageEntityType', {
  get: () => constants.MessageEntityType
})
Object.defineProperty(TelegramBot, 'PollType', {
  get: () => constants.PollType
})
Object.defineProperty(TelegramBot, 'DiceEmoji', {
  get: () => constants.DiceEmoji
})
Object.defineProperty(TelegramBot, 'ChatAction', {
  get: () => constants.ChatAction
})
Object.defineProperty(TelegramBot, 'ChatMemberStatus', {
  get: () => constants.ChatMemberStatus
})
Object.defineProperty(TelegramBot, 'MediaType', {
  get: () => constants.MediaType
})
Object.defineProperty(TelegramBot, 'MaskPositionPoint', {
  get: () => constants.MaskPositionPoint
})
Object.defineProperty(TelegramBot, 'InlineQueryResultType', {
  get: () => constants.InlineQueryResultType
})
Object.defineProperty(TelegramBot, 'PassportElementType', {
  get: () => constants.PassportElementType
})
Object.defineProperty(TelegramBot, 'PassportElementErrorSource', {
  get: () => constants.PassportElementErrorSource
})

module.exports = TelegramBot
