const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SendInvoiceRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendInvoiceRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setProviderToken(parameters.providerToken)
      .setTitle(parameters.title)
      .setDescription(parameters.description)
      .setCurrency(parameters.currency)
      .setPrices(parameters.prices)
      .setPayload(parameters.payload)
      .setStartParameter(parameters.startParameter)
      .setProviderData(parameters.providerData)
      .setPhotoUrl(parameters.photoUrl)
      .setPhotoWidth(parameters.photoWidth)
      .setPhotoHeight(parameters.photoHeight)
      .setPhotoSize(parameters.photoSize)
      .setNeedName(parameters.needName)
      .setNeedPhoneNumber(parameters.needPhoneNumber)
      .setNeedEmail(parameters.needEmail)
      .setNeedShippingAddress(parameters.needShippingAddress)
      .setSendPhoneNumberToProvider(parameters.sendPhoneNumberToProvider)
      .setSendEmailToProvider(parameters.sendEmailToProvider)
      .setFlexible(parameters.flexible)
      .setDisableNotification(parameters.disableNotification)
      .setReplyToMessageId(parameters.replyToMessageId)
      .setAllowSendingWithoutReply(parameters.allowSendingWithoutReply)
      .setReplyMarkup(parameters.replyMarkup)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setChatId(id) {
    this.chatId = id
    return this
  }

  setProviderToken(token) {
    this.providerToken = token
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

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setPrices(prices) {
    this.prices = prices
    return this
  }

  setPayload(payload) {
    this.payload = payload
    return this
  }

  setStartParameter(parameter) {
    this.startParameter = parameter
    return this
  }

  setProviderData(data) {
    this.providerData = data
    return this
  }

  setPhotoUrl(url) {
    this.photoUrl = url
    return this
  }

  setPhotoWidth(width) {
    this.photoWidth = width
    return this
  }

  setPhotoHeight(height) {
    this.photoHeight = height
    return this
  }

  setPhotoSize(size) {
    this.photoSize = size
    return this
  }

  setNeedName(boolean) {
    this.needName = boolean
    return this
  }

  setNeedPhoneNumber(boolean) {
    this.needPhoneNumber = boolean
    return this
  }

  setNeedEmail(boolean) {
    this.needEmail = boolean
    return this
  }

  setNeedShippingAddress(boolean) {
    this.needShippingAddress = boolean
    return this
  }

  setSendPhoneNumberToProvider(boolean) {
    this.sendPhoneNumberToProvider = boolean
    return this
  }

  setSendEmailToProvider(boolean) {
    this.sendEmailToProvider = boolean
    return this
  }

  setFlexible(boolean) {
    this.flexible = boolean
    return this
  }

  setDisableNotification(boolean) {
    this.disableNotification = boolean
    return this
  }

  setReplyToMessageId(id) {
    this.replyToMessageId = id
    return this
  }

  setAllowSendingWithoutReply(boolean) {
    this.allowSendingWithoutReply = boolean
    return this
  }

  setReplyMarkup(markup) {
    this.replyMarkup = markup ? (
      markup instanceof types.InlineKeyboardMarkup ? markup : new types.InlineKeyboardMarkup(markup.inlineKeyboard)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (this.providerToken) {
      params.provider_token = this.providerToken
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (Helper.exists(this.description)) {
      params.description = this.description
    }
    if (this.currency) {
      params.currency = this.currency
    }
    if (this.prices) {
      params.prices = this.prices.map(price => price.toParams())
    }
    if (this.payload) {
      params.payload = this.payload
    }
    if (this.startParameter) {
      params.start_parameter = this.startParameter
    }
    if (Helper.exists(this.providerData)) {
      params.provider_data = this.providerData
    }
    if (this.photoUrl) {
      params.photo_url = this.photoUrl
    }
    if (this.photoWidth) {
      params.photo_width = this.photoWidth
    }
    if (this.photoHeight) {
      params.photo_height = this.photoHeight
    }
    if (this.photoSize) {
      params.photo_size = this.photoSize
    }
    if (Helper.exists(this.needName)) {
      params.need_name = this.needName
    }
    if (Helper.exists(this.needPhoneNumber)) {
      params.need_phone_number = this.needPhoneNumber
    }
    if (Helper.exists(this.needEmail)) {
      params.need_email = this.needEmail
    }
    if (Helper.exists(this.needShippingAddress)) {
      params.need_shipping_address = this.needShippingAddress
    }
    if (Helper.exists(this.sendPhoneNumberToProvider)) {
      params.send_phone_number_to_provider = this.sendPhoneNumberToProvider
    }
    if (Helper.exists(this.sendEmailToProvider)) {
      params.send_email_to_provider = this.sendEmailToProvider
    }
    if (Helper.exists(this.flexible)) {
      params.is_flexible = this.flexible
    }
    if (Helper.exists(this.disableNotification)) {
      params.disable_notification = this.disableNotification
    }
    if (this.replyToMessageId) {
      params.reply_to_message_id = this.replyToMessageId
    }
    if (Helper.exists(this.allowSendingWithoutReply)) {
      params.allow_sending_without_reply = this.allowSendingWithoutReply
    }
    if (this.replyMarkup) {
      params.reply_markup = this.replyMarkup.toParams()
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(types.Message.fromParams(response.result, this.context))
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new errors.ChatNotFoundError(this.chatId).setResponse(response)
                break
              }
              case 'Bad Request: reply message not found': {
                error = new errors.ReplyMessageNotFoundError(this.replyToMessageId).setResponse(response)
                break
              }
              default: {
                error = new errors.BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
          case 403: {
            switch (response.description) {
              case 'Forbidden: bot was blocked by the user': {
                error = new errors.BotBlockedByUserError(this.chatId).setResponse(response)
                break
              }
            }
            break
          }
        }
        if (!error) {
          error = new errors.UnknownError(response.description).setResponse(response)
        }
        this.context.telegramBot.emit(constants.EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SendInvoiceRequest.queryMethod = 'sendInvoice'
SendInvoiceRequest.from = (parameters, context) => new SendInvoiceRequest(parameters, context)

module.exports = SendInvoiceRequest
