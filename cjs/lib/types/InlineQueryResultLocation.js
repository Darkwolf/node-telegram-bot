const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultLocation extends InlineQueryResult {
  constructor(id, latitude, longitude, title, options) {
    super(InlineQueryResultLocation.type, id, {
      ...options,
      latitude,
      longitude,
      title
    })
  }
}
InlineQueryResultLocation.type = InlineQueryResultType.LOCATION
InlineQueryResultLocation.from = (id, latitude, longitude, title, options) => new InlineQueryResultLocation(id, latitude, longitude, title, options)

module.exports = InlineQueryResultLocation
