import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultAudio extends InlineQueryResult {
  static type = InlineQueryResultType.AUDIO

  static from(id, title, url, options) {
    return new InlineQueryResultAudio(id, title, url, options)
  }

  constructor(id, title, url, options) {
    super(InlineQueryResultAudio.type, id, {
      ...options,
      title,
      url
    })
  }
}
