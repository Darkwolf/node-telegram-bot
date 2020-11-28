class CallbackGame {
  constructor(data = {}, context) {
    this
      .setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  toJSON() {
    const data = {}
    return data
  }
}
CallbackGame.from = (data, context) => new CallbackGame(data, context)
CallbackGame.fromParams = (params = {}, context) => new CallbackGame({}, context)

module.exports = CallbackGame
