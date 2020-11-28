import Helper from '@darkwolf/helper.mjs'
import { Message, MessageEntity } from '../types/index.mjs'
import {
  BadRequestError,
  BotBlockedByUserError,
  ChatNotFoundError,
  ReplyMessageNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SendPollRequest {
  static queryMethod = 'sendPoll'

  static from(parameters, context) {
    return new SendPollRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SendPollRequest.queryMethod
    this
      .setContext(context)
      .setType(parameters.type)
      .setChatId(parameters.chatId)
      .setQuestion(parameters.question)
      .setOptions(parameters.options)
      .setCorrectOptionId(parameters.correctOptionId)
      .setAnonymous(parameters.anonymous)
      .setAllowsMultipleAnswers(parameters.allowsMultipleAnswers)
      .setExplanation(parameters.explanation)
      .setExplanationParseMode(parameters.explanationParseMode)
      .setExplanationEntities(parameters.explanationEntities)
      .setOpenPeriod(parameters.openPeriod)
      .setCloseDate(parameters.closeDate)
      .setClosed(parameters.closed)
      .setDisableNotification(parameters.disableNotification)
      .setReplyToMessageId(parameters.replyToMessageId)
      .setAllowSendingWithoutReply(parameters.allowSendingWithoutReply)
      .setReplyMarkup(parameters.replyMarkup)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setChatId(id) {
    this.chatId = id
    return this
  }

  setQuestion(question) {
    this.question = question
    return this
  }

  setOptions(options) {
    this.options = options
    return this
  }

  setCorrectOptionId(id) {
    this.correctOptionId = id
    return this
  }

  setAnonymous(boolean) {
    this.anonymous = boolean
    return this
  }

  setAllowsMultipleAnswers(boolean) {
    this.allowsMultipleAnswers = boolean
    return this
  }

  setExplanation(explanation) {
    this.explanation = explanation
    return this
  }

  setExplanationParseMode(mode) {
    this.explanationParseMode = mode
    return this
  }

  setExplanationEntities(entities) {
    this.explanationEntities = entities ? entities.map(entity =>
      entity instanceof MessageEntity ? entity : new MessageEntity(entity)
    ) : undefined
    return this
  }

  setOpenPeriod(duration) {
    this.openPeriod = duration
    return this
  }

  setCloseDate(date) {
    this.closeDate = date
    return this
  }

  setClosed(boolean) {
    this.closed = boolean
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
    if (this.type) {
      params.type = this.type
    }
    if (this.chatId) {
      params.chat_id = this.chatId
    }
    if (this.question) {
      params.question = this.question
    }
    if (this.options) {
      params.options = this.options
    }
    if (Helper.exists(this.correctOptionId)) {
      params.correct_option_id = this.correctOptionId
    }
    if (Helper.exists(this.anonymous)) {
      params.is_anonymous = this.anonymous
    }
    if (Helper.exists(this.allowsMultipleAnswers)) {
      params.allows_multiple_answers = this.allowsMultipleAnswers
    }
    if (Helper.exists(this.explanation)) {
      params.explanation = `${this.explanation}`
    }
    if (this.explanationParseMode) {
      params.explanation_parse_mode = this.explanationParseMode
    }
    if (this.explanationEntities) {
      params.explanation_entities = this.explanationEntities.map(entity => entity.toParams())
    }
    if (this.openPeriod) {
      params.open_period = this.openPeriod
    }
    if (this.closeDate) {
      params.close_date = this.closeDate
    }
    if (Helper.exists(this.closed)) {
      params.is_closed = this.closed
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
