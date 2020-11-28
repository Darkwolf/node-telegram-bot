const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultAudio extends InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultAudio.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultAudio.type = InlineQueryResultType.AUDIO
InlineQueryResultAudio.from = (id, title, url, options) => new InlineQueryResultAudio(id, title, url, options)

module.exports = InlineQueryResultAudio
