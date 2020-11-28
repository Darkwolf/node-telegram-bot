const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedGif extends InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedGif.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedGif.type = InlineQueryResultType.GIF
InlineQueryResultCachedGif.from = (id, fileId, options) => new InlineQueryResultCachedGif(id, fileId, options)

module.exports = InlineQueryResultCachedGif
