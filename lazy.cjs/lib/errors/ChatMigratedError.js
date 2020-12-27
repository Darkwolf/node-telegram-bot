const errors = require('./')

class ChatMigratedError extends errors.Error {
  constructor(id, migrateToChatId) {
    super(`Chat migrated: '${id}'. Migrated to chat: '${migrateToChatId}'.`, ChatMigratedError.code)
    this
      .setName(ChatMigratedError.name)
      .setMigrateToChatId(migrateToChatId)
  }

  setMigrateToChatId(id) {
    this.migrateToChatId = id
    return this
  }
}
ChatMigratedError.name = 'ChatMigratedError'
ChatMigratedError.code = 'chat-migrated'

module.exports = ChatMigratedError
