import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultLocation extends InlineQueryResult {
  static type = InlineQueryResultType.LOCATION

  static from(id, latitude, longitude, title, options) {
    return new InlineQueryResultLocation(id, latitude, longitude, title, options)
  }

  constructor(id, latitude, longitude, title, options) {
    super(InlineQueryResultLocation.type, id, {
      ...options,
      latitude,
      longitude,
      title
    })
  }
}
