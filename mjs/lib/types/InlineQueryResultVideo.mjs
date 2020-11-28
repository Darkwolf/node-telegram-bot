import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultVideo extends InlineQueryResult {
  static type = InlineQueryResultType.VIDEO

  static from(id, title, url, options) {
    return new InlineQueryResultVideo(id, title, url, options)
  }

  constructor(id, title, url, options) {
    super(InlineQueryResultVideo.type, id, {
      ...options,
      title,
      url
    })
  }
}
