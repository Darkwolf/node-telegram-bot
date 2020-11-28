const Helper = require('@darkwolf/helper.cjs')
const User = require('./User')

class ProximityAlertTriggered {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTraveler(data.traveler)
      .setWatcher(data.watcher)
      .setDistance(data.distance)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTraveler(user) {
    this.traveler = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setWatcher(user) {
    this.watcher = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (this.traveler) {
      data.traveler = this.traveler.toJSON()
    }
    if (this.watcher) {
      data.watcher = this.watcher.toJSON()
    }
    if (Helper.exists(this.distance)) {
      data.distance = this.distance
    }
    return data
  }
}
ProximityAlertTriggered.from = (data, context) => new ProximityAlertTriggered(data, context)
ProximityAlertTriggered.fromParams = (params = {}, context) => {
  const data = {
    traveler: params.traveler,
    watcher: params.watcher,
    distance: params.distance
  }
  if (data.traveler) {
    data.traveler = User.fromParams(data.traveler, context)
  }
  if (data.watcher) {
    data.watcher = User.fromParams(data.watcher, context)
  }
  return new ProximityAlertTriggered(data, context)
}

module.exports = ProximityAlertTriggered
