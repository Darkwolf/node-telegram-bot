import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedDocument extends InlineQueryResult {
  static type = InlineQueryResultType.DOCUMENT

  static from(id, title, fileId, options) {
    return new InlineQueryResultCachedDocument(id, title, fileId, options)
  }

  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedDocument.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
