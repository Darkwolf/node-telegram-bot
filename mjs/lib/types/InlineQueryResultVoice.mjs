import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultVoice extends InlineQueryResult {
  static type = InlineQueryResultType.VOICE

  static from(id, title, url, options) {
    return new InlineQueryResultVoice(id, title, url, options)
  }

  constructor(id, title, url, options) {
    super(InlineQueryResultVoice.type, id, {
      ...options,
      title,
      url
    })
  }
}
