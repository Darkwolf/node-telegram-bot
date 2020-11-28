const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultPhoto extends InlineQueryResult {
  constructor(id, url, options) {
    super(InlineQueryResultPhoto.type, id, {
      ...options,
      url
    })
  }
}
InlineQueryResultPhoto.type = InlineQueryResultType.PHOTO
InlineQueryResultPhoto.from = (id, url, options) => new InlineQueryResultPhoto(id, url, options)

module.exports = InlineQueryResultPhoto
