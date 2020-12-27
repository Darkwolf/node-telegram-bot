const types = require('./')
const constants = require('../constants')

class InlineQueryResultArticle extends types.InlineQueryResult {
  constructor(id, title, inputMessageContent, options) {
    super(InlineQueryResultArticle.type, id, {
      ...options,
      title,
      inputMessageContent
    })
  }
}
InlineQueryResultArticle.type = constants.InlineQueryResultType.ARTICLE
InlineQueryResultArticle.from = (id, title, inputMessageContent, options) => new InlineQueryResultArticle(id, title, inputMessageContent, options)

module.exports = InlineQueryResultArticle
