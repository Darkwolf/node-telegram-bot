import Helper from '@darkwolf/helper.mjs'
import {
  BadRequestError,
  InvalidPreCheckoutQueryError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class AnswerPreCheckoutQueryRequest {
  static queryMethod = 'answerPreCheckoutQuery'

  static from(parameters, context) {
    return new AnswerPreCheckoutQueryRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = AnswerPreCheckoutQueryRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setOk(parameters.ok)
      .setErrorMessage(parameters.errorMessage)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setOk(boolean) {
    this.ok = boolean
    return this
  }

  setErrorMessage(message) {
    this.errorMessage = message
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.pre_checkout_query_id = this.id
    }
    if (Helper.exists(this.ok)) {
      params.ok = this.ok
    }
    if (Helper.exists(this.errorMessage)) {
      params.error_message = this.errorMessage
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
                error = new InvalidPreCheckoutQueryError(this.id).setResponse(response)
                break
              }
              default: {
                error = new BadRequestError(response.description).setResponse(response)
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
