export default class CallbackGame {
  static from(data, context) {
    return new CallbackGame(data, context)
  }

  static fromParams(params = {}, context) {
    return new CallbackGame({}, context)
  }

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
