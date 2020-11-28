import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedVideo extends InlineQueryResult {
  static type = InlineQueryResultType.VIDEO

  static from(id, title, fileId, options) {
    return new InlineQueryResultCachedVideo(id, title, fileId, options)
  }

  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVideo.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
