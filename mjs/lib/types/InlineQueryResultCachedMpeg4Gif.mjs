import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedMpeg4Gif extends InlineQueryResult {
  static type = InlineQueryResultType.MPEG4_GIF

  static from(id, fileId, options) {
    return new InlineQueryResultCachedMpeg4Gif(id, fileId, options)
  }

  constructor(id, fileId, options) {
    super(InlineQueryResultCachedMpeg4Gif.type, id, {
      ...options,
      fileId
    })
  }
}
