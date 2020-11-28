const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultVenue extends InlineQueryResult {
  constructor(id, latitude, longitude, title, address, options) {
    super(InlineQueryResultVenue.type, id, {
      ...options,
      latitude,
      longitude,
      title,
      address
    })
  }
}
InlineQueryResultVenue.type = InlineQueryResultType.VENUE
InlineQueryResultVenue.from = (id, latitude, longitude, title, address, options) => new InlineQueryResultVenue(id, latitude, longitude, title, address, options)

module.exports = InlineQueryResultVenue
