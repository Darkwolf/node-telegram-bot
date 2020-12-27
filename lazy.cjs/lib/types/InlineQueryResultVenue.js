const types = require('./')
const constants = require('../constants')

class InlineQueryResultVenue extends types.InlineQueryResult {
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
InlineQueryResultVenue.type = constants.InlineQueryResultType.VENUE
InlineQueryResultVenue.from = (id, latitude, longitude, title, address, options) => new InlineQueryResultVenue(id, latitude, longitude, title, address, options)

module.exports = InlineQueryResultVenue
