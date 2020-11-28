import EventEmitter from 'events'
import fetch from 'node-fetch'
import FormData from 'form-data'
import Helper from '@darkwolf/helper.mjs'
import types, {
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
} from './types/index.mjs'
import requests, {
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
} from './requests/index.mjs'
import errors, {
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
  FileNotFoundError,
  StickerSetNotFoundError,
  InvalidCallbackQueryError,
  InvalidInlineQueryError,
  InvalidShippingQueryError,
  InvalidPreCheckoutQueryError,
  UnknownError
} from './errors/index.mjs'
import constants, {
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
} from './constants/index.mjs'

export {
  types,
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
  HtmlText,
  requests,
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
  GetGameHighScoresRequest,
  errors,
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
  FileNotFoundError,
  StickerSetNotFoundError,
  InvalidCallbackQueryError,
  InvalidInlineQueryError,
  InvalidShippingQueryError,
  InvalidPreCheckoutQueryError,
  UnknownError,
  constants,
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
}

export default class TelegramBot extends EventEmitter {
  static API_URL = 'https://api.telegram.org'
  static BOT_API_URL = `${this.API_URL}/bot`
  static BOT_FILE_STORAGE_URL = `${this.API_URL}/file/bot`
  static WEBHOOK_SUBNETS = [
    '149.154.160.0/20',
    '91.108.4.0/22'
  ]
  static settings = {
    ignoreErrors: false,
    autoMigrateToChats: true
  }
  static types = types
  static Response = Response
  static ResponseParameters = ResponseParameters
  static Update = Update
  static WebhookInfo = WebhookInfo
  static User = User
  static Chat = Chat
  static Message = Message
  static MessageId = MessageId
  static MessageReply = MessageReply
  static MessageEntity = MessageEntity
  static PhotoSize = PhotoSize
  static Animation = Animation
  static Audio = Audio
  static Document = Document
  static Video = Video
  static VideoNote = VideoNote
  static Voice = Voice
  static Contact = Contact
  static Dice = Dice
  static PollOption = PollOption
  static PollAnswer = PollAnswer
  static Poll = Poll
  static Location = Location
  static Venue = Venue
  static ProximityAlertTriggered = ProximityAlertTriggered
  static UserProfilePhotos = UserProfilePhotos
  static File = File
  static ReplyKeyboardMarkup = ReplyKeyboardMarkup
  static Keyboard = Keyboard
  static KeyboardButton = KeyboardButton
  static KeyboardButtonPollType = KeyboardButtonPollType
  static ReplyKeyboardRemove = ReplyKeyboardRemove
  static InlineKeyboardMarkup = InlineKeyboardMarkup
  static InlineKeyboard = InlineKeyboard
  static InlineKeyboardButton = InlineKeyboardButton
  static LoginUrl = LoginUrl
  static CallbackQuery = CallbackQuery
  static ForceReply = ForceReply
  static ChatPhoto = ChatPhoto
  static ChatMember = ChatMember
  static ChatPermissions = ChatPermissions
  static ChatLocation = ChatLocation
  static BotCommand = BotCommand
  static InputMedia = InputMedia
  static InputMediaPhoto = InputMediaPhoto
  static InputMediaVideo = InputMediaVideo
  static InputMediaAnimation = InputMediaAnimation
  static InputMediaAudio = InputMediaAudio
  static InputMediaDocument = InputMediaDocument
  static InputFile = InputFile
  static Sticker = Sticker
  static StickerSet = StickerSet
  static MaskPosition = MaskPosition
  static InlineQuery = InlineQuery
  static InlineQueryResult = InlineQueryResult
  static InlineQueryResultArticle = InlineQueryResultArticle
  static InlineQueryResultPhoto = InlineQueryResultPhoto
  static InlineQueryResultGif = InlineQueryResultGif
  static InlineQueryResultMpeg4Gif = InlineQueryResultMpeg4Gif
  static InlineQueryResultVideo = InlineQueryResultVideo
  static InlineQueryResultAudio = InlineQueryResultAudio
  static InlineQueryResultVoice = InlineQueryResultVoice
  static InlineQueryResultDocument = InlineQueryResultDocument
  static InlineQueryResultLocation = InlineQueryResultLocation
  static InlineQueryResultVenue = InlineQueryResultVenue
  static InlineQueryResultContact = InlineQueryResultContact
  static InlineQueryResultGame = InlineQueryResultGame
  static InlineQueryResultCachedPhoto = InlineQueryResultCachedPhoto
  static InlineQueryResultCachedGif = InlineQueryResultCachedGif
  static InlineQueryResultCachedMpeg4Gif = InlineQueryResultCachedMpeg4Gif
  static InlineQueryResultCachedSticker = InlineQueryResultCachedSticker
  static InlineQueryResultCachedDocument = InlineQueryResultCachedDocument
  static InlineQueryResultCachedVideo = InlineQueryResultCachedVideo
  static InlineQueryResultCachedVoice = InlineQueryResultCachedVoice
  static InlineQueryResultCachedAudio = InlineQueryResultCachedAudio
  static InputMessageContent = InputMessageContent
  static InputTextMessageContent = InputTextMessageContent
  static InputLocationMessageContent = InputLocationMessageContent
  static InputVenueMessageContent = InputVenueMessageContent
  static InputContactMessageContent = InputContactMessageContent
  static ChosenInlineResult = ChosenInlineResult
  static LabeledPrice = LabeledPrice
  static Invoice = Invoice
  static ShippingAddress = ShippingAddress
  static OrderInfo = OrderInfo
  static ShippingOption = ShippingOption
  static SuccessfulPayment = SuccessfulPayment
  static ShippingQuery = ShippingQuery
  static PreCheckoutQuery = PreCheckoutQuery
  static PassportData = PassportData
  static PassportFile = PassportFile
  static EncryptedPassportElement = EncryptedPassportElement
  static EncryptedCredentials = EncryptedCredentials
  static PassportElementError = PassportElementError
  static PassportElementErrorDataField = PassportElementErrorDataField
  static PassportElementErrorFrontSide = PassportElementErrorFrontSide
  static PassportElementErrorReverseSide = PassportElementErrorReverseSide
  static PassportElementErrorSelfie = PassportElementErrorSelfie
  static PassportElementErrorFile = PassportElementErrorFile
  static PassportElementErrorFiles = PassportElementErrorFiles
  static PassportElementErrorTranslationFile = PassportElementErrorTranslationFile
  static PassportElementErrorTranslationFiles = PassportElementErrorTranslationFiles
  static PassportElementErrorUnspecified = PassportElementErrorUnspecified
  static Game = Game
  static CallbackGame = CallbackGame
  static GameHighScore = GameHighScore
  static FormattedText = FormattedText
  static MarkdownText = MarkdownText
  static MarkdownV2Text = MarkdownV2Text
  static HtmlText = HtmlText
  static requests = requests
  static GetUpdatesRequest = GetUpdatesRequest
  static SetWebhookRequest = SetWebhookRequest
  static DeleteWebhookRequest = DeleteWebhookRequest
  static GetWebhookInfoRequest = GetWebhookInfoRequest
  static GetMeRequest = GetMeRequest
  static LogOutRequest = LogOutRequest
  static CloseRequest = CloseRequest
  static SendMessageRequest = SendMessageRequest
  static ForwardMessageRequest = ForwardMessageRequest
  static CopyMessageRequest = CopyMessageRequest
  static SendPhotoRequest = SendPhotoRequest
  static SendAudioRequest = SendAudioRequest
  static SendDocumentRequest = SendDocumentRequest
  static SendVideoRequest = SendVideoRequest
  static SendAnimationRequest = SendAnimationRequest
  static SendVoiceRequest = SendVoiceRequest
  static SendVideoNoteRequest = SendVideoNoteRequest
  static SendMediaGroupRequest = SendMediaGroupRequest
  static SendLocationRequest = SendLocationRequest
  static EditMessageLiveLocationRequest = EditMessageLiveLocationRequest
  static StopMessageLiveLocationRequest = StopMessageLiveLocationRequest
  static SendVenueRequest = SendVenueRequest
  static SendContactRequest = SendContactRequest
  static SendPollRequest = SendPollRequest
  static SendDiceRequest = SendDiceRequest
  static SendChatActionRequest = SendChatActionRequest
  static GetUserProfilePhotosRequest = GetUserProfilePhotosRequest
  static GetFileRequest = GetFileRequest
  static DownloadFileByPathRequest = DownloadFileByPathRequest
  static KickChatMemberRequest = KickChatMemberRequest
  static UnbanChatMemberRequest = UnbanChatMemberRequest
  static RestrictChatMemberRequest = RestrictChatMemberRequest
  static PromoteChatMemberRequest = PromoteChatMemberRequest
  static SetChatAdminCustomTitleRequest = SetChatAdminCustomTitleRequest
  static SetChatPermissionsRequest = SetChatPermissionsRequest
  static ExportChatInviteLinkRequest = ExportChatInviteLinkRequest
  static SetChatPhotoRequest = SetChatPhotoRequest
  static DeleteChatPhotoRequest = DeleteChatPhotoRequest
  static SetChatTitleRequest = SetChatTitleRequest
  static SetChatDescriptionRequest = SetChatDescriptionRequest
  static PinChatMessageRequest = PinChatMessageRequest
  static UnpinChatMessageRequest = UnpinChatMessageRequest
  static UnpinAllChatMessagesRequest = UnpinAllChatMessagesRequest
  static LeaveChatRequest = LeaveChatRequest
  static GetChatRequest = GetChatRequest
  static GetChatAdminsRequest = GetChatAdminsRequest
  static GetChatMembersCountRequest = GetChatMembersCountRequest
  static GetChatMemberRequest = GetChatMemberRequest
  static SetChatStickerSetRequest = SetChatStickerSetRequest
  static DeleteChatStickerSetRequest = DeleteChatStickerSetRequest
  static AnswerCallbackQueryRequest = AnswerCallbackQueryRequest
  static SetMyCommandsRequest = SetMyCommandsRequest
  static GetMyCommandsRequest = GetMyCommandsRequest
  static EditMessageTextRequest = EditMessageTextRequest
  static EditMessageCaptionRequest = EditMessageCaptionRequest
  static EditMessageMediaRequest = EditMessageMediaRequest
  static EditMessageReplyMarkupRequest = EditMessageReplyMarkupRequest
  static StopPollRequest = StopPollRequest
  static DeleteMessageRequest = DeleteMessageRequest
  static SendStickerRequest = SendStickerRequest
  static GetStickerSetRequest = GetStickerSetRequest
  static UploadStickerFileRequest = UploadStickerFileRequest
  static CreateNewStickerSetRequest = CreateNewStickerSetRequest
  static AddStickerToSetRequest = AddStickerToSetRequest
  static SetStickerPositionInSetRequest = SetStickerPositionInSetRequest
  static DeleteStickerFromSetRequest = DeleteStickerFromSetRequest
  static SetStickerSetThumbRequest = SetStickerSetThumbRequest
  static AnswerInlineQueryRequest = AnswerInlineQueryRequest
  static SendInvoiceRequest = SendInvoiceRequest
  static AnswerShippingQueryRequest = AnswerShippingQueryRequest
  static AnswerPreCheckoutQueryRequest = AnswerPreCheckoutQueryRequest
  static SetPassportDataErrorsRequest = SetPassportDataErrorsRequest
  static SendGameRequest = SendGameRequest
  static SetGameScoreRequest = SetGameScoreRequest
  static GetGameHighScoresRequest = GetGameHighScoresRequest
  static errors = errors
  static Error = Error
  static UnauthorizedError = UnauthorizedError
  static BadRequestError = BadRequestError
  static ForbiddenError = ForbiddenError
  static NotFoundError = NotFoundError
  static TooManyRequestsError = TooManyRequestsError
  static InvalidBotTokenError = InvalidBotTokenError
  static BotBlockedByUserError = BotBlockedByUserError
  static ChatMigratedError = ChatMigratedError
  static InlineModeDisabledError = InlineModeDisabledError
  static UserNotFoundError = UserNotFoundError
  static ChatNotFoundError = ChatNotFoundError
  static MessageNotFoundError = MessageNotFoundError
  static FileNotFoundError = FileNotFoundError
  static StickerSetNotFoundError = StickerSetNotFoundError
  static InvalidCallbackQueryError = InvalidCallbackQueryError
  static InvalidInlineQueryError = InvalidInlineQueryError
  static InvalidShippingQueryError = InvalidShippingQueryError
  static InvalidPreCheckoutQueryError = InvalidPreCheckoutQueryError
  static UnknownError = UnknownError
  static constants = constants
  static EventType = EventType
  static UpdateType = UpdateType
  static ParseMode = ParseMode
  static ChatType = ChatType
  static MessageType = MessageType
  static MessageEntityType = MessageEntityType
  static PollType = PollType
  static DiceEmoji = DiceEmoji
  static ChatAction = ChatAction
  static ChatMemberStatus = ChatMemberStatus
  static MediaType = MediaType
  static MaskPositionPoint = MaskPositionPoint
  static InlineQueryResultType = InlineQueryResultType
  static PassportElementType = PassportElementType
  static PassportElementErrorSource = PassportElementErrorSource

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
