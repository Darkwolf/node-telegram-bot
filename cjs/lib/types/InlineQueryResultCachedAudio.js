const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedAudio extends InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedAudio.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedAudio.type = InlineQueryResultType.AUDIO
InlineQueryResultCachedAudio.from = (id, title, fileId, options) => new InlineQueryResultCachedAudio(id, title, fileId, options)

module.exports = InlineQueryResultCachedAudio
