import Helper from '@darkwolf/helper.mjs'
import {
  BadRequestError,
  ChatNotFoundError,
  UserNotFoundError,
  UnknownError
} from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class PromoteChatMemberRequest {
  static queryMethod = 'promoteChatMember'

  static from(parameters, context) {
    return new PromoteChatMemberRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.queryMethod = PromoteChatMemberRequest.queryMethod
    this
      .setContext(context)
      .setId(parameters.id)
      .setUserId(parameters.userId)
      .setAnonymous(parameters.anonymous)
      .setCanChangeInfo(parameters.canChangeInfo)
      .setCanPostMessages(parameters.canPostMessages)
      .setCanEditMessages(parameters.canEditMessages)
      .setCanDeleteMessages(parameters.canDeleteMessages)
      .setCanInviteUsers(parameters.canInviteUsers)
      .setCanRestrictMembers(parameters.canRestrictMembers)
      .setCanPinMessages(parameters.canPinMessages)
      .setCanPromoteMembers(parameters.canPromoteMembers)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setAnonymous(boolean) {
    this.anonymous = boolean
    return this
  }

  setCanChangeInfo(boolean) {
    this.canChangeInfo = boolean
    return this
  }

  setCanPostMessages(boolean) {
    this.canPostMessages = boolean
    return this
  }

  setCanEditMessages(boolean) {
    this.canEditMessages = boolean
    return this
  }

  setCanDeleteMessages(boolean) {
    this.canDeleteMessages = boolean
    return this
  }

  setCanInviteUsers(boolean) {
    this.canInviteUsers = boolean
    return this
  }

  setCanRestrictMembers(boolean) {
    this.canRestrictMembers = boolean
    return this
  }

  setCanPinMessages(boolean) {
    this.canPinMessages = boolean
    return this
  }

  setCanPromoteMembers(boolean) {
    this.canPromoteMembers = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.chat_id = this.id
    }
    if (this.userId) {
      params.user_id = this.userId
    }
    if (Helper.exists(this.anonymous)) {
      params.is_anonymous = this.anonymous
    }
    if (Helper.exists(this.canChangeInfo)) {
      params.can_change_info = this.canChangeInfo
    }
    if (Helper.exists(this.canPostMessages)) {
      params.can_post_messages = this.canPostMessages
    }
    if (Helper.exists(this.canEditMessages)) {
      params.can_edit_messages = this.canEditMessages
    }
    if (Helper.exists(this.canDeleteMessages)) {
      params.can_delete_messages = this.canDeleteMessages
    }
    if (Helper.exists(this.canInviteUsers)) {
      params.can_invite_users = this.canInviteUsers
    }
    if (Helper.exists(this.canRestrictMembers)) {
      params.can_restrict_members = this.canRestrictMembers
    }
    if (Helper.exists(this.canPinMessages)) {
      params.can_pin_messages = this.canPinMessages
    }
    if (Helper.exists(this.canPromoteMembers)) {
      params.can_promote_members = this.canPromoteMembers
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
