const types = require('./')
const constants = require('../constants')

class InlineQueryResultPhoto extends types.InlineQueryResult {
  constructor(id, url, options) {
    super(InlineQueryResultPhoto.type, id, {
      ...options,
      url
    })
  }
}
InlineQueryResultPhoto.type = constants.InlineQueryResultType.PHOTO
InlineQueryResultPhoto.from = (id, url, options) => new InlineQueryResultPhoto(id, url, options)

module.exports = InlineQueryResultPhoto
