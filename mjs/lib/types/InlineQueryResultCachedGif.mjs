import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedGif extends InlineQueryResult {
  static type = InlineQueryResultType.GIF

  static from(id, fileId, options) {
    return new InlineQueryResultCachedGif(id, fileId, options)
  }

  constructor(id, fileId, options) {
    super(InlineQueryResultCachedGif.type, id, {
      ...options,
      fileId
    })
  }
}
