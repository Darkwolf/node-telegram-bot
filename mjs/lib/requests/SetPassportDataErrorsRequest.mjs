import {
  BadRequestError,
  UserNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetPassportDataErrorsRequest {
  static queryMethod = 'setPassportDataErrors'

  static from(parameters, context) {
    return new SetPassportDataErrorsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetPassportDataErrorsRequest.queryMethod
    this
      .setContext(context)
      .setUserId(parameters.userId)
      .setErrors(parameters.errors)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setErrors(errors) {
    this.errors = errors
    return this
  }

  toParams() {
    const params = {}
    if (this.userId) {
      params.user_id = this.userId
    }
    if (this.errors) {
      params.errors = this.errors.map(error => error.toParams())
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
              case 'Bad Request: user not found': {
                error = new UserNotFoundError(this.userId).setResponse(response)
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
