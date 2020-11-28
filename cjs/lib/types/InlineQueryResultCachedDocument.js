const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedDocument extends InlineQueryResult {
  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedDocument.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
InlineQueryResultCachedDocument.type = InlineQueryResultType.DOCUMENT
InlineQueryResultCachedDocument.from = (id, title, fileId, options) => new InlineQueryResultCachedDocument(id, title, fileId, options)

module.exports = InlineQueryResultCachedDocument
