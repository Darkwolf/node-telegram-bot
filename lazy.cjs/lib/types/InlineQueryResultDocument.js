const types = require('./')
const constants = require('../constants')

class InlineQueryResultDocument extends types.InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultDocument.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultDocument.type = constants.InlineQueryResultType.DOCUMENT
InlineQueryResultDocument.from = (id, title, url, options) => new InlineQueryResultDocument(id, title, url, options)

module.exports = InlineQueryResultDocument
