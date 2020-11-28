import Helper from '@darkwolf/helper.mjs'
import Location from './Location.mjs'

export default class Venue {
  static from(data, context) {
    return new Venue(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      location: params.location,
      title: params.title,
      address: params.address,
      foursquareId: params.foursquare_id,
      foursquareType: params.foursquare_type,
      googlePlaceId: params.google_place_id,
      googlePlaceType: params.google_place_type
    }
    if (data.location) {
      data.location = Location.fromParams(data.location)
    }
    return new Venue(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setLocation(data.location)
      .setTitle(data.title)
      .setAddress(data.address)
      .setFoursquareId(data.foursquareId)
      .setFoursquareType(data.foursquareType)
      .setGooglePlaceId(data.googlePlaceId)
      .setGooglePlaceType(data.googlePlaceType)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof Location ? location : new Location(location)
    ) : undefined
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  setFoursquareId(id) {
    this.foursquareId = id
    return this
  }

  setFoursquareType(type) {
    this.foursquareType = type
    return this
  }

  setGooglePlaceId(id) {
    this.googlePlaceId = id
    return this
  }

  setGooglePlaceType(type) {
    this.googlePlaceType = type
    return this
  }

  toJSON() {
    const data = {}
    if (this.location) {
      data.location = this.location.toJSON()
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.address)) {
      data.address = this.address
    }
    if (this.foursquareId) {
      data.foursquareId = this.foursquareId
    }
    if (this.foursquareType) {
      data.foursquareType = this.foursquareType
    }
    if (this.googlePlaceId) {
      data.googlePlaceId = this.googlePlaceId
    }
    if (this.googlePlaceType) {
      data.googlePlaceType = this.googlePlaceType
    }
    return data
  }
}
