import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultDocument extends InlineQueryResult {
  static type = InlineQueryResultType.DOCUMENT

  static from(id, title, url, options) {
    return new InlineQueryResultDocument(id, title, url, options)
  }

  constructor(id, title, url, options) {
    super(InlineQueryResultDocument.type, id, {
      ...options,
      title,
      url
    })
  }
}
