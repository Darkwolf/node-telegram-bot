const Helper = require('@darkwolf/helper.cjs')
const types = require('./')
const constants = require('../constants')

class InlineQueryResult {
  constructor(type, id, options = {}) {
    this
      .setType(type)
      .setId(id)
      .setTitle(options.title)
      .setDescription(options.description)
      .setUrl(options.url)
      .setFileId(options.fileId)
      .setCaption(options.caption)
      .setParseMode(options.parseMode)
      .setCaptionEntities(options.captionEntities)
      .setWidth(options.width)
      .setHeight(options.height)
      .setDuration(options.duration)
      .setHideUrl(options.hideUrl)
      .setPerformer(options.performer)
      .setLatitude(options.latitude)
      .setLongitude(options.longitude)
      .setHorizontalAccuracy(options.horizontalAccuracy)
      .setLivePeriod(options.livePeriod)
      .setHeading(options.heading)
      .setProximityAlertRadius(options.proximityAlertRadius)
      .setAddress(options.address)
      .setFoursquareId(options.foursquareId)
      .setFoursquareType(options.foursquareType)
      .setGooglePlaceId(options.googlePlaceId)
      .setGooglePlaceType(options.googlePlaceType)
      .setPhoneNumber(options.phoneNumber)
      .setFirstName(options.firstName)
      .setLastName(options.lastName)
      .setVcard(options.vcard)
      .setGameShortName(options.gameShortName)
      .setMimeType(options.mimeType)
      .setThumbUrl(options.thumbUrl)
      .setThumbWidth(options.thumbWidth)
      .setThumbHeight(options.thumbHeight)
      .setThumbMimeType(options.thumbMimeType)
      .setInputMessageContent(options.inputMessageContent)
      .setReplyMarkup(options.replyMarkup)
  }

  setType(type) {
    this.type = type
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setFileId(id) {
    this.fileId = id
    return this
  }

  setCaption(caption) {
    this.caption = caption
    return this
  }

  setParseMode(mode) {
    this.parseMode = mode
    return this
  }

  setCaptionEntities(entities) {
    this.captionEntities = entities ? entities.map(entity =>
      entity instanceof types.MessageEntity ? entity : new types.MessageEntity(entity)
    ) : undefined
    return this
  }

  setWidth(width) {
    this.width = width
    return this
  }

  setHeight(height) {
    this.height = height
    return this
  }

  setDuration(duration) {
    this.duration = duration
    return this
  }

  setHideUrl(boolean) {
    this.hideUrl = boolean
    return this
  }

  setPerformer(performer) {
    this.performer = performer
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

  setGameShortName(name) {
    this.gameShortName = name
    return this
  }

  setMimeType(type) {
    this.mimeType = type
    return this
  }

  setThumbUrl(url) {
    this.thumbUrl = url
    return this
  }

  setThumbWidth(width) {
    this.thumbWidth = width
    return this
  }

  setThumbHeight(height) {
    this.thumbHeight = height
    return this
  }

  setThumbMimeType(type) {
    this.thumbMimeType = type
    return this
  }

  setInputMessageContent(content) {
    this.inputMessageContent = content ? (
      content instanceof types.InputMessageContent ? content : new types.InputMessageContent(content)
    ) : undefined
    return this
  }

  setReplyMarkup(markup) {
    this.replyMarkup = markup ? (
      markup instanceof types.InlineKeyboardMarkup ? markup : new types.InlineKeyboardMarkup(markup.inlineKeyboard)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      params.type = this.type
    }
    if (this.id) {
      params.id = this.id
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (Helper.exists(this.description)) {
      params.description = this.description
    }
    switch (this.type) {
      case constants.InlineQueryResultType.PHOTO: {
        if (this.fileId) {
          params.photo_file_id = this.fileId
        }
        if (this.url) {
          params.photo_url = this.url
        }
        if (this.width) {
          params.photo_width = this.width
        }
        if (this.height) {
          params.photo_height = this.height
        }
        break
      }
      case constants.InlineQueryResultType.GIF: {
        if (this.fileId) {
          params.gif_file_id = this.fileId
        }
        if (this.url) {
          params.gif_url = this.url
        }
        if (this.width) {
          params.gif_width = this.width
        }
        if (this.height) {
          params.gif_height = this.height
        }
        if (Helper.exists(this.duration)) {
          params.gif_duration = this.duration
        }
        break
      }
      case constants.InlineQueryResultType.MPEG4_GIF: {
        if (this.fileId) {
          params.mpeg4_file_id = this.fileId
        }
        if (this.url) {
          params.mpeg4_url = this.url
        }
        if (this.width) {
          params.mpeg4_width = this.width
        }
        if (this.height) {
          params.mpeg4_height = this.height
        }
        if (Helper.exists(this.duration)) {
          params.mpeg4_duration = this.duration
        }
        break
      }
      case constants.InlineQueryResultType.VIDEO: {
        if (this.fileId) {
          params.video_file_id = this.fileId
        }
        if (this.url) {
          params.video_url = this.url
        }
        if (this.width) {
          params.video_width = this.width
        }
        if (this.height) {
          params.video_height = this.height
        }
        if (Helper.exists(this.duration)) {
          params.video_duration = this.duration
        }
        break
      }
      case constants.InlineQueryResultType.AUDIO: {
        if (this.fileId) {
          params.audio_file_id = this.fileId
        }
        if (this.url) {
          params.audio_url = this.url
        }
        if (Helper.exists(this.duration)) {
          params.audio_duration = this.duration
        }
        break
      }
      case constants.InlineQueryResultType.VOICE: {
        if (this.fileId) {
          params.voice_file_id = this.fileId
        }
        if (this.url) {
          params.voice_url = this.url
        }
        if (Helper.exists(this.duration)) {
          params.voice_duration = this.duration
        }
        break
      }
      case constants.InlineQueryResultType.DOCUMENT: {
        if (this.fileId) {
          params.document_file_id = this.fileId
        }
        if (this.url) {
          params.document_url = this.url
        }
        break
      }
      case constants.InlineQueryResultType.STICKER: {
        if (this.fileId) {
          params.sticker_file_id = this.fileId
        }
        break
      }
      default: {
        if (this.url) {
          params.url = this.url
        }
      }
    }
    if (Helper.exists(this.caption)) {
      params.caption = `${this.caption}`
    }
    if (this.parseMode) {
      params.parse_mode = this.parseMode
    }
    if (this.captionEntities) {
      params.caption_entities = this.captionEntities.map(entity => entity.toParams())
    }
    if (Helper.exists(this.hideUrl)) {
      params.hide_url = this.hideUrl
    }
    if (Helper.exists(this.performer)) {
      params.performer = this.performer
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
    if (this.gameShortName) {
      params.game_short_name = this.gameShortName
    }
    if (this.mimeType) {
      params.mime_type = this.mimeType
    }
    if (this.thumbUrl) {
      params.thumb_url = this.thumbUrl
    }
    if (this.thumbWidth) {
      params.thumb_width = this.thumbWidth
    }
    if (this.thumbHeight) {
      params.thumb_height = this.thumbHeight
    }
    if (this.thumbMimeType) {
      params.thumb_mime_type = this.thumbMimeType
    }
    if (this.inputMessageContent) {
      params.input_message_content = this.inputMessageContent.toParams()
    }
    if (this.replyMarkup) {
      params.reply_markup = this.replyMarkup.toParams()
    }
    return params
  }
}
InlineQueryResult.from = (type, id, options) => new InlineQueryResult(type, id, options)

module.exports = InlineQueryResult
