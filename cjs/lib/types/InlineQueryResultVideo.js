const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultVideo extends InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultVideo.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultVideo.type = InlineQueryResultType.VIDEO
InlineQueryResultVideo.from = (id, title, url, options) => new InlineQueryResultVideo(id, title, url, options)

module.exports = InlineQueryResultVideo
