const Helper = require('@darkwolf/helper.cjs')
const errors = require('../errors')
const constants = require('../constants')

class AnswerPreCheckoutQueryRequest {
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
        this.context.telegramBot.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: query is too old and response timeout expired or query ID is invalid': {
                error = new errors.InvalidPreCheckoutQueryError(this.id).setResponse(response)
                break
              }
              default: {
                error = new errors.BadRequestError(response.description).setResponse(response)
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
AnswerPreCheckoutQueryRequest.queryMethod = 'answerPreCheckoutQuery'
AnswerPreCheckoutQueryRequest.from = (parameters, context) => new AnswerPreCheckoutQueryRequest(parameters, context)

module.exports = AnswerPreCheckoutQueryRequest
