const types = require('./')
const constants = require('../constants')

class InlineQueryResultGame extends types.InlineQueryResult {
  constructor(id, gameShortName, options) {
    super(InlineQueryResultGame.type, id, {
      ...options,
      gameShortName
    })
  }
}
InlineQueryResultGame.type = constants.InlineQueryResultType.GAME
InlineQueryResultGame.from = (id, gameShortName, options) => new InlineQueryResultGame(id, gameShortName, options)

module.exports = InlineQueryResultGame
