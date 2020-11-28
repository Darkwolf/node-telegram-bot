import Helper from '@darkwolf/helper.mjs'

export default class ResponseParameters {
  static from(data) {
    return new ResponseParameters(data)
  }

  static fromParams(params = {}) {
    return new ResponseParameters({
      migrateToChatId: params.migrate_to_chat_id,
      retryAfter: params.retry_after
    })
  }

  constructor(data = {}) {
    this
      .setMigrateToChatId(data.migrateToChatId)
      .setRetryAfter(data.retryAfter)
  }

  setMigrateToChatId(id) {
    this.migrateToChatId = id
    return this
  }

  setRetryAfter(duration) {
    this.retryAfter = duration
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.migrateToChatId)) {
      data.migrateToChatId = this.migrateToChatId
    }
    if (Helper.exists(this.retryAfter)) {
      data.retryAfter = this.retryAfter
    }
    return data
  }
}
