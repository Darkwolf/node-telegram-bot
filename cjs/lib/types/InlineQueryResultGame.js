const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultGame extends InlineQueryResult {
  constructor(id, gameShortName, options) {
    super(InlineQueryResultGame.type, id, {
      ...options,
      gameShortName
    })
  }
}
InlineQueryResultGame.type = InlineQueryResultType.GAME
InlineQueryResultGame.from = (id, gameShortName, options) => new InlineQueryResultGame(id, gameShortName, options)

module.exports = InlineQueryResultGame
