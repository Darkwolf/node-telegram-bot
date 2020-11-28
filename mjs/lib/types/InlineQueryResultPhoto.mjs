import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultPhoto extends InlineQueryResult {
  static type = InlineQueryResultType.PHOTO

  static from(id, url, options) {
    return new InlineQueryResultPhoto(id, url, options)
  }

  constructor(id, url, options) {
    super(InlineQueryResultPhoto.type, id, {
      ...options,
      url
    })
  }
}
