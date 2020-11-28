const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultMpeg4Gif extends InlineQueryResult {
  constructor(id, url, options) {
    super(InlineQueryResultMpeg4Gif.type, id, {
      ...options,
      url
    })
  }
}
InlineQueryResultMpeg4Gif.type = InlineQueryResultType.MPEG4_GIF
InlineQueryResultMpeg4Gif.from = (id, url, options) => new InlineQueryResultMpeg4Gif(id, url, options)

module.exports = InlineQueryResultMpeg4Gif
