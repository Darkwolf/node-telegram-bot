import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultMpeg4Gif extends InlineQueryResult {
  static type = InlineQueryResultType.MPEG4_GIF

  static from(id, url, options) {
    return new InlineQueryResultMpeg4Gif(id, url, options)
  }

  constructor(id, url, options) {
    super(InlineQueryResultMpeg4Gif.type, id, {
      ...options,
      url
    })
  }
}
