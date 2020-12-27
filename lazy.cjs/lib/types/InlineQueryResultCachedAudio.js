const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedAudio extends types.InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedAudio.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedAudio.type = constants.InlineQueryResultType.AUDIO
InlineQueryResultCachedAudio.from = (id, title, fileId, options) => new InlineQueryResultCachedAudio(id, title, fileId, options)

module.exports = InlineQueryResultCachedAudio
