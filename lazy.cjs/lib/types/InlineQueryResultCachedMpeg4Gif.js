const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedMpeg4Gif extends types.InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedMpeg4Gif.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedMpeg4Gif.type = constants.InlineQueryResultType.MPEG4_GIF
InlineQueryResultCachedMpeg4Gif.from = (id, fileId, options) => new InlineQueryResultCachedMpeg4Gif(id, fileId, options)

module.exports = InlineQueryResultCachedMpeg4Gif
