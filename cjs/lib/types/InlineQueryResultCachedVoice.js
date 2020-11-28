const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedVoice extends InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVoice.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedVoice.type = InlineQueryResultType.VOICE
InlineQueryResultCachedVoice.from = (id, title, fileId, options) => new InlineQueryResultCachedVoice(id, title, fileId, options)

module.exports = InlineQueryResultCachedVoice
