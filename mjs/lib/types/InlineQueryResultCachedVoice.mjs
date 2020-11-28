import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedVoice extends InlineQueryResult {
  static type = InlineQueryResultType.VOICE

  static from(id, title, fileId, options) {
    return new InlineQueryResultCachedVoice(id, title, fileId, options)
  }

  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedVoice.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
