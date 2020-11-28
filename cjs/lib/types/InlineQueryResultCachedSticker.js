const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedSticker extends InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedSticker.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedSticker.type = InlineQueryResultType.STICKER
InlineQueryResultCachedSticker.from = (id, fileId, options) => new InlineQueryResultCachedSticker(id, fileId, options)

module.exports = InlineQueryResultCachedSticker
