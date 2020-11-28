const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultGif extends InlineQueryResult {
  constructor(id, url, options) {
    super(InlineQueryResultGif.type, id, {
      ...options,
      url
    })
  }
}
InlineQueryResultGif.type = InlineQueryResultType.GIF
InlineQueryResultGif.from = (id, url, options) => new InlineQueryResultGif(id, url, options)

module.exports = InlineQueryResultGif
