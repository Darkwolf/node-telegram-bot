const types = require('./')
const constants = require('../constants')

class InlineQueryResultLocation extends types.InlineQueryResult {
  constructor(id, latitude, longitude, title, options) {
    super(InlineQueryResultLocation.type, id, {
      ...options,
      latitude,
      longitude,
      title
    })
  }
}
InlineQueryResultLocation.type = constants.InlineQueryResultType.LOCATION
InlineQueryResultLocation.from = (id, latitude, longitude, title, options) => new InlineQueryResultLocation(id, latitude, longitude, title, options)

module.exports = InlineQueryResultLocation
