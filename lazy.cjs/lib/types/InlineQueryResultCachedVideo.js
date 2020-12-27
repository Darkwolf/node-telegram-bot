const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedVideo extends types.InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVideo.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedVideo.type = constants.InlineQueryResultType.VIDEO
InlineQueryResultCachedVideo.from = (id, title, fileId, options) => new InlineQueryResultCachedVideo(id, title, fileId, options)

module.exports = InlineQueryResultCachedVideo
