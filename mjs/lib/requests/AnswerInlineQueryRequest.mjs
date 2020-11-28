import Helper from '@darkwolf/helper.mjs'
import {
  BadRequestError,
  InlineModeDisabledError,
  InvalidInlineQueryError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class AnswerInlineQueryRequest {
  static queryMethod = 'answerInlineQuery'

  static from(parameters, context) {
    return new AnswerInlineQueryRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = AnswerInlineQueryRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setResults(parameters.results)
      .setPersonal(parameters.personal)
      .setNextOffset(parameters.nextOffset)
      .setSwitchPmText(parameters.switchPmText)
      .setSwitchPmParameter(parameters.switchPmParameter)
      .setCacheTime(parameters.cacheTime)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setResults(results) {
    this.results = results
    return this
  }

  setPersonal(boolean) {
    this.personal = boolean
    return this
  }

  setNextOffset(cursor) {
    this.nextOffset = cursor
    return this
  }

  setSwitchPmText(text) {
    this.switchPmText = text
    return this
  }

  setSwitchPmParameter(parameter) {
    this.switchPmParameter = parameter
    return this
  }

  setCacheTime(duration) {
    this.cacheTime = duration
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.inline_query_id = this.id
    }
    if (this.results) {
      params.results = this.results.map(result => result.toParams())
    }
    if (Helper.exists(this.personal)) {
      params.is_personal = this.personal
    }
    if (Helper.exists(this.nextOffset)) {
      params.next_offset = this.nextOffset
    }
    if (Helper.exists(this.switchPmText)) {
      params.switch_pm_text = this.switchPmText
    }
    if (this.switchPmParameter) {
      params.switch_pm_parameter = this.switchPmParameter
    }
    if (Helper.exists(this.cacheTime)) {
      params.cache_time = this.cacheTime
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: query is too old and response timeout expired or query ID is invalid': {
                error = new InvalidInlineQueryError(this.id).setResponse(response)
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
              case 'Forbidden: USER_BOT_INVALID': {
                error = new InlineModeDisabledError(this.context.telegramBot.token).setResponse(response)
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
