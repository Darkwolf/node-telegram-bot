import Helper from '@darkwolf/helper.mjs'

export default class Location {
  static from(data) {
    return new Location(data)
  }

  static fromParams(params = {}) {
    return new Location({
      latitude: params.latitude,
      longitude: params.longitude,
      horizontalAccuracy: params.horizontal_accuracy,
      livePeriod: params.live_period,
      heading: params.heading,
      proximityAlertRadius: params.proximity_alert_radius
    })
  }

  constructor(data = {}) {
    this
      .setLatitude(data.latitude)
      .setLongitude(data.longitude)
      .setHorizontalAccuracy(data.horizontalAccuracy)
      .setLivePeriod(data.livePeriod)
      .setHeading(data.heading)
      .setProximityAlertRadius(data.proximityAlertRadius)
  }

  setLatitude(latitude) {
    this.latitude = latitude
    return this
  }

  setLongitude(longitude) {
    this.longitude = longitude
    return this
  }

  setHorizontalAccuracy(radius) {
    this.horizontalAccuracy = radius
    return this
  }

  setLivePeriod(duration) {
    this.livePeriod = duration
    return this
  }

  setHeading(heading) {
    this.heading = heading
    return this
  }

  setProximityAlertRadius(radius) {
    this.proximityAlertRadius = radius
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.latitude)) {
      data.latitude = this.latitude
    }
    if (Helper.exists(this.longitude)) {
      data.longitude = this.longitude
    }
    if (Helper.exists(this.horizontalAccuracy)) {
      data.horizontalAccuracy = this.horizontalAccuracy
    }
    if (Helper.exists(this.livePeriod)) {
      data.livePeriod = this.livePeriod
    }
    if (this.heading) {
      data.heading = this.heading
    }
    if (Helper.exists(this.proximityAlertRadius)) {
      data.proximityAlertRadius = this.proximityAlertRadius
    }
    return data
  }
}
