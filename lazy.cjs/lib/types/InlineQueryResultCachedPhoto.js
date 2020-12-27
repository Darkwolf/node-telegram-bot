const types = require('./')
const constants = require('../constants')

class InlineQueryResultCachedPhoto extends types.InlineQueryResult {
  constructor(id, fileId, options) {
    super(InlineQueryResultCachedPhoto.type, id, {
      ...options,
      fileId
    })
  }
}
InlineQueryResultCachedPhoto.type = constants.InlineQueryResultType.PHOTO
InlineQueryResultCachedPhoto.from = (id, fileId, options) => new InlineQueryResultCachedPhoto(id, fileId, options)

module.exports = InlineQueryResultCachedPhoto
