const Helper = require('@darkwolf/helper.cjs')
const {
  BadRequestError,
  InvalidCallbackQueryError,
  UnknownError
} = require('../errors')
const { EventType } = require('../constants')

class AnswerCallbackQueryRequest {
  constructor(parameters = {}, context) {
    this.queryMethod = AnswerCallbackQueryRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setText(parameters.text)
      .setShowAlert(parameters.showAlert)
      .setUrl(parameters.url)
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

  setText(text) {
    this.text = text
    return this
  }

  setShowAlert(boolean) {
    this.showAlert = boolean
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setCacheTime(duration) {
    this.cacheTime = duration
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.callback_query_id = this.id
    }
    if (Helper.exists(this.text)) {
      params.text = this.text
    }
    if (Helper.exists(this.showAlert)) {
      params.show_alert = this.showAlert
    }
    if (this.url) {
      params.url = this.url
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
                error = new InvalidCallbackQueryError(this.id).setResponse(response)
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
AnswerCallbackQueryRequest.queryMethod = 'answerCallbackQuery'
AnswerCallbackQueryRequest.from = (parameters, context) => new AnswerCallbackQueryRequest(parameters, context)

module.exports = AnswerCallbackQueryRequest
