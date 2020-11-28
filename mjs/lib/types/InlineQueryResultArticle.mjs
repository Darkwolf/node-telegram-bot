import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultArticle extends InlineQueryResult {
  static type = InlineQueryResultType.ARTICLE

  static from(id, title, inputMessageContent, options) {
    return new InlineQueryResultArticle(id, title, inputMessageContent, options)
  }

  constructor(id, title, inputMessageContent, options) {
    super(InlineQueryResultArticle.type, id, {
      ...options,
      title,
      inputMessageContent
    })
  }
}
