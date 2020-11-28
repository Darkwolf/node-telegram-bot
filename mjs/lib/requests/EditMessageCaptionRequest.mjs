import Helper from '@darkwolf/helper.mjs'
import { Message, MessageEntity, InlineKeyboardMarkup } from '../types/index.mjs'
import {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  MessageNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class EditMessageCaptionRequest {
  static queryMethod = 'editMessageCaption'

  static from(parameters, context) {
    return new EditMessageCaptionRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = EditMessageCaptionRequest.queryMethod
    this
      .setContext(context)
      .setChatId(parameters.chatId)
      .setMessageId(parameters.messageId)
      .setInlineMessageId(parameters.inlineMessageId)
      .setCaption(parameters.caption)
      .setParseMode(parameters.parseMode)
      .setCaptionEntities(parameters.captionEntities)
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
      entity instanceof MessageEntity ? entity : new MessageEntity(entity)
    ) : undefined
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
    if (Helper.exists(this.caption)) {
      params.caption = `${this.caption}`
    }
    if (this.parseMode) {
      params.parse_mode = this.parseMode
    }
    if (this.captionEntities) {
      params.caption_entities = this.captionEntities.map(entity => entity.toParams())
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
