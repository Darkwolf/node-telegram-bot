const Helper = require('@darkwolf/helper.cjs')
const { Message, MessageEntity, InputFile } = require('../types')
const {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  ReplyMessageNotFoundError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class SendVideoNoteRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendVideoNoteRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setVideoNote(parameters.videoNote)
      .setDuration(parameters.duration)
      .setLength(parameters.length)
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

  setVideoNote(videoNote) {
    this.videoNote = videoNote ? (
      (Helper.isString(videoNote) || videoNote instanceof InputFile) ? videoNote : new InputFile(videoNote)
    ) : undefined
    return this
  }

  setDuration(duration) {
    this.duration = duration
    return this
  }

  setLength(length) {
    this.length = length
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      (Helper.isString(thumb) || thumb instanceof InputFile) ? thumb : new InputFile(thumb)
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
    if (this.videoNote) {
      params.video_note = this.videoNote
    }
    if (Helper.exists(this.duration)) {
      params.duration = this.duration
    }
    if (this.length) {
      params.length = this.length
    }
    if (this.thumb) {
      params.thumb = this.thumb
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
        response.setResult(Message.fromParams(response.result, this.context))
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
              case 'Bad Request: reply message not found': {
                error = new ReplyMessageNotFoundError(this.replyToMessageId).setResponse(response)
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
SendVideoNoteRequest.queryMethod = 'sendVideoNote'
SendVideoNoteRequest.from = (parameters, context) => new SendVideoNoteRequest(parameters, context)

module.exports = SendVideoNoteRequest
