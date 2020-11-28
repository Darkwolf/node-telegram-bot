const Helper = require('@darkwolf/helper.cjs')
const MessageEntity = require('./MessageEntity')

class InputMessageContent {
  constructor(options = {}) {
    this
      .setText(options.text)
      .setParseMode(options.parseMode)
      .setEntities(options.entities)
      .setDisableWebPagePreview(options.disableWebPagePreview)
      .setLatitude(options.latitude)
      .setLongitude(options.longitude)
      .setHorizontalAccuracy(options.horizontalAccuracy)
      .setLivePeriod(options.livePeriod)
      .setHeading(options.heading)
      .setProximityAlertRadius(options.proximityAlertRadius)
      .setTitle(options.title)
      .setAddress(options.address)
      .setFoursquareId(options.foursquareId)
      .setFoursquareType(options.foursquareType)
      .setGooglePlaceId(options.googlePlaceId)
      .setGooglePlaceType(options.googlePlaceType)
      .setPhoneNumber(options.phoneNumber)
      .setFirstName(options.firstName)
      .setLastName(options.lastName)
      .setVcard(options.vcard)
  }

  setText(text) {
    this.text = text
    return this
  }

  setParseMode(mode) {
    this.parseMode = mode
    return this
  }

  setEntities(entities) {
    this.entities = entities ? entities.map(entity =>
      entity instanceof MessageEntity ? entity : new MessageEntity(entity)
    ) : undefined
    return this
  }

  setDisableWebPagePreview(boolean) {
    this.disableWebPagePreview = boolean
    return this
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

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  setFirstName(firstName) {
    this.firstName = firstName
    return this
  }

  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  setVcard(vcard) {
    this.vcard = vcard
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.text)) {
      params.message_text = `${this.text}`
    }
    if (this.parseMode) {
      params.parse_mode = this.parseMode
    }
    if (this.entities) {
      params.entities = this.entities.map(entity => entity.toParams())
    }
    if (Helper.exists(this.disableWebPagePreview)) {
      params.disable_web_page_preview = this.disableWebPagePreview
    }
    if (Helper.exists(this.latitude)) {
      params.latitude = this.latitude
    }
    if (Helper.exists(this.longitude)) {
      params.longitude = this.longitude
    }
    if (Helper.exists(this.horizontalAccuracy)) {
      params.horizontal_accuracy = this.horizontalAccuracy
    }
    if (Helper.exists(this.livePeriod)) {
      params.live_period = this.livePeriod
    }
    if (this.heading) {
      params.heading = this.heading
    }
    if (Helper.exists(this.proximityAlertRadius)) {
      params.proximity_alert_radius = this.proximityAlertRadius
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (Helper.exists(this.address)) {
      params.address = this.address
    }
    if (this.foursquareId) {
      params.foursquare_id = this.foursquareId
    }
    if (this.foursquareType) {
      params.foursquare_type = this.foursquareType
    }
    if (this.googlePlaceId) {
      params.google_place_id = this.googlePlaceId
    }
    if (this.googlePlaceType) {
      params.google_place_type = this.googlePlaceType
    }
    if (this.phoneNumber) {
      params.phone_number = this.phoneNumber
    }
    if (Helper.exists(this.firstName)) {
      params.first_name = this.firstName
    }
    if (Helper.exists(this.lastName)) {
      params.last_name = this.lastName
    }
    if (Helper.exists(this.vcard)) {
      params.vcard = this.vcard
    }
    return params
  }
}
InputMessageContent.from = options => new InputMessageContent(options)

module.exports = InputMessageContent
