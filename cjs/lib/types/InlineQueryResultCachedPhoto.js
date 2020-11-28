const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultCachedPhoto extends InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedPhoto.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedPhoto.type = InlineQueryResultType.PHOTO
InlineQueryResultCachedPhoto.from = (id, fileId, options) => new InlineQueryResultCachedPhoto(id, fileId, options)

module.exports = InlineQueryResultCachedPhoto
