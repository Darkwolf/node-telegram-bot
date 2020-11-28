const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultVoice extends InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultVoice.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultVoice.type = InlineQueryResultType.VOICE
InlineQueryResultVoice.from = (id, title, url, options) => new InlineQueryResultVoice(id, title, url, options)

module.exports = InlineQueryResultVoice
