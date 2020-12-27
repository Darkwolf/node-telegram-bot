const types = require('./')
const constants = require('../constants')

class InlineQueryResultVideo extends types.InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultVideo.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultVideo.type = constants.InlineQueryResultType.VIDEO
InlineQueryResultVideo.from = (id, title, url, options) => new InlineQueryResultVideo(id, title, url, options)

module.exports = InlineQueryResultVideo
