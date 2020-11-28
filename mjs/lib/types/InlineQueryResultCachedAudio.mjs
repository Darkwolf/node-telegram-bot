import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultCachedAudio extends InlineQueryResult {
  static type = InlineQueryResultType.AUDIO

  static from(id, title, fileId, options) {
    return new InlineQueryResultCachedAudio(id, title, fileId, options)
  }

  constructor(id, title, fileId, options) {
    super(InlineQueryResultCachedAudio.type, id, {
      ...options,
      title,
      fileId
    })
  }
}
