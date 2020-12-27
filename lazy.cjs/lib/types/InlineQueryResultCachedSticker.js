const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedSticker extends types.InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedSticker.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedSticker.type = constants.InlineQueryResultType.STICKER
InlineQueryResultCachedSticker.from = (id, fileId, options) => new InlineQueryResultCachedSticker(id, fileId, options)

module.exports = InlineQueryResultCachedSticker
