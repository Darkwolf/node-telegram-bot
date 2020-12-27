const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedGif extends types.InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedGif.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedGif.type = constants.InlineQueryResultType.GIF
InlineQueryResultCachedGif.from = (id, fileId, options) => new InlineQueryResultCachedGif(id, fileId, options)

module.exports = InlineQueryResultCachedGif
