const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultDocument extends InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultDocument.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultDocument.type = InlineQueryResultType.DOCUMENT
InlineQueryResultDocument.from = (id, title, url, options) => new InlineQueryResultDocument(id, title, url, options)

module.exports = InlineQueryResultDocument
