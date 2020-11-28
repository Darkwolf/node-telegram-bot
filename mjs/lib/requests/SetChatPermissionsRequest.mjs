import { ChatPermissions } from '../types/index.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SetChatPermissionsRequest {
  static queryMethod = 'setChatPermissions'

  static from(parameters, context) {
    return new SetChatPermissionsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = SetChatPermissionsRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setPermissions(parameters.permissions)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setPermissions(permissions) {
    this.permissions = permissions ? (
      permissions instanceof ChatPermissions ? permissions : new ChatPermissions(permissions)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.permissions) {
      params.permissions = this.permissions.toParams()
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
              case 'Bad Request: chat not found': {
                error = new ChatNotFoundError(this.id).setResponse(response)
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
