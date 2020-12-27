const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SendMediaGroupRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = SendMediaGroupRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setMedia(parameters.media)
      .setDisableNotification(parameters.disableNotification)
      .setReplyToMessageId(parameters.replyToMessageId)
      .setAllowSendingWithoutReply(parameters.allowSendingWithoutReply)
      .setAttachedFiles(parameters.attachedFiles)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setChatId(id) {
    this.chatId = id
    return this
  }

  setMedia(media) {
    this.media = media
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

  setAttachedFiles(files) {
    this.attachedFiles = files ? Object.entries(files).reduce((obj, [key, value]) => ({
      ...obj,
      ...(value && {
        [key]: value instanceof types.InputFile ? value : new types.InputFile(value)
      })
    }), {}) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (this.media) {
      params.media = this.media.map((media, index) => {
        const input = media.toParams()
        if (input.media instanceof types.InputFile) {
          const key = `media${index + 1}`
          params[key] = input.media
          input.media = `attach://${key}`
        }
        if (input.thumb instanceof types.InputFile) {
          const key = `thumb${index + 1}`
          params[key] = input.thumb
          input.thumb = `attach://${key}`
        }
        return input
      })
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
    return {
      ...params,
      ...this.attachedFiles
    }
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(message => types.Message.fromParams(message, this.context)))
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
SendMediaGroupRequest.queryMethod = 'sendMediaGroup'
SendMediaGroupRequest.from = (parameters, context) => new SendMediaGroupRequest(parameters, context)

module.exports = SendMediaGroupRequest
