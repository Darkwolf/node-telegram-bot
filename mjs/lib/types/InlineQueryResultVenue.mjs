import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultVenue extends InlineQueryResult {
  static type = InlineQueryResultType.VENUE

  static from(id, latitude, longitude, title, address, options) {
    return new InlineQueryResultVenue(id, latitude, longitude, title, address, options)
  }

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
