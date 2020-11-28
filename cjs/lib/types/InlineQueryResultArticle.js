const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultArticle extends InlineQueryResult {
  constructor(id, title, inputMessageContent, options) {
    super(InlineQueryResultArticle.type, id, {
      ...options,
      title,
      inputMessageContent
    })
  }
}
InlineQueryResultArticle.type = InlineQueryResultType.ARTICLE
InlineQueryResultArticle.from = (id, title, inputMessageContent, options) => new InlineQueryResultArticle(id, title, inputMessageContent, options)

module.exports = InlineQueryResultArticle
