import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultGif extends InlineQueryResult {
  static type = InlineQueryResultType.GIF

  static from(id, url, options) {
    return new InlineQueryResultGif(id, url, options)
  }

  constructor(id, url, options) {
    super(InlineQueryResultGif.type, id, {
      ...options,
      url
    })
  }
}
