const Helper = require('@darkwolf/helper.cjs')

class ResponseParameters {
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
ResponseParameters.from = data => new ResponseParameters(data)
ResponseParameters.fromParams = (params = {}) => new ResponseParameters({
  migrateToChatId: params.migrate_to_chat_id,
  retryAfter: params.retry_after
})

module.exports = ResponseParameters
