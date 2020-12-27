const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedDocument extends types.InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedDocument.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedDocument.type = constants.InlineQueryResultType.DOCUMENT
InlineQueryResultCachedDocument.from = (id, title, fileId, options) => new InlineQueryResultCachedDocument(id, title, fileId, options)

module.exports = InlineQueryResultCachedDocument
