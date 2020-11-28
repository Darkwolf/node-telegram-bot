const Helper = require('@darkwolf/helper.cjs')
const { Message, InlineKeyboardMarkup } = require('../types')
const {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  MessageNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class EditMessageLiveLocationRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = EditMessageLiveLocationRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setMessageId(parameters.messageId)
      .setInlineMessageId(parameters.inlineMessageId)
      .setLatitude(parameters.latitude)
      .setLongitude(parameters.longitude)
      .setHorizontalAccuracy(parameters.horizontalAccuracy)
      .setHeading(parameters.heading)
      .setProximityAlertRadius(parameters.proximityAlertRadius)
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

  setMessageId(id) {
    this.messageId = id
    return this
  }

  setInlineMessageId(id) {
    this.inlineMessageId = id
    return this
  }

  setLatitude(latitude) {
    this.latitude = latitude
    return this
  }

  setLongitude(longitude) {
    this.longitude = longitude
    return this
  }

  setHorizontalAccuracy(radius) {
    this.horizontalAccuracy = radius
    return this
  }

  setHeading(heading) {
    this.heading = heading
    return this
  }

  setProximityAlertRadius(radius) {
    this.proximityAlertRadius = radius
    return this
  }

  setReplyMarkup(markup) {
    this.replyMarkup = markup ? (
      markup instanceof InlineKeyboardMarkup ? markup : new InlineKeyboardMarkup(markup.inlineKeyboard)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (this.messageId) {
      params.message_id = this.messageId
    }
    if (this.inlineMessageId) {
      params.inline_message_id = this.inlineMessageId
    }
    if (Helper.exists(this.latitude)) {
      params.latitude = this.latitude
    }
    if (Helper.exists(this.longitude)) {
      params.longitude = this.longitude
    }
    if (Helper.exists(this.horizontalAccuracy)) {
      params.horizontal_accuracy = this.horizontalAccuracy
    }
    if (this.heading) {
      params.heading = this.heading
    }
    if (this.proximityAlertRadius) {
      params.proximity_alert_radius = this.proximityAlertRadius
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
        if (Helper.isObject(response.result)) {
          response.setResult(Message.fromParams(response.result, this.context))
        }
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: chat not found': {
                error = new ChatNotFoundError(this.chatId).setResponse(response)
                break
              }
              case 'Bad Request: message to edit not found': {
                error = new MessageNotFoundError(this.messageId).setResponse(response)
                break
              }
              default: {
                error = new BadRequestError(response.description).setResponse(response)
              }
            }
            break
          }
          case 403: {
            switch (response.description) {
              case 'Forbidden: bot was blocked by the user': {
                error = new BotBlockedByUserError(this.chatId).setResponse(response)
                break
              }
            }
            break
          }
        }
        if (!error) {
          error = new UnknownError(response.description).setResponse(response)
        }
        this.context.telegramBot.emit(EventType.ERROR, error)
        if (!this.context.telegramBot.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
EditMessageLiveLocationRequest.queryMethod = 'editMessageLiveLocation'
EditMessageLiveLocationRequest.from = (parameters, context) => new EditMessageLiveLocationRequest(parameters, context)

module.exports = EditMessageLiveLocationRequest
