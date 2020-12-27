const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SendLocationRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendLocationRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setLatitude(parameters.latitude)
      .setLongitude(parameters.longitude)
      .setHorizontalAccuracy(parameters.horizontalAccuracy)
      .setLivePeriod(parameters.livePeriod)
      .setHeading(parameters.heading)
      .setProximityAlertRadius(parameters.proximityAlertRadius)
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

  setLivePeriod(duration) {
    this.livePeriod = duration
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
    this.replyMarkup = markup
    return this
  }

  toParams() {
    const params = {}
    if (this.chatId) {
      params.chat_id = this.chatId
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
    if (this.livePeriod) {
      params.live_period = this.livePeriod
    }
    if (this.heading) {
      params.heading = this.heading
    }
    if (Helper.exists(this.proximityAlertRadius)) {
      params.proximity_alert_radius = this.proximityAlertRadius
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
SendLocationRequest.queryMethod = 'sendLocation'
SendLocationRequest.from = (parameters, context) => new SendLocationRequest(parameters, context)

module.exports = SendLocationRequest