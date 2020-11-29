const EventEmitter = require('events')
const fetch = require('node-fetch')
const FormData = require('form-data')
const Helper = require('@darkwolf/helper.cjs')
const types = require('./types')
const requests = require('./requests')
const errors = require('./errors')
const constants = require('./constants')
const {
  Response,
  ResponseParameters,
  Update,
  WebhookInfo,
  User,
  Chat,
  Message,
  MessageId,
  MessageReply,
  MessageEntity,
  PhotoSize,
  Animation,
  Audio,
  Document,
  Video,
  VideoNote,
  Voice,
  Contact,
  Dice,
  PollOption,
  PollAnswer,
  Poll,
  Location,
  Venue,
  ProximityAlertTriggered,
  UserProfilePhotos,
  File,
  ReplyKeyboardMarkup,
  Keyboard,
  KeyboardButton,
  KeyboardButtonPollType,
  ReplyKeyboardRemove,
  InlineKeyboardMarkup,
  InlineKeyboard,
  InlineKeyboardButton,
  LoginUrl,
  CallbackQuery,
  ForceReply,
  ChatPhoto,
  ChatMember,
  ChatPermissions,
  ChatLocation,
  BotCommand,
  InputMedia,
  InputMediaPhoto,
  InputMediaVideo,
  InputMediaAnimation,
  InputMediaAudio,
  InputMediaDocument,
  InputFile,
  Sticker,
  StickerSet,
  MaskPosition,
  InlineQuery,
  InlineQueryResult,
  InlineQueryResultArticle,
  InlineQueryResultPhoto,
  InlineQueryResultGif,
  InlineQueryResultMpeg4Gif,
  InlineQueryResultVideo,
  InlineQueryResultAudio,
  InlineQueryResultVoice,
  InlineQueryResultDocument,
  InlineQueryResultLocation,
  InlineQueryResultVenue,
  InlineQueryResultContact,
  InlineQueryResultGame,
  InlineQueryResultCachedPhoto,
  InlineQueryResultCachedGif,
  InlineQueryResultCachedMpeg4Gif,
  InlineQueryResultCachedSticker,
  InlineQueryResultCachedDocument,
  InlineQueryResultCachedVideo,
  InlineQueryResultCachedVoice,
  InlineQueryResultCachedAudio,
  InputMessageContent,
  InputTextMessageContent,
  InputLocationMessageContent,
  InputVenueMessageContent,
  InputContactMessageContent,
  ChosenInlineResult,
  LabeledPrice,
  Invoice,
  ShippingAddress,
  OrderInfo,
  ShippingOption,
  SuccessfulPayment,
  ShippingQuery,
  PreCheckoutQuery,
  PassportData,
  PassportFile,
  EncryptedPassportElement,
  EncryptedCredentials,
  PassportElementError,
  PassportElementErrorDataField,
  PassportElementErrorFrontSide,
  PassportElementErrorReverseSide,
  PassportElementErrorSelfie,
  PassportElementErrorFile,
  PassportElementErrorFiles,
  PassportElementErrorTranslationFile,
  PassportElementErrorTranslationFiles,
  PassportElementErrorUnspecified,
  Game,
  CallbackGame,
  GameHighScore,
  FormattedText,
  MarkdownText,
  MarkdownV2Text,
  HtmlText
} = types
const {
  GetUpdatesRequest,
  SetWebhookRequest,
  DeleteWebhookRequest,
  GetWebhookInfoRequest,
  GetMeRequest,
  LogOutRequest,
  CloseRequest,
  SendMessageRequest,
  ForwardMessageRequest,
  CopyMessageRequest,
  SendPhotoRequest,
  SendAudioRequest,
  SendDocumentRequest,
  SendVideoRequest,
  SendAnimationRequest,
  SendVoiceRequest,
  SendVideoNoteRequest,
  SendMediaGroupRequest,
  SendLocationRequest,
  EditMessageLiveLocationRequest,
  StopMessageLiveLocationRequest,
  SendVenueRequest,
  SendContactRequest,
  SendPollRequest,
  SendDiceRequest,
  SendChatActionRequest,
  GetUserProfilePhotosRequest,
  GetFileRequest,
  DownloadFileByPathRequest,
  KickChatMemberRequest,
  UnbanChatMemberRequest,
  RestrictChatMemberRequest,
  PromoteChatMemberRequest,
  SetChatAdminCustomTitleRequest,
  SetChatPermissionsRequest,
  ExportChatInviteLinkRequest,
  SetChatPhotoRequest,
  DeleteChatPhotoRequest,
  SetChatTitleRequest,
  SetChatDescriptionRequest,
  PinChatMessageRequest,
  UnpinChatMessageRequest,
  UnpinAllChatMessagesRequest,
  LeaveChatRequest,
  GetChatRequest,
  GetChatAdminsRequest,
  GetChatMembersCountRequest,
  GetChatMemberRequest,
  SetChatStickerSetRequest,
  DeleteChatStickerSetRequest,
  AnswerCallbackQueryRequest,
  SetMyCommandsRequest,
  GetMyCommandsRequest,
  EditMessageTextRequest,
  EditMessageCaptionRequest,
  EditMessageMediaRequest,
  EditMessageReplyMarkupRequest,
  StopPollRequest,
  DeleteMessageRequest,
  SendStickerRequest,
  GetStickerSetRequest,
  UploadStickerFileRequest,
  CreateNewStickerSetRequest,
  AddStickerToSetRequest,
  SetStickerPositionInSetRequest,
  DeleteStickerFromSetRequest,
  SetStickerSetThumbRequest,
  AnswerInlineQueryRequest,
  SendInvoiceRequest,
  AnswerShippingQueryRequest,
  AnswerPreCheckoutQueryRequest,
  SetPassportDataErrorsRequest,
  SendGameRequest,
  SetGameScoreRequest,
  GetGameHighScoresRequest
} = requests
const {
  Error,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  InvalidBotTokenError,
  BotBlockedByUserError,
  ChatMigratedError,
  InlineModeDisabledError,
  UserNotFoundError,
  ChatNotFoundError,
  MessageNotFoundError,
  ReplyMessageNotFoundError,
  FileNotFoundError,
  StickerSetNotFoundError,
  InvalidCallbackQueryError,
  InvalidInlineQueryError,
  InvalidShippingQueryError,
  InvalidPreCheckoutQueryError,
  UnknownError
} = errors
const {
  EventType,
  UpdateType,
  ParseMode,
  ChatType,
  MessageType,
  MessageEntityType,
  PollType,
  DiceEmoji,
  ChatAction,
  ChatMemberStatus,
  MediaType,
  MaskPositionPoint,
  InlineQueryResultType,
  PassportElementType,
  PassportElementErrorSource
} = constants

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
    this.emit(EventType.REQUEST, request)
    try {
      if (request instanceof DownloadFileByPathRequest) {
        const url = this.getFileDownloadLinkByPath(request.path)
        const res = await fetch(url, {
          agent: this.settings.agent
        })
        let response = new Response({
          ok: false
        }, {
          telegramBot: this,
          request,
          response: res
        })
        switch (res.status) {
          case 401: throw new InvalidBotTokenError(this.token).setResponse(response)
          case 404: throw new FileNotFoundError(request.path).setResponse(response)
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
          const uploadFiles = Object.values(params).some(param => param instanceof InputFile)
          if (uploadFiles) {
            body = Object.entries(params).reduce((form, [key, value]) => {
              if (Helper.exists(value)) {
                if (Helper.isObject(value)) {
                  if (value instanceof Boolean || value instanceof Number || value instanceof String) {
                    form.append(key, value.valueOf())
                  } else if (value instanceof InputFile) {
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
        let response = new Response({
          ok: false
        }, {
          telegramBot: this,
          request,
          response: res
        })
        switch (res.status) {
          case 401:
          case 404: throw new InvalidBotTokenError(this.token).setResponse(response)
        }
        try {
          res.data = await res.json()
          response = Response.fromParams(res.data, {
            telegramBot: this,
            request,
            response: res
          })
        } catch (e) {}
        if (response.parameters) {
          if (response.parameters.retryAfter) {
            throw new TooManyRequestsError(response.parameters.retryAfter).setResponse(response)
          } else if (response.parameters.migrateToChatId) {
            const migrateFromChatId = request.chatId || request.id
            const error = new ChatMigratedError(migrateFromChatId, response.parameters.migrateToChatId).setResponse(response)
            if (this.settings.autoMigrateToChats && !request.migrateFromChatId) {
              this.emit(EventType.ERROR, error)
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
      this.emit(EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  getUpdates(options) {
    return new GetUpdatesRequest(options, {
      telegramBot: this
    }).send()
  }

  setWebhook(url, options) {
    return new SetWebhookRequest({
      ...options,
      url
    }, {
      telegramBot: this
    }).send()
  }

  deleteWebhook(options) {
    return new DeleteWebhookRequest(options, {
      telegramBot: this
    }).send()
  }

  getWebhookInfo() {
    return new GetWebhookInfoRequest({
      telegramBot: this
    }).send()
  }

  getMe() {
    return new GetMeRequest({
      telegramBot: this
    }).send()
  }

  logOut() {
    return new LogOutRequest({
      telegramBot: this
    }).send()
  }

  close() {
    return new CloseRequest({
      telegramBot: this
    }).send()
  }

  sendMessage(chatId, text, options) {
    return new SendMessageRequest({
      ...options,
      chatId,
      text
    }, {
      telegramBot: this
    }).send()
  }

  forwardMessage(fromChatId, messageId, chatId, options) {
    return new ForwardMessageRequest({
      ...options,
      fromChatId,
      messageId,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  copyMessage(fromChatId, messageId, chatId, options) {
    return new CopyMessageRequest({
      ...options,
      fromChatId,
      messageId,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  sendPhoto(chatId, photo, options) {
    return new SendPhotoRequest({
      ...options,
      chatId,
      photo
    }, {
      telegramBot: this
    }).send()
  }

  sendAudio(chatId, audio, options) {
    return new SendAudioRequest({
      ...options,
      chatId,
      audio
    }, {
      telegramBot: this
    }).send()
  }

  sendDocument(chatId, document, options) {
    return new SendDocumentRequest({
      ...options,
      chatId,
      document
    }, {
      telegramBot: this
    }).send()
  }

  sendVideo(chatId, video, options) {
    return new SendVideoRequest({
      ...options,
      chatId,
      video
    }, {
      telegramBot: this
    }).send()
  }

  sendAnimation(chatId, animation, options) {
    return new SendAnimationRequest({
      ...options,
      chatId,
      animation
    }, {
      telegramBot: this
    }).send()
  }

  sendVoice(chatId, voice, options) {
    return new SendVoiceRequest({
      ...options,
      chatId,
      voice
    }, {
      telegramBot: this
    }).send()
  }

  sendVideoNote(chatId, videoNote, options) {
    return new SendVideoNoteRequest({
      ...options,
      chatId,
      videoNote
    }, {
      telegramBot: this
    }).send()
  }

  sendMediaGroup(chatId, media, options) {
    return new SendMediaGroupRequest({
      ...options,
      chatId,
      media
    }, {
      telegramBot: this
    }).send()
  }

  sendLocation(chatId, latitude, longitude, options) {
    return new SendLocationRequest({
      ...options,
      chatId,
      latitude,
      longitude
    }, {
      telegramBot: this
    }).send()
  }

  editMessageLiveLocation(chatId, messageId, latitude, longitude, options) {
    return new EditMessageLiveLocationRequest({
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
    return new EditMessageLiveLocationRequest({
      ...options,
      inlineMessageId: id,
      latitude,
      longitude
    }, {
      telegramBot: this
    }).send()
  }

  stopMessageLiveLocation(chatId, messageId, options) {
    return new StopMessageLiveLocationRequest({
      ...options,
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  stopInlineMessageLiveLocation(id, options) {
    return new StopMessageLiveLocationRequest({
      ...options,
      inlineMessageId: id
    }, {
      telegramBot: this
    }).send()
  }

  sendVenue(chatId, latitude, longitude, title, address, options) {
    return new SendVenueRequest({
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
    return new SendContactRequest({
      ...options,
      chatId,
      phoneNumber,
      firstName
    }, {
      telegramBot: this
    }).send()
  }

  sendPoll(chatId, question, pollOptions, options) {
    return new SendPollRequest({
      ...options,
      chatId,
      question,
      options: pollOptions
    }, {
      telegramBot: this
    }).send()
  }

  sendQuizPoll(chatId, question, pollOptions, correctOptionId, options) {
    return new SendPollRequest({
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
    return new SendDiceRequest({
      ...options,
      chatId
    }, {
      telegramBot: this
    }).send()
  }

  sendDartsDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: DiceEmoji.DARTS
    })
  }

  sendBasketballDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: DiceEmoji.BASKETBALL
    })
  }

  sendFootballDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: DiceEmoji.FOOTBALL
    })
  }

  sendSlotMachineDice(chatId, options) {
    return this.sendDice(chatId, {
      ...options,
      emoji: DiceEmoji.SLOT_MACHINE
    })
  }

  sendChatAction(id, action) {
    return new SendChatActionRequest({
      id,
      action
    }, {
      telegramBot: this
    }).send()
  }

  sendChatActionTyping(id) {
    return this.sendChatAction(id, ChatAction.TYPING)
  }

  sendChatActionUploadPhoto(id) {
    return this.sendChatAction(id, ChatAction.UPLOAD_PHOTO)
  }

  sendChatActionRecordVideo(id) {
    return this.sendChatAction(id, ChatAction.RECORD_VIDEO)
  }

  sendChatActionUploadVideo(id) {
    return this.sendChatAction(id, ChatAction.UPLOAD_VIDEO)
  }

  sendChatActionRecordAudio(id) {
    return this.sendChatAction(id, ChatAction.RECORD_AUDIO)
  }

  sendChatActionUploadAudio(id) {
    return this.sendChatAction(id, ChatAction.UPLOAD_AUDIO)
  }

  sendChatActionUploadDocument(id) {
    return this.sendChatAction(id, ChatAction.UPLOAD_DOCUMENT)
  }

  sendChatActionFindLocation(id) {
    return this.sendChatAction(id, ChatAction.FIND_LOCATION)
  }

  sendChatActionRecordVideoNote(id) {
    return this.sendChatAction(id, ChatAction.RECORD_VIDEO_NOTE)
  }

  sendChatActionUploadVideoNote(id) {
    return this.sendChatAction(id, ChatAction.UPLOAD_VIDEO_NOTE)
  }

  getUserProfilePhotos(id, options) {
    return new GetUserProfilePhotosRequest({
      ...options,
      id
    }, {
      telegramBot: this
    }).send()
  }

  getFile(id) {
    return new GetFileRequest({
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
    return new DownloadFileByPathRequest({
      path
    }, {
      telegramBot: this
    }).send()
  }

  kickChatMember(id, userId, options) {
    return new KickChatMemberRequest({
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
    return new UnbanChatMemberRequest({
      ...options,
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  restrictChatMember(id, userId, permissions, options) {
    return new RestrictChatMemberRequest({
      ...options,
      id,
      userId,
      permissions
    }, {
      telegramBot: this
    }).send()
  }

  promoteChatMember(id, userId, options) {
    return new PromoteChatMemberRequest({
      ...options,
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  setChatAdminCustomTitle(id, userId, title) {
    return new SetChatAdminCustomTitleRequest({
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
    return new SetChatPermissionsRequest({
      id,
      permissions
    }, {
      telegramBot: this
    }).send()
  }

  exportChatInviteLink(id) {
    return new ExportChatInviteLinkRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  setChatPhoto(id, photo) {
    return new SetChatPhotoRequest({
      id,
      photo
    }, {
      telegramBot: this
    }).send()
  }

  deleteChatPhoto(id) {
    return new DeleteChatPhotoRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  setChatTitle(id, title) {
    return new SetChatTitleRequest({
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
    return new SetChatDescriptionRequest({
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
    return new PinChatMessageRequest({
      ...options,
      id,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  unpinChatMessage(id, messageId) {
    return new UnpinChatMessageRequest({
      id,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  unpinAllChatMessages(id) {
    return new UnpinAllChatMessagesRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  leaveChat(id) {
    return new LeaveChatRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChat(id) {
    return new GetChatRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatAdmins(id) {
    return new GetChatAdminsRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatMembersCount(id) {
    return new GetChatMembersCountRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  getChatMember(id, userId) {
    return new GetChatMemberRequest({
      id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  setChatStickerSet(id, name) {
    return new SetChatStickerSetRequest({
      id,
      name
    }, {
      telegramBot: this
    }).send()
  }

  deleteChatStickerSet(id) {
    return new DeleteChatStickerSetRequest({
      id
    }, {
      telegramBot: this
    }).send()
  }

  answerCallbackQuery(id, options) {
    return new AnswerCallbackQueryRequest({
      ...options,
      id
    }, {
      telegramBot: this
    }).send()
  }

  setMyCommands(commands) {
    return new SetMyCommandsRequest({
      commands
    }, {
      telegramBot: this
    }).send()
  }

  getMyCommands() {
    return new GetMyCommandsRequest({
      telegramBot: this
    }).send()
  }

  editMessageText(chatId, messageId, text, options) {
    return new EditMessageTextRequest({
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
    return new EditMessageTextRequest({
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
    return new EditMessageCaptionRequest({
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
    return new EditMessageCaptionRequest({
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
    return new EditMessageMediaRequest({
      ...options,
      chatId,
      messageId,
      media
    }, {
      telegramBot: this
    }).send()
  }

  editInlineMessageMedia(id, media, options) {
    return new EditMessageMediaRequest({
      ...options,
      inlineMessageId: id,
      media
    }, {
      telegramBot: this
    }).send()
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup) {
    return new EditMessageReplyMarkupRequest({
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
    return new EditMessageReplyMarkupRequest({
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
    return new StopPollRequest({
      ...options,
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  deleteMessage(chatId, messageId) {
    return new DeleteMessageRequest({
      chatId,
      messageId
    }, {
      telegramBot: this
    }).send()
  }

  sendSticker(chatId, sticker, options) {
    return new SendStickerRequest({
      ...options,
      chatId,
      sticker
    }, {
      telegramBot: this
    }).send()
  }

  getStickerSet(name) {
    return new GetStickerSetRequest({
      name
    }, {
      telegramBot: this
    }).send()
  }

  uploadStickerFile(userId, sticker) {
    return new UploadStickerFileRequest({
      userId,
      pngSticker: sticker
    }, {
      telegramBot: this
    }).send()
  }

  createNewStickerSet(userId, name, title, sticker, emojis, options) {
    return new CreateNewStickerSetRequest({
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
    return new CreateNewStickerSetRequest({
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
    return new AddStickerToSetRequest({
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
    return new AddStickerToSetRequest({
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
    return new SetStickerPositionInSetRequest({
      sticker,
      position
    }, {
      telegramBot: this
    }).send()
  }

  deleteStickerFromSet(sticker) {
    return new DeleteStickerFromSetRequest({
      sticker
    }, {
      telegramBot: this
    }).send()
  }

  setStickerSetThumb(userId, name, thumb) {
    return new SetStickerSetThumbRequest({
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
    return new AnswerInlineQueryRequest({
      ...options,
      id,
      results
    }, {
      telegramBot: this
    }).send()
  }

  sendInvoice(chatId, providerToken, title, description, currency, prices, payload, startParameter, options) {
    return new SendInvoiceRequest({
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
    return new AnswerShippingQueryRequest({
      id,
      ok: true,
      shippingOptions
    }, {
      telegramBot: this
    }).send()
  }

  answerShippingQueryError(id, errorMessage) {
    return new AnswerShippingQueryRequest({
      id,
      ok: false,
      errorMessage
    }, {
      telegramBot: this
    }).send()
  }

  answerPreCheckoutQuery(id) {
    return new AnswerPreCheckoutQueryRequest({
      id,
      ok: true
    }, {
      telegramBot: this
    }).send()
  }

  answerPreCheckoutQueryError(id, errorMessage) {
    return new AnswerPreCheckoutQueryRequest({
      id,
      ok: false,
      errorMessage
    }, {
      telegramBot: this
    }).send()
  }

  setPassportDataErrors(userId, errors) {
    return new SetPassportDataErrorsRequest({
      userId,
      errors
    }, {
      telegramBot: this
    }).send()
  }

  sendGame(chatId, gameShortName, options) {
    return new SendGameRequest({
      ...options,
      chatId,
      gameShortName
    }, {
      telegramBot: this
    }).send()
  }

  setGameScore(chatId, messageId, userId, score, options) {
    return new SetGameScoreRequest({
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
    return new SetGameScoreRequest({
      ...options,
      inlineMessageId: id,
      userId,
      score
    }, {
      telegramBot: this
    }).send()
  }

  getGameHighScores(chatId, messageId, userId) {
    return new GetGameHighScoresRequest({
      chatId,
      messageId,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  getInlineGameHighScores(id, userId) {
    return new GetGameHighScoresRequest({
      inlineMessageId: id,
      userId
    }, {
      telegramBot: this
    }).send()
  }

  processUpdate(params, callback) {
    const update = Update.fromParams(params, {
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
TelegramBot.Response = Response
TelegramBot.ResponseParameters = ResponseParameters
TelegramBot.Update = Update
TelegramBot.WebhookInfo = WebhookInfo
TelegramBot.User = User
TelegramBot.Chat = Chat
TelegramBot.Message = Message
TelegramBot.MessageId = MessageId
TelegramBot.MessageReply = MessageReply
TelegramBot.MessageEntity = MessageEntity
TelegramBot.PhotoSize = PhotoSize
TelegramBot.Animation = Animation
TelegramBot.Audio = Audio
TelegramBot.Document = Document
TelegramBot.Video = Video
TelegramBot.VideoNote = VideoNote
TelegramBot.Voice = Voice
TelegramBot.Contact = Contact
TelegramBot.Dice = Dice
TelegramBot.PollOption = PollOption
TelegramBot.PollAnswer = PollAnswer
TelegramBot.Poll = Poll
TelegramBot.Location = Location
TelegramBot.Venue = Venue
TelegramBot.ProximityAlertTriggered = ProximityAlertTriggered
TelegramBot.UserProfilePhotos = UserProfilePhotos
TelegramBot.File = File
TelegramBot.ReplyKeyboardMarkup = ReplyKeyboardMarkup
TelegramBot.Keyboard = Keyboard
TelegramBot.KeyboardButton = KeyboardButton
TelegramBot.KeyboardButtonPollType = KeyboardButtonPollType
TelegramBot.ReplyKeyboardRemove = ReplyKeyboardRemove
TelegramBot.InlineKeyboardMarkup = InlineKeyboardMarkup
TelegramBot.InlineKeyboard = InlineKeyboard
TelegramBot.InlineKeyboardButton = InlineKeyboardButton
TelegramBot.LoginUrl = LoginUrl
TelegramBot.CallbackQuery = CallbackQuery
TelegramBot.ForceReply = ForceReply
TelegramBot.ChatPhoto = ChatPhoto
TelegramBot.ChatMember = ChatMember
TelegramBot.ChatPermissions = ChatPermissions
TelegramBot.ChatLocation = ChatLocation
TelegramBot.BotCommand = BotCommand
TelegramBot.InputMedia = InputMedia
TelegramBot.InputMediaPhoto = InputMediaPhoto
TelegramBot.InputMediaVideo = InputMediaVideo
TelegramBot.InputMediaAnimation = InputMediaAnimation
TelegramBot.InputMediaAudio = InputMediaAudio
TelegramBot.InputMediaDocument = InputMediaDocument
TelegramBot.InputFile = InputFile
TelegramBot.Sticker = Sticker
TelegramBot.StickerSet = StickerSet
TelegramBot.MaskPosition = MaskPosition
TelegramBot.InlineQuery = InlineQuery
TelegramBot.InlineQueryResult = InlineQueryResult
TelegramBot.InlineQueryResultArticle = InlineQueryResultArticle
TelegramBot.InlineQueryResultPhoto = InlineQueryResultPhoto
TelegramBot.InlineQueryResultGif = InlineQueryResultGif
TelegramBot.InlineQueryResultMpeg4Gif = InlineQueryResultMpeg4Gif
TelegramBot.InlineQueryResultVideo = InlineQueryResultVideo
TelegramBot.InlineQueryResultAudio = InlineQueryResultAudio
TelegramBot.InlineQueryResultVoice = InlineQueryResultVoice
TelegramBot.InlineQueryResultDocument = InlineQueryResultDocument
TelegramBot.InlineQueryResultLocation = InlineQueryResultLocation
TelegramBot.InlineQueryResultVenue = InlineQueryResultVenue
TelegramBot.InlineQueryResultContact = InlineQueryResultContact
TelegramBot.InlineQueryResultGame = InlineQueryResultGame
TelegramBot.InlineQueryResultCachedPhoto = InlineQueryResultCachedPhoto
TelegramBot.InlineQueryResultCachedGif = InlineQueryResultCachedGif
TelegramBot.InlineQueryResultCachedMpeg4Gif = InlineQueryResultCachedMpeg4Gif
TelegramBot.InlineQueryResultCachedSticker = InlineQueryResultCachedSticker
TelegramBot.InlineQueryResultCachedDocument = InlineQueryResultCachedDocument
TelegramBot.InlineQueryResultCachedVideo = InlineQueryResultCachedVideo
TelegramBot.InlineQueryResultCachedVoice = InlineQueryResultCachedVoice
TelegramBot.InlineQueryResultCachedAudio = InlineQueryResultCachedAudio
TelegramBot.InputMessageContent = InputMessageContent
TelegramBot.InputTextMessageContent = InputTextMessageContent
TelegramBot.InputLocationMessageContent = InputLocationMessageContent
TelegramBot.InputVenueMessageContent = InputVenueMessageContent
TelegramBot.InputContactMessageContent = InputContactMessageContent
TelegramBot.ChosenInlineResult = ChosenInlineResult
TelegramBot.LabeledPrice = LabeledPrice
TelegramBot.Invoice = Invoice
TelegramBot.ShippingAddress = ShippingAddress
TelegramBot.OrderInfo = OrderInfo
TelegramBot.ShippingOption = ShippingOption
TelegramBot.SuccessfulPayment = SuccessfulPayment
TelegramBot.ShippingQuery = ShippingQuery
TelegramBot.PreCheckoutQuery = PreCheckoutQuery
TelegramBot.PassportData = PassportData
TelegramBot.PassportFile = PassportFile
TelegramBot.EncryptedPassportElement = EncryptedPassportElement
TelegramBot.EncryptedCredentials = EncryptedCredentials
TelegramBot.PassportElementError = PassportElementError
TelegramBot.PassportElementErrorDataField = PassportElementErrorDataField
TelegramBot.PassportElementErrorFrontSide = PassportElementErrorFrontSide
TelegramBot.PassportElementErrorReverseSide = PassportElementErrorReverseSide
TelegramBot.PassportElementErrorSelfie = PassportElementErrorSelfie
TelegramBot.PassportElementErrorFile = PassportElementErrorFile
TelegramBot.PassportElementErrorFiles = PassportElementErrorFiles
TelegramBot.PassportElementErrorTranslationFile = PassportElementErrorTranslationFile
TelegramBot.PassportElementErrorTranslationFiles = PassportElementErrorTranslationFiles
TelegramBot.PassportElementErrorUnspecified = PassportElementErrorUnspecified
TelegramBot.Game = Game
TelegramBot.CallbackGame = CallbackGame
TelegramBot.GameHighScore = GameHighScore
TelegramBot.FormattedText = FormattedText
TelegramBot.MarkdownText = MarkdownText
TelegramBot.MarkdownV2Text = MarkdownV2Text
TelegramBot.HtmlText = HtmlText
TelegramBot.requests = requests
TelegramBot.GetUpdatesRequest = GetUpdatesRequest
TelegramBot.SetWebhookRequest = SetWebhookRequest
TelegramBot.DeleteWebhookRequest = DeleteWebhookRequest
TelegramBot.GetWebhookInfoRequest = GetWebhookInfoRequest
TelegramBot.GetMeRequest = GetMeRequest
TelegramBot.LogOutRequest = LogOutRequest
TelegramBot.CloseRequest = CloseRequest
TelegramBot.SendMessageRequest = SendMessageRequest
TelegramBot.ForwardMessageRequest = ForwardMessageRequest
TelegramBot.CopyMessageRequest = CopyMessageRequest
TelegramBot.SendPhotoRequest = SendPhotoRequest
TelegramBot.SendAudioRequest = SendAudioRequest
TelegramBot.SendDocumentRequest = SendDocumentRequest
TelegramBot.SendVideoRequest = SendVideoRequest
TelegramBot.SendAnimationRequest = SendAnimationRequest
TelegramBot.SendVoiceRequest = SendVoiceRequest
TelegramBot.SendVideoNoteRequest = SendVideoNoteRequest
TelegramBot.SendMediaGroupRequest = SendMediaGroupRequest
TelegramBot.SendLocationRequest = SendLocationRequest
TelegramBot.EditMessageLiveLocationRequest = EditMessageLiveLocationRequest
TelegramBot.StopMessageLiveLocationRequest = StopMessageLiveLocationRequest
TelegramBot.SendVenueRequest = SendVenueRequest
TelegramBot.SendContactRequest = SendContactRequest
TelegramBot.SendPollRequest = SendPollRequest
TelegramBot.SendDiceRequest = SendDiceRequest
TelegramBot.SendChatActionRequest = SendChatActionRequest
TelegramBot.GetUserProfilePhotosRequest = GetUserProfilePhotosRequest
TelegramBot.GetFileRequest = GetFileRequest
TelegramBot.DownloadFileByPathRequest = DownloadFileByPathRequest
TelegramBot.KickChatMemberRequest = KickChatMemberRequest
TelegramBot.UnbanChatMemberRequest = UnbanChatMemberRequest
TelegramBot.RestrictChatMemberRequest = RestrictChatMemberRequest
TelegramBot.PromoteChatMemberRequest = PromoteChatMemberRequest
TelegramBot.SetChatAdminCustomTitleRequest = SetChatAdminCustomTitleRequest
TelegramBot.SetChatPermissionsRequest = SetChatPermissionsRequest
TelegramBot.ExportChatInviteLinkRequest = ExportChatInviteLinkRequest
TelegramBot.SetChatPhotoRequest = SetChatPhotoRequest
TelegramBot.DeleteChatPhotoRequest = DeleteChatPhotoRequest
TelegramBot.SetChatTitleRequest = SetChatTitleRequest
TelegramBot.SetChatDescriptionRequest = SetChatDescriptionRequest
TelegramBot.PinChatMessageRequest = PinChatMessageRequest
TelegramBot.UnpinChatMessageRequest = UnpinChatMessageRequest
TelegramBot.UnpinAllChatMessagesRequest = UnpinAllChatMessagesRequest
TelegramBot.LeaveChatRequest = LeaveChatRequest
TelegramBot.GetChatRequest = GetChatRequest
TelegramBot.GetChatAdminsRequest = GetChatAdminsRequest
TelegramBot.GetChatMembersCountRequest = GetChatMembersCountRequest
TelegramBot.GetChatMemberRequest = GetChatMemberRequest
TelegramBot.SetChatStickerSetRequest = SetChatStickerSetRequest
TelegramBot.DeleteChatStickerSetRequest = DeleteChatStickerSetRequest
TelegramBot.AnswerCallbackQueryRequest = AnswerCallbackQueryRequest
TelegramBot.SetMyCommandsRequest = SetMyCommandsRequest
TelegramBot.GetMyCommandsRequest = GetMyCommandsRequest
TelegramBot.EditMessageTextRequest = EditMessageTextRequest
TelegramBot.EditMessageCaptionRequest = EditMessageCaptionRequest
TelegramBot.EditMessageMediaRequest = EditMessageMediaRequest
TelegramBot.EditMessageReplyMarkupRequest = EditMessageReplyMarkupRequest
TelegramBot.StopPollRequest = StopPollRequest
TelegramBot.DeleteMessageRequest = DeleteMessageRequest
TelegramBot.SendStickerRequest = SendStickerRequest
TelegramBot.GetStickerSetRequest = GetStickerSetRequest
TelegramBot.UploadStickerFileRequest = UploadStickerFileRequest
TelegramBot.CreateNewStickerSetRequest = CreateNewStickerSetRequest
TelegramBot.AddStickerToSetRequest = AddStickerToSetRequest
TelegramBot.SetStickerPositionInSetRequest = SetStickerPositionInSetRequest
TelegramBot.DeleteStickerFromSetRequest = DeleteStickerFromSetRequest
TelegramBot.SetStickerSetThumbRequest = SetStickerSetThumbRequest
TelegramBot.AnswerInlineQueryRequest = AnswerInlineQueryRequest
TelegramBot.SendInvoiceRequest = SendInvoiceRequest
TelegramBot.AnswerShippingQueryRequest = AnswerShippingQueryRequest
TelegramBot.AnswerPreCheckoutQueryRequest = AnswerPreCheckoutQueryRequest
TelegramBot.SetPassportDataErrorsRequest = SetPassportDataErrorsRequest
TelegramBot.SendGameRequest = SendGameRequest
TelegramBot.SetGameScoreRequest = SetGameScoreRequest
TelegramBot.GetGameHighScoresRequest = GetGameHighScoresRequest
TelegramBot.errors = errors
TelegramBot.Error = Error
TelegramBot.UnauthorizedError = UnauthorizedError
TelegramBot.BadRequestError = BadRequestError
TelegramBot.ForbiddenError = ForbiddenError
TelegramBot.NotFoundError = NotFoundError
TelegramBot.TooManyRequestsError = TooManyRequestsError
TelegramBot.InvalidBotTokenError = InvalidBotTokenError
TelegramBot.BotBlockedByUserError = BotBlockedByUserError
TelegramBot.ChatMigratedError = ChatMigratedError
TelegramBot.InlineModeDisabledError = InlineModeDisabledError
TelegramBot.UserNotFoundError = UserNotFoundError
TelegramBot.ChatNotFoundError = ChatNotFoundError
TelegramBot.MessageNotFoundError = MessageNotFoundError
TelegramBot.ReplyMessageNotFoundError = ReplyMessageNotFoundError
TelegramBot.FileNotFoundError = FileNotFoundError
TelegramBot.StickerSetNotFoundError = StickerSetNotFoundError
TelegramBot.InvalidCallbackQueryError = InvalidCallbackQueryError
TelegramBot.InvalidInlineQueryError = InvalidInlineQueryError
TelegramBot.InvalidShippingQueryError = InvalidShippingQueryError
TelegramBot.InvalidPreCheckoutQueryError = InvalidPreCheckoutQueryError
TelegramBot.UnknownError = UnknownError
TelegramBot.constants = constants
TelegramBot.EventType = EventType
TelegramBot.UpdateType = UpdateType
TelegramBot.ParseMode = ParseMode
TelegramBot.ChatType = ChatType
TelegramBot.MessageType = MessageType
TelegramBot.MessageEntityType = MessageEntityType
TelegramBot.PollType = PollType
TelegramBot.DiceEmoji = DiceEmoji
TelegramBot.ChatAction = ChatAction
TelegramBot.ChatMemberStatus = ChatMemberStatus
TelegramBot.MediaType = MediaType
TelegramBot.MaskPositionPoint = MaskPositionPoint
TelegramBot.InlineQueryResultType = InlineQueryResultType
TelegramBot.PassportElementType = PassportElementType
TelegramBot.PassportElementErrorSource = PassportElementErrorSource
TelegramBot.from = (token, settings) => new TelegramBot(token, settings)

module.exports = TelegramBot
