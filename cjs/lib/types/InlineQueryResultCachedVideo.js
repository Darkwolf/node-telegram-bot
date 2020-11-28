const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedVideo extends InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVideo.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedVideo.type = InlineQueryResultType.VIDEO
InlineQueryResultCachedVideo.from = (id, title, fileId, options) => new InlineQueryResultCachedVideo(id, title, fileId, options)

module.exports = InlineQueryResultCachedVideo
