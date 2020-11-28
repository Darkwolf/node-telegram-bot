import Error from './Error.mjs'

export default class ChatMigratedError extends Error {
  static name = 'ChatMigratedError'
  static code = 'chat-migrated'

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
