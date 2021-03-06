import { File } from '../types/index.mjs'
import {
  BadRequestError,
  FileNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetFileRequest {
  static queryMethod = 'getFile'

  static from(parameters, context) {
    return new GetFileRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = GetFileRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.file_id = this.id
    }
    return params
  }

  async send() {
    const response = await this.context.telegramBot.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(File.fromParams(response.result, this.context))
        this.context.telegramBot.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 400: {
            switch (response.description) {
              case 'Bad Request: file not found': {
                error = new FileNotFoundError(this.id).setResponse(response)
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
