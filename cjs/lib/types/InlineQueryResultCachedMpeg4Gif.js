const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedMpeg4Gif extends InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedMpeg4Gif.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedMpeg4Gif.type = InlineQueryResultType.MPEG4_GIF
InlineQueryResultCachedMpeg4Gif.from = (id, fileId, options) => new InlineQueryResultCachedMpeg4Gif(id, fileId, options)

module.exports = InlineQueryResultCachedMpeg4Gif
