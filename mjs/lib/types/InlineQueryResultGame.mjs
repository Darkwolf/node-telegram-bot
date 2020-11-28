import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultGame extends InlineQueryResult {
  static type = InlineQueryResultType.GAME

  static from(id, gameShortName, options) {
    return new InlineQueryResultGame(id, gameShortName, options)
  }

  constructor(id, gameShortName, options) {
    super(InlineQueryResultGame.type, id, {
      ...options,
      gameShortName
    })
  }
}
