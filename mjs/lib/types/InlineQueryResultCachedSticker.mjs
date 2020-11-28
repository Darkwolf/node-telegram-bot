import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedSticker extends InlineQueryResult {
  static type = InlineQueryResultType.STICKER

  static from(id, fileId, options) {
    return new InlineQueryResultCachedSticker(id, fileId, options)
  }

  constructor(id, fileId, options) {
    super(InlineQueryResultCachedSticker.type, id, {
      ...options,
      fileId
    })
  }
}
