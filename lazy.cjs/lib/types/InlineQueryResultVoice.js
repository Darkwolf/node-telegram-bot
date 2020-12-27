const types = require('./')
const constants = require('../constants')

class InlineQueryResultVoice extends types.InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultVoice.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultVoice.type = constants.InlineQueryResultType.VOICE
InlineQueryResultVoice.from = (id, title, url, options) => new InlineQueryResultVoice(id, title, url, options)

module.exports = InlineQueryResultVoice
