const Helper = require('@darkwolf/helper.cjs')
const User = require('./User')

class GameHighScore {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setPosition(data.position)
      .setUser(data.user)
      .setScore(data.score)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPosition(position) {
    this.position = position
    return this
  }

  setUser(user) {
    this.user = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setScore(score) {
    this.score = score
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.position)) {
      data.position = this.position
    }
    if (this.user) {
      data.user = this.user.toJSON()
    }
    if (Helper.exists(this.score)) {
      data.score = this.score
    }
    return data
  }
}
GameHighScore.from = (data, context) => new GameHighScore(data, context)
GameHighScore.fromParams = (params = {}, context) => {
  const data = {
    position: params.position,
    user: params.user,
    score: params.score
  }
  if (data.user) {
    data.user = User.fromParams(data.user, context)
  }
  return new GameHighScore(data, context)
}

module.exports = GameHighScore
