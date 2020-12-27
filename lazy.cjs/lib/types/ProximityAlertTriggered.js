const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

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
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setWatcher(user) {
    this.watcher = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
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
    data.traveler = types.User.fromParams(data.traveler, context)
  }
  if (data.watcher) {
    data.watcher = types.User.fromParams(data.watcher, context)
  }
  return new ProximityAlertTriggered(data, context)
}

module.exports = ProximityAlertTriggered
