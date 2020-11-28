const Helper = require('@darkwolf/helper.cjs')
const { ChatMemberStatus } = require('../constants')
const User = require('./User')

class ChatMember {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUser(data.user)
      .setStatus(data.status)
      .setCustomTitle(data.customTitle)
      .setAnonymous(data.anonymous)
      .setMember(data.member)
      .setCanBeEdited(data.canBeEdited)
      .setCanPostMessages(data.canPostMessages)
      .setCanEditMessages(data.canEditMessages)
      .setCanDeleteMessages(data.canDeleteMessages)
      .setCanRestrictMembers(data.canRestrictMembers)
      .setCanPromoteMembers(data.canPromoteMembers)
      .setCanChangeInfo(data.canChangeInfo)
      .setCanInviteUsers(data.canInviteUsers)
      .setCanPinMessages(data.canPinMessages)
      .setCanSendMessages(data.canSendMessages)
      .setCanSendMediaMessages(data.canSendMediaMessages)
      .setCanSendPolls(data.canSendPolls)
      .setCanSendOtherMessages(data.canSendOtherMessages)
      .setCanAddWebPagePreviews(data.canAddWebPagePreviews)
      .setUntilDate(data.untilDate)
  }

  get isCreator() {
    return this.status === ChatMemberStatus.CREATOR
  }

  get isAdmin() {
    return this.status === ChatMemberStatus.ADMIN
  }

  get isMember() {
    return this.status === ChatMemberStatus.MEMBER || !!this.member
  }

  get isRestricted() {
    return this.status === ChatMemberStatus.RESTRICTED
  }

  get isLeft() {
    return this.status === ChatMemberStatus.LEFT
  }

  get isKicked() {
    return this.status === ChatMemberStatus.KICKED
  }

  get isKickedOnly() {
    return this.isKicked && !this.untilDate
  }

  get isBanned() {
    return this.isKicked && !!this.untilDate
  }

  get isAnonymous() {
    return !!this.anonymous
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUser(user) {
    this.user = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setCustomTitle(title) {
    this.customTitle = title
    return this
  }

  setAnonymous(boolean) {
    this.anonymous = boolean
    return this
  }

  setMember(boolean) {
    this.member = boolean
    return this
  }

  setCanBeEdited(boolean) {
    this.canBeEdited = boolean
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

  setCanRestrictMembers(boolean) {
    this.canRestrictMembers = boolean
    return this
  }

  setCanPromoteMembers(boolean) {
    this.canPromoteMembers = boolean
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

  setUntilDate(date) {
    this.untilDate = date
    return this
  }

  kick(options) {
    return this.context.telegramBot.kickChatMember(this.context.chatId, this.user.id, options)
  }

  ban(options) {
    return this.context.telegramBot.banChatMember(this.context.chatId, this.user.id, options)
  }

  unban() {
    return this.context.telegramBot.unbanChatMember(this.context.chatId, this.user.id)
  }

  restrict(permissions, options) {
    return this.context.telegramBot.restrictChatMember(this.context.chatId, this.user.id, permissions, options)
  }

  promote(options) {
    return this.context.telegramBot.promoteChatMember(this.context.chatId, this.user.id, options)
  }

  setNewCustomTitle(title) {
    return this.context.telegramBot.setChatAdminCustomTitle(this.context.chatId, this.user.id, title)
  }

  removeCustomTitle() {
    return this.context.telegramBot.removeChatAdminCustomTitle(this.context.chatId, this.user.id)
  }

  get() {
    return this.context.telegramBot.getChatMember(this.context.chatId, this.user.id)
  }

  toJSON() {
    const data = {}
    if (this.user) {
      data.user = this.user.toJSON()
    }
    if (this.status) {
      data.status = this.status
    }
    if (Helper.exists(this.customTitle)) {
      data.customTitle = this.customTitle
    }
    if (Helper.exists(this.anonymous)) {
      data.anonymous = this.anonymous
    }
    if (Helper.exists(this.member)) {
      data.member = this.member
    }
    if (Helper.exists(this.canBeEdited)) {
      data.canBeEdited = this.canBeEdited
    }
    if (Helper.exists(this.canPostMessages)) {
      data.canPostMessages = this.canPostMessages
    }
    if (Helper.exists(this.canEditMessages)) {
      data.canEditMessages = this.canEditMessages
    }
    if (Helper.exists(this.canDeleteMessages)) {
      data.canDeleteMessages = this.canDeleteMessages
    }
    if (Helper.exists(this.canRestrictMembers)) {
      data.canRestrictMembers = this.canRestrictMembers
    }
    if (Helper.exists(this.canPromoteMembers)) {
      data.canPromoteMembers = this.canPromoteMembers
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
    if (this.untilDate) {
      data.untilDate = this.untilDate
    }
    return data
  }
}
ChatMember.from = (data, context) => new ChatMember(data, context)
ChatMember.fromParams = (params = {}, context) => {
  const data = {
    user: params.user,
    status: params.status,
    customTitle: params.custom_title,
    anonymous: params.is_anonymous,
    member: params.is_member,
    canBeEdited: params.can_be_edited,
    canPostMessages: params.can_post_messages,
    canEditMessages: params.can_edit_messages,
    canDeleteMessages: params.can_delete_messages,
    canRestrictMembers: params.can_restrict_members,
    canPromoteMembers: params.can_promote_members,
    canChangeInfo: params.can_change_info,
    canInviteUsers: params.can_invite_users,
    canPinMessages: params.can_pin_messages,
    canSendMessages: params.can_send_messages,
    canSendMediaMessages: params.can_send_media_messages,
    canSendPolls: params.can_send_polls,
    canSendOtherMessages: params.can_send_other_messages,
    canAddWebPagePreviews: params.can_add_web_page_previews,
    untilDate: params.until_date
  }
  if (data.user) {
    data.user = User.fromParams(data.user, context)
  }
  return new ChatMember(data, context)
}

module.exports = ChatMember
