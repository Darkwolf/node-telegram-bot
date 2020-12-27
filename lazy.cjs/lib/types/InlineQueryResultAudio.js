const types = require('./')
const constants = require('../constants')

class InlineQueryResultAudio extends types.InlineQueryResult {
  constructor(id, title, url, options) {
    super(InlineQueryResultAudio.type, id, {
      ...options,
      title,
      url
    })
  }
}
InlineQueryResultAudio.type = constants.InlineQueryResultType.AUDIO
InlineQueryResultAudio.from = (id, title, url, options) => new InlineQueryResultAudio(id, title, url, options)

module.exports = InlineQueryResultAudio
