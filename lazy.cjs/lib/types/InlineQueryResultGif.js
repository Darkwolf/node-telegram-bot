const types = require('./')
const constants = require('../constants')

class InlineQueryResultGif extends types.InlineQueryResult {
  constructor(id, url, options) {
    super(InlineQueryResultGif.type, id, {
      ...options,
      url
    })
  }
}
InlineQueryResultGif.type = constants.InlineQueryResultType.GIF
InlineQueryResultGif.from = (id, url, options) => new InlineQueryResultGif(id, url, options)

module.exports = InlineQueryResultGif
