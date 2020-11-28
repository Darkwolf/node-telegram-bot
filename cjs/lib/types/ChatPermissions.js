const Helper = require('@darkwolf/helper.cjs')

class ChatPermissions {
  constructor(options = {}, context) {
    this
      .setContext(context)
      .setCanSendMessages(options.canSendMessages)
      .setCanSendMediaMessages(options.canSendMediaMessages)
      .setCanSendPolls(options.canSendPolls)
      .setCanSendOtherMessages(options.canSendOtherMessages)
      .setCanAddWebPagePreviews(options.canAddWebPagePreviews)
      .setCanChangeInfo(options.canChangeInfo)
      .setCanInviteUsers(options.canInviteUsers)
      .setCanPinMessages(options.canPinMessages)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCanSendMessages(boolean) {
    this.canSendMessages = boolean
    return this
  }

  setCanSendMediaMessages(boolean) {
    this.canSendMediaMessages = boolean
    return this
  }

  setCanSendPolls(boolean) {
    this.canSendPolls = boolean
    return this
  }

  setCanSendOtherMessages(boolean) {
    this.canSendOtherMessages = boolean
    return this
  }

  setCanAddWebPagePreviews(boolean) {
    this.canAddWebPagePreviews = boolean
    return this
  }

  setCanChangeInfo(boolean) {
    this.canChangeInfo = boolean
    return this
  }

  setCanInviteUsers(boolean) {
    this.canInviteUsers = boolean
    return this
  }

  setCanPinMessages(boolean) {
    this.canPinMessages = boolean
    return this
  }

  set() {
    return this.context.telegramBot.setChatPermissions(this.context.chatId, this)
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.canSendMessages)) {
      params.can_send_messages = this.canSendMessages
    }
    if (Helper.exists(this.canSendMediaMessages)) {
      params.can_send_media_messages = this.canSendMediaMessages
    }
    if (Helper.exists(this.canSendPolls)) {
      params.can_send_polls = this.canSendPolls
    }
    if (Helper.exists(this.canSendOtherMessages)) {
      params.can_send_other_messages = this.canSendOtherMessages
    }
    if (Helper.exists(this.canAddWebPagePreviews)) {
      params.can_add_web_page_previews = this.canAddWebPagePreviews
    }
    if (Helper.exists(this.canChangeInfo)) {
      params.can_change_info = this.canChangeInfo
    }
    if (Helper.exists(this.canInviteUsers)) {
      params.can_invite_users = this.canInviteUsers
    }
    if (Helper.exists(this.canPinMessages)) {
      params.can_pin_messages = this.canPinMessages
    }
    return params
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.canSendMessages)) {
      data.canSendMessages = this.canSendMessages
    }
    if (Helper.exists(this.canSendMediaMessages)) {
      data.canSendMediaMessages = this.canSendMediaMessages
    }
    if (Helper.exists(this.canSendPolls)) {
      data.canSendPolls = this.canSendPolls
    }
    if (Helper.exists(this.canSendOtherMessages)) {
      data.canSendOtherMessages = this.canSendOtherMessages
    }
    if (Helper.exists(this.canAddWebPagePreviews)) {
      data.canAddWebPagePreviews = this.canAddWebPagePreviews
    }
    if (Helper.exists(this.canChangeInfo)) {
      data.canChangeInfo = this.canChangeInfo
    }
    if (Helper.exists(this.canInviteUsers)) {
      data.canInviteUsers = this.canInviteUsers
    }
    if (Helper.exists(this.canPinMessages)) {
      data.canPinMessages = this.canPinMessages
    }
    return data
  }
}
ChatPermissions.from = (options, context) => new ChatPermissions(options, context)
ChatPermissions.fromParams = (params = {}, context) => new ChatPermissions({
  canSendMessages: params.can_send_messages,
  canSendMediaMessages: params.can_send_media_messages,
  canSendPolls: params.can_send_polls,
  canSendOtherMessages: params.can_send_other_messages,
  canAddWebPagePreviews: params.can_add_web_page_previews,
  canChangeInfo: params.can_change_info,
  canInviteUsers: params.can_invite_users,
  canPinMessages: params.can_pin_messages
}, context)

module.exports = ChatPermissions
