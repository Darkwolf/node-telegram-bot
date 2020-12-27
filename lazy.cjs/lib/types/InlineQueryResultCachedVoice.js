const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedVoice extends types.InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVoice.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedVoice.type = constants.InlineQueryResultType.VOICE
InlineQueryResultCachedVoice.from = (id, title, fileId, options) => new InlineQueryResultCachedVoice(id, title, fileId, options)

module.exports = InlineQueryResultCachedVoice
