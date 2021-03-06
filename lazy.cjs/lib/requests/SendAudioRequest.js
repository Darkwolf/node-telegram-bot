const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SendAudioRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendAudioRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setAudio(parameters.audio)
      .setCaption(parameters.caption)
      .setParseMode(parameters.parseMode)
      .setCaptionEntities(parameters.captionEntities)
      .setDuration(parameters.duration)
      .setPerformer(parameters.performer)
      .setTitle(parameters.title)
      .setThumb(parameters.thumb)
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

  setAudio(audio) {
    this.audio = audio ? (
      (Helper.isString(audio) || audio instanceof types.InputFile) ? audio : new types.InputFile(audio)
    ) : undefined
    return this
  }

  setCaption(caption) {
    this.caption = caption
    return this
  }

  setParseMode(mode) {
    this.parseMode = mode
    return this
  }

  setCaptionEntities(entities) {
    this.captionEntities = entities ? entities.map(entity =>
      entity instanceof types.MessageEntity ? entity : new types.MessageEntity(entity)
    ) : undefined
    return this
  }

  setDuration(duration) {
    this.duration = duration
    return this
  }

  setPerformer(performer) {
    this.performer = performer
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      (Helper.isString(thumb) || thumb instanceof types.InputFile) ? thumb : new types.InputFile(thumb)
    ) : undefined
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
    if (this.audio) {
      params.audio = this.audio
    }
    if (Helper.exists(this.caption)) {
      params.caption = `${this.caption}`
    }
    if (this.parseMode) {
      params.parse_mode = this.parseMode
    }
    if (this.captionEntities) {
      params.caption_entities = this.captionEntities.map(entity => entity.toParams())
    }
    if (Helper.exists(this.duration)) {
      params.duration = this.duration
    }
    if (Helper.exists(this.performer)) {
      params.performer = this.performer
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (this.thumb) {
      params.thumb = thumb
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
SendAudioRequest.queryMethod = 'sendAudio'
SendAudioRequest.from = (parameters, context) => new SendAudioRequest(parameters, context)

module.exports = SendAudioRequest
