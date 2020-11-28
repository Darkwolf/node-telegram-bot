import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedPhoto extends InlineQueryResult {
  static type = InlineQueryResultType.PHOTO

  static from(id, fileId, options) {
    return new InlineQueryResultCachedPhoto(id, fileId, options)
  }

  constructor(id, fileId, options) {
    super(InlineQueryResultCachedPhoto.type, id, {
      ...options,
      fileId
    })
  }
}
