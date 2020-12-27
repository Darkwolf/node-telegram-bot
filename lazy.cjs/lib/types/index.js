class Types {}
Object.defineProperty(Types, 'Response', {
  get: () => {
    if (!Types._Response) {
      Types._Response = require('./Response')
    }
    return Types._Response
  }
})
Object.defineProperty(Types, 'ResponseParameters', {
  get: () => {
    if (!Types._ResponseParameters) {
      Types._ResponseParameters = require('./ResponseParameters')
    }
    return Types._ResponseParameters
  }
})
Object.defineProperty(Types, 'Update', {
  get: () => {
    if (!Types._Update) {
      Types._Update = require('./Update')
    }
    return Types._Update
  }
})
Object.defineProperty(Types, 'WebhookInfo', {
  get: () => {
    if (!Types._WebhookInfo) {
      Types._WebhookInfo = require('./WebhookInfo')
    }
    return Types._WebhookInfo
  }
})
Object.defineProperty(Types, 'User', {
  get: () => {
    if (!Types._User) {
      Types._User = require('./User')
    }
    return Types._User
  }
})
Object.defineProperty(Types, 'Chat', {
  get: () => {
    if (!Types._Chat) {
      Types._Chat = require('./Chat')
    }
    return Types._Chat
  }
})
Object.defineProperty(Types, 'Message', {
  get: () => {
    if (!Types._Message) {
      Types._Message = require('./Message')
    }
    return Types._Message
  }
})
Object.defineProperty(Types, 'MessageId', {
  get: () => {
    if (!Types._MessageId) {
      Types._MessageId = require('./MessageId')
    }
    return Types._MessageId
  }
})
Object.defineProperty(Types, 'MessageReply', {
  get: () => {
    if (!Types._MessageReply) {
      Types._MessageReply = require('./MessageReply')
    }
    return Types._MessageReply
  }
})
Object.defineProperty(Types, 'MessageEntity', {
  get: () => {
    if (!Types._MessageEntity) {
      Types._MessageEntity = require('./MessageEntity')
    }
    return Types._MessageEntity
  }
})
Object.defineProperty(Types, 'PhotoSize', {
  get: () => {
    if (!Types._PhotoSize) {
      Types._PhotoSize = require('./PhotoSize')
    }
    return Types._PhotoSize
  }
})
Object.defineProperty(Types, 'Animation', {
  get: () => {
    if (!Types._Animation) {
      Types._Animation = require('./Animation')
    }
    return Types._Animation
  }
})
Object.defineProperty(Types, 'Audio', {
  get: () => {
    if (!Types._Audio) {
      Types._Audio = require('./Audio')
    }
    return Types._Audio
  }
})
Object.defineProperty(Types, 'Document', {
  get: () => {
    if (!Types._Document) {
      Types._Document = require('./Document')
    }
    return Types._Document
  }
})
Object.defineProperty(Types, 'Video', {
  get: () => {
    if (!Types._Video) {
      Types._Video = require('./Video')
    }
    return Types._Video
  }
})
Object.defineProperty(Types, 'VideoNote', {
  get: () => {
    if (!Types._VideoNote) {
      Types._VideoNote = require('./VideoNote')
    }
    return Types._VideoNote
  }
})
Object.defineProperty(Types, 'Voice', {
  get: () => {
    if (!Types._Voice) {
      Types._Voice = require('./Voice')
    }
    return Types._Voice
  }
})
Object.defineProperty(Types, 'Contact', {
  get: () => {
    if (!Types._Contact) {
      Types._Contact = require('./Contact')
    }
    return Types._Contact
  }
})
Object.defineProperty(Types, 'Dice', {
  get: () => {
    if (!Types._Dice) {
      Types._Dice = require('./Dice')
    }
    return Types._Dice
  }
})
Object.defineProperty(Types, 'PollOption', {
  get: () => {
    if (!Types._PollOption) {
      Types._PollOption = require('./PollOption')
    }
    return Types._PollOption
  }
})
Object.defineProperty(Types, 'PollAnswer', {
  get: () => {
    if (!Types._PollAnswer) {
      Types._PollAnswer = require('./PollAnswer')
    }
    return Types._PollAnswer
  }
})
Object.defineProperty(Types, 'Poll', {
  get: () => {
    if (!Types._Poll) {
      Types._Poll = require('./Poll')
    }
    return Types._Poll
  }
})
Object.defineProperty(Types, 'Location', {
  get: () => {
    if (!Types._Location) {
      Types._Location = require('./Location')
    }
    return Types._Location
  }
})
Object.defineProperty(Types, 'Venue', {
  get: () => {
    if (!Types._Venue) {
      Types._Venue = require('./Venue')
    }
    return Types._Venue
  }
})
Object.defineProperty(Types, 'ProximityAlertTriggered', {
  get: () => {
    if (!Types._ProximityAlertTriggered) {
      Types._ProximityAlertTriggered = require('./ProximityAlertTriggered')
    }
    return Types._ProximityAlertTriggered
  }
})
Object.defineProperty(Types, 'UserProfilePhotos', {
  get: () => {
    if (!Types._UserProfilePhotos) {
      Types._UserProfilePhotos = require('./UserProfilePhotos')
    }
    return Types._UserProfilePhotos
  }
})
Object.defineProperty(Types, 'File', {
  get: () => {
    if (!Types._File) {
      Types._File = require('./File')
    }
    return Types._File
  }
})
Object.defineProperty(Types, 'ReplyKeyboardMarkup', {
  get: () => {
    if (!Types._ReplyKeyboardMarkup) {
      Types._ReplyKeyboardMarkup = require('./ReplyKeyboardMarkup')
    }
    return Types._ReplyKeyboardMarkup
  }
})
Object.defineProperty(Types, 'Keyboard', {
  get: () => {
    if (!Types._Keyboard) {
      Types._Keyboard = require('./Keyboard')
    }
    return Types._Keyboard
  }
})
Object.defineProperty(Types, 'KeyboardButton', {
  get: () => {
    if (!Types._KeyboardButton) {
      Types._KeyboardButton = require('./KeyboardButton')
    }
    return Types._KeyboardButton
  }
})
Object.defineProperty(Types, 'KeyboardButtonPollType', {
  get: () => {
    if (!Types._KeyboardButtonPollType) {
      Types._KeyboardButtonPollType = require('./KeyboardButtonPollType')
    }
    return Types._KeyboardButtonPollType
  }
})
Object.defineProperty(Types, 'ReplyKeyboardRemove', {
  get: () => {
    if (!Types._ReplyKeyboardRemove) {
      Types._ReplyKeyboardRemove = require('./ReplyKeyboardRemove')
    }
    return Types._ReplyKeyboardRemove
  }
})
Object.defineProperty(Types, 'InlineKeyboardMarkup', {
  get: () => {
    if (!Types._InlineKeyboardMarkup) {
      Types._InlineKeyboardMarkup = require('./InlineKeyboardMarkup')
    }
    return Types._InlineKeyboardMarkup
  }
})
Object.defineProperty(Types, 'InlineKeyboard', {
  get: () => {
    if (!Types._InlineKeyboard) {
      Types._InlineKeyboard = require('./InlineKeyboard')
    }
    return Types._InlineKeyboard
  }
})
Object.defineProperty(Types, 'InlineKeyboardButton', {
  get: () => {
    if (!Types._InlineKeyboardButton) {
      Types._InlineKeyboardButton = require('./InlineKeyboardButton')
    }
    return Types._InlineKeyboardButton
  }
})
Object.defineProperty(Types, 'LoginUrl', {
  get: () => {
    if (!Types._LoginUrl) {
      Types._LoginUrl = require('./LoginUrl')
    }
    return Types._LoginUrl
  }
})
Object.defineProperty(Types, 'CallbackQuery', {
  get: () => {
    if (!Types._CallbackQuery) {
      Types._CallbackQuery = require('./CallbackQuery')
    }
    return Types._CallbackQuery
  }
})
Object.defineProperty(Types, 'ForceReply', {
  get: () => {
    if (!Types._ForceReply) {
      Types._ForceReply = require('./ForceReply')
    }
    return Types._ForceReply
  }
})
Object.defineProperty(Types, 'ChatPhoto', {
  get: () => {
    if (!Types._ChatPhoto) {
      Types._ChatPhoto = require('./ChatPhoto')
    }
    return Types._ChatPhoto
  }
})
Object.defineProperty(Types, 'ChatMember', {
  get: () => {
    if (!Types._ChatMember) {
      Types._ChatMember = require('./ChatMember')
    }
    return Types._ChatMember
  }
})
Object.defineProperty(Types, 'ChatPermissions', {
  get: () => {
    if (!Types._ChatPermissions) {
      Types._ChatPermissions = require('./ChatPermissions')
    }
    return Types._ChatPermissions
  }
})
Object.defineProperty(Types, 'ChatLocation', {
  get: () => {
    if (!Types._ChatLocation) {
      Types._ChatLocation = require('./ChatLocation')
    }
    return Types._ChatLocation
  }
})
Object.defineProperty(Types, 'BotCommand', {
  get: () => {
    if (!Types._BotCommand) {
      Types._BotCommand = require('./BotCommand')
    }
    return Types._BotCommand
  }
})
Object.defineProperty(Types, 'InputMedia', {
  get: () => {
    if (!Types._InputMedia) {
      Types._InputMedia = require('./InputMedia')
    }
    return Types._InputMedia
  }
})
Object.defineProperty(Types, 'InputMediaPhoto', {
  get: () => {
    if (!Types._InputMediaPhoto) {
      Types._InputMediaPhoto = require('./InputMediaPhoto')
    }
    return Types._InputMediaPhoto
  }
})
Object.defineProperty(Types, 'InputMediaVideo', {
  get: () => {
    if (!Types._InputMediaVideo) {
      Types._InputMediaVideo = require('./InputMediaVideo')
    }
    return Types._InputMediaVideo
  }
})
Object.defineProperty(Types, 'InputMediaAnimation', {
  get: () => {
    if (!Types._InputMediaAnimation) {
      Types._InputMediaAnimation = require('./InputMediaAnimation')
    }
    return Types._InputMediaAnimation
  }
})
Object.defineProperty(Types, 'InputMediaAudio', {
  get: () => {
    if (!Types._InputMediaAudio) {
      Types._InputMediaAudio = require('./InputMediaAudio')
    }
    return Types._InputMediaAudio
  }
})
Object.defineProperty(Types, 'InputMediaDocument', {
  get: () => {
    if (!Types._InputMediaDocument) {
      Types._InputMediaDocument = require('./InputMediaDocument')
    }
    return Types._InputMediaDocument
  }
})
Object.defineProperty(Types, 'InputFile', {
  get: () => {
    if (!Types._InputFile) {
      Types._InputFile = require('./InputFile')
    }
    return Types._InputFile
  }
})
Object.defineProperty(Types, 'Sticker', {
  get: () => {
    if (!Types._Sticker) {
      Types._Sticker = require('./Sticker')
    }
    return Types._Sticker
  }
})
Object.defineProperty(Types, 'StickerSet', {
  get: () => {
    if (!Types._StickerSet) {
      Types._StickerSet = require('./StickerSet')
    }
    return Types._StickerSet
  }
})
Object.defineProperty(Types, 'MaskPosition', {
  get: () => {
    if (!Types._MaskPosition) {
      Types._MaskPosition = require('./MaskPosition')
    }
    return Types._MaskPosition
  }
})
Object.defineProperty(Types, 'InlineQuery', {
  get: () => {
    if (!Types._InlineQuery) {
      Types._InlineQuery = require('./InlineQuery')
    }
    return Types._InlineQuery
  }
})
Object.defineProperty(Types, 'InlineQueryResult', {
  get: () => {
    if (!Types._InlineQueryResult) {
      Types._InlineQueryResult = require('./InlineQueryResult')
    }
    return Types._InlineQueryResult
  }
})
Object.defineProperty(Types, 'InlineQueryResultArticle', {
  get: () => {
    if (!Types._InlineQueryResultArticle) {
      Types._InlineQueryResultArticle = require('./InlineQueryResultArticle')
    }
    return Types._InlineQueryResultArticle
  }
})
Object.defineProperty(Types, 'InlineQueryResultPhoto', {
  get: () => {
    if (!Types._InlineQueryResultPhoto) {
      Types._InlineQueryResultPhoto = require('./InlineQueryResultPhoto')
    }
    return Types._InlineQueryResultPhoto
  }
})
Object.defineProperty(Types, 'InlineQueryResultGif', {
  get: () => {
    if (!Types._InlineQueryResultGif) {
      Types._InlineQueryResultGif = require('./InlineQueryResultGif')
    }
    return Types._InlineQueryResultGif
  }
})
Object.defineProperty(Types, 'InlineQueryResultMpeg4Gif', {
  get: () => {
    if (!Types._InlineQueryResultMpeg4Gif) {
      Types._InlineQueryResultMpeg4Gif = require('./InlineQueryResultMpeg4Gif')
    }
    return Types._InlineQueryResultMpeg4Gif
  }
})
Object.defineProperty(Types, 'InlineQueryResultVideo', {
  get: () => {
    if (!Types._InlineQueryResultVideo) {
      Types._InlineQueryResultVideo = require('./InlineQueryResultVideo')
    }
    return Types._InlineQueryResultVideo
  }
})
Object.defineProperty(Types, 'InlineQueryResultAudio', {
  get: () => {
    if (!Types._InlineQueryResultAudio) {
      Types._InlineQueryResultAudio = require('./InlineQueryResultAudio')
    }
    return Types._InlineQueryResultAudio
  }
})
Object.defineProperty(Types, 'InlineQueryResultVoice', {
  get: () => {
    if (!Types._InlineQueryResultVoice) {
      Types._InlineQueryResultVoice = require('./InlineQueryResultVoice')
    }
    return Types._InlineQueryResultVoice
  }
})
Object.defineProperty(Types, 'InlineQueryResultDocument', {
  get: () => {
    if (!Types._InlineQueryResultDocument) {
      Types._InlineQueryResultDocument = require('./InlineQueryResultDocument')
    }
    return Types._InlineQueryResultDocument
  }
})
Object.defineProperty(Types, 'InlineQueryResultLocation', {
  get: () => {
    if (!Types._InlineQueryResultLocation) {
      Types._InlineQueryResultLocation = require('./InlineQueryResultLocation')
    }
    return Types._InlineQueryResultLocation
  }
})
Object.defineProperty(Types, 'InlineQueryResultVenue', {
  get: () => {
    if (!Types._InlineQueryResultVenue) {
      Types._InlineQueryResultVenue = require('./InlineQueryResultVenue')
    }
    return Types._InlineQueryResultVenue
  }
})
Object.defineProperty(Types, 'InlineQueryResultContact', {
  get: () => {
    if (!Types._InlineQueryResultContact) {
      Types._InlineQueryResultContact = require('./InlineQueryResultContact')
    }
    return Types._InlineQueryResultContact
  }
})
Object.defineProperty(Types, 'InlineQueryResultGame', {
  get: () => {
    if (!Types._InlineQueryResultGame) {
      Types._InlineQueryResultGame = require('./InlineQueryResultGame')
    }
    return Types._InlineQueryResultGame
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedPhoto', {
  get: () => {
    if (!Types._InlineQueryResultCachedPhoto) {
      Types._InlineQueryResultCachedPhoto = require('./InlineQueryResultCachedPhoto')
    }
    return Types._InlineQueryResultCachedPhoto
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedGif', {
  get: () => {
    if (!Types._InlineQueryResultCachedGif) {
      Types._InlineQueryResultCachedGif = require('./InlineQueryResultCachedGif')
    }
    return Types._InlineQueryResultCachedGif
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedMpeg4Gif', {
  get: () => {
    if (!Types._InlineQueryResultCachedMpeg4Gif) {
      Types._InlineQueryResultCachedMpeg4Gif = require('./InlineQueryResultCachedMpeg4Gif')
    }
    return Types._InlineQueryResultCachedMpeg4Gif
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedSticker', {
  get: () => {
    if (!Types._InlineQueryResultCachedSticker) {
      Types._InlineQueryResultCachedSticker = require('./InlineQueryResultCachedSticker')
    }
    return Types._InlineQueryResultCachedSticker
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedDocument', {
  get: () => {
    if (!Types._InlineQueryResultCachedDocument) {
      Types._InlineQueryResultCachedDocument = require('./InlineQueryResultCachedDocument')
    }
    return Types._InlineQueryResultCachedDocument
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedVideo', {
  get: () => {
    if (!Types._InlineQueryResultCachedVideo) {
      Types._InlineQueryResultCachedVideo = require('./InlineQueryResultCachedVideo')
    }
    return Types._InlineQueryResultCachedVideo
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedVoice', {
  get: () => {
    if (!Types._InlineQueryResultCachedVoice) {
      Types._InlineQueryResultCachedVoice = require('./InlineQueryResultCachedVoice')
    }
    return Types._InlineQueryResultCachedVoice
  }
})
Object.defineProperty(Types, 'InlineQueryResultCachedAudio', {
  get: () => {
    if (!Types._InlineQueryResultCachedAudio) {
      Types._InlineQueryResultCachedAudio = require('./InlineQueryResultCachedAudio')
    }
    return Types._InlineQueryResultCachedAudio
  }
})
Object.defineProperty(Types, 'InputMessageContent', {
  get: () => {
    if (!Types._InputMessageContent) {
      Types._InputMessageContent = require('./InputMessageContent')
    }
    return Types._InputMessageContent
  }
})
Object.defineProperty(Types, 'InputTextMessageContent', {
  get: () => {
    if (!Types._InputTextMessageContent) {
      Types._InputTextMessageContent = require('./InputTextMessageContent')
    }
    return Types._InputTextMessageContent
  }
})
Object.defineProperty(Types, 'InputLocationMessageContent', {
  get: () => {
    if (!Types._InputLocationMessageContent) {
      Types._InputLocationMessageContent = require('./InputLocationMessageContent')
    }
    return Types._InputLocationMessageContent
  }
})
Object.defineProperty(Types, 'InputVenueMessageContent', {
  get: () => {
    if (!Types._InputVenueMessageContent) {
      Types._InputVenueMessageContent = require('./InputVenueMessageContent')
    }
    return Types._InputVenueMessageContent
  }
})
Object.defineProperty(Types, 'InputContactMessageContent', {
  get: () => {
    if (!Types._InputContactMessageContent) {
      Types._InputContactMessageContent = require('./InputContactMessageContent')
    }
    return Types._InputContactMessageContent
  }
})
Object.defineProperty(Types, 'ChosenInlineResult', {
  get: () => {
    if (!Types._ChosenInlineResult) {
      Types._ChosenInlineResult = require('./ChosenInlineResult')
    }
    return Types._ChosenInlineResult
  }
})
Object.defineProperty(Types, 'LabeledPrice', {
  get: () => {
    if (!Types._LabeledPrice) {
      Types._LabeledPrice = require('./LabeledPrice')
    }
    return Types._LabeledPrice
  }
})
Object.defineProperty(Types, 'Invoice', {
  get: () => {
    if (!Types._Invoice) {
      Types._Invoice = require('./Invoice')
    }
    return Types._Invoice
  }
})
Object.defineProperty(Types, 'ShippingAddress', {
  get: () => {
    if (!Types._ShippingAddress) {
      Types._ShippingAddress = require('./ShippingAddress')
    }
    return Types._ShippingAddress
  }
})
Object.defineProperty(Types, 'OrderInfo', {
  get: () => {
    if (!Types._OrderInfo) {
      Types._OrderInfo = require('./OrderInfo')
    }
    return Types._OrderInfo
  }
})
Object.defineProperty(Types, 'ShippingOption', {
  get: () => {
    if (!Types._ShippingOption) {
      Types._ShippingOption = require('./ShippingOption')
    }
    return Types._ShippingOption
  }
})
Object.defineProperty(Types, 'SuccessfulPayment', {
  get: () => {
    if (!Types._SuccessfulPayment) {
      Types._SuccessfulPayment = require('./SuccessfulPayment')
    }
    return Types._SuccessfulPayment
  }
})
Object.defineProperty(Types, 'ShippingQuery', {
  get: () => {
    if (!Types._ShippingQuery) {
      Types._ShippingQuery = require('./ShippingQuery')
    }
    return Types._ShippingQuery
  }
})
Object.defineProperty(Types, 'PreCheckoutQuery', {
  get: () => {
    if (!Types._PreCheckoutQuery) {
      Types._PreCheckoutQuery = require('./PreCheckoutQuery')
    }
    return Types._PreCheckoutQuery
  }
})
Object.defineProperty(Types, 'PassportData', {
  get: () => {
    if (!Types._PassportData) {
      Types._PassportData = require('./PassportData')
    }
    return Types._PassportData
  }
})
Object.defineProperty(Types, 'PassportFile', {
  get: () => {
    if (!Types._PassportFile) {
      Types._PassportFile = require('./PassportFile')
    }
    return Types._PassportFile
  }
})
Object.defineProperty(Types, 'EncryptedPassportElement', {
  get: () => {
    if (!Types._EncryptedPassportElement) {
      Types._EncryptedPassportElement = require('./EncryptedPassportElement')
    }
    return Types._EncryptedPassportElement
  }
})
Object.defineProperty(Types, 'EncryptedCredentials', {
  get: () => {
    if (!Types._EncryptedCredentials) {
      Types._EncryptedCredentials = require('./EncryptedCredentials')
    }
    return Types._EncryptedCredentials
  }
})
Object.defineProperty(Types, 'PassportElementError', {
  get: () => {
    if (!Types._PassportElementError) {
      Types._PassportElementError = require('./PassportElementError')
    }
    return Types._PassportElementError
  }
})
Object.defineProperty(Types, 'PassportElementErrorDataField', {
  get: () => {
    if (!Types._PassportElementErrorDataField) {
      Types._PassportElementErrorDataField = require('./PassportElementErrorDataField')
    }
    return Types._PassportElementErrorDataField
  }
})
Object.defineProperty(Types, 'PassportElementErrorFrontSide', {
  get: () => {
    if (!Types._PassportElementErrorFrontSide) {
      Types._PassportElementErrorFrontSide = require('./PassportElementErrorFrontSide')
    }
    return Types._PassportElementErrorFrontSide
  }
})
Object.defineProperty(Types, 'PassportElementErrorReverseSide', {
  get: () => {
    if (!Types._PassportElementErrorReverseSide) {
      Types._PassportElementErrorReverseSide = require('./PassportElementErrorReverseSide')
    }
    return Types._PassportElementErrorReverseSide
  }
})
Object.defineProperty(Types, 'PassportElementErrorSelfie', {
  get: () => {
    if (!Types._PassportElementErrorSelfie) {
      Types._PassportElementErrorSelfie = require('./PassportElementErrorSelfie')
    }
    return Types._PassportElementErrorSelfie
  }
})
Object.defineProperty(Types, 'PassportElementErrorFile', {
  get: () => {
    if (!Types._PassportElementErrorFile) {
      Types._PassportElementErrorFile = require('./PassportElementErrorFile')
    }
    return Types._PassportElementErrorFile
  }
})
Object.defineProperty(Types, 'PassportElementErrorFiles', {
  get: () => {
    if (!Types._PassportElementErrorFiles) {
      Types._PassportElementErrorFiles = require('./PassportElementErrorFiles')
    }
    return Types._PassportElementErrorFiles
  }
})
Object.defineProperty(Types, 'PassportElementErrorTranslationFile', {
  get: () => {
    if (!Types._PassportElementErrorTranslationFile) {
      Types._PassportElementErrorTranslationFile = require('./PassportElementErrorTranslationFile')
    }
    return Types._PassportElementErrorTranslationFile
  }
})
Object.defineProperty(Types, 'PassportElementErrorTranslationFiles', {
  get: () => {
    if (!Types._PassportElementErrorTranslationFiles) {
      Types._PassportElementErrorTranslationFiles = require('./PassportElementErrorTranslationFiles')
    }
    return Types._PassportElementErrorTranslationFiles
  }
})
Object.defineProperty(Types, 'PassportElementErrorUnspecified', {
  get: () => {
    if (!Types._PassportElementErrorUnspecified) {
      Types._PassportElementErrorUnspecified = require('./PassportElementErrorUnspecified')
    }
    return Types._PassportElementErrorUnspecified
  }
})
Object.defineProperty(Types, 'Game', {
  get: () => {
    if (!Types._Game) {
      Types._Game = require('./Game')
    }
    return Types._Game
  }
})
Object.defineProperty(Types, 'CallbackGame', {
  get: () => {
    if (!Types._CallbackGame) {
      Types._CallbackGame = require('./CallbackGame')
    }
    return Types._CallbackGame
  }
})
Object.defineProperty(Types, 'GameHighScore', {
  get: () => {
    if (!Types._GameHighScore) {
      Types._GameHighScore = require('./GameHighScore')
    }
    return Types._GameHighScore
  }
})
Object.defineProperty(Types, 'FormattedText', {
  get: () => {
    if (!Types._FormattedText) {
      Types._FormattedText = require('./FormattedText')
    }
    return Types._FormattedText
  }
})
Object.defineProperty(Types, 'MarkdownText', {
  get: () => {
    if (!Types._MarkdownText) {
      Types._MarkdownText = require('./MarkdownText')
    }
    return Types._MarkdownText
  }
})
Object.defineProperty(Types, 'MarkdownV2Text', {
  get: () => {
    if (!Types._MarkdownV2Text) {
      Types._MarkdownV2Text = require('./MarkdownV2Text')
    }
    return Types._MarkdownV2Text
  }
})
Object.defineProperty(Types, 'HtmlText', {
  get: () => {
    if (!Types._HtmlText) {
      Types._HtmlText = require('./HtmlText')
    }
    return Types._HtmlText
  }
})

module.exports = Types
