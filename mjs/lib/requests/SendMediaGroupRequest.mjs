import Helper from '@darkwolf/helper.mjs'
import { Message, InputFile } from '../types/index.mjs'
import {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  ReplyMessageNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SendMediaGroupRequest {
  static queryMethod = 'sendMediaGroup'

  static from(parameters, context) {
    return new SendMediaGroupRequest(parameters, context)
  }

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
        [key]: value instanceof InputFile ? value : new InputFile(value)
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
        if (input.media instanceof InputFile) {
          const key = `media${index + 1}`
          params[key] = input.media
          input.media = `attach://${key}`
        }
        if (input.thumb instanceof InputFile) {
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
        response.setResult(response.result.map(message => Message.fromParams(message, this.context)))
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
