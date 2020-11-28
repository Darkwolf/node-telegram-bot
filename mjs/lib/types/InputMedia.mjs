import Helper from '@darkwolf/helper.mjs'
import InputFile from './InputFile.mjs'
import MessageEntity from './MessageEntity.mjs'

export default class InputMedia {
  static from(type, media, options) {
    return new InputMedia(type, media, options)
  }

  constructor(type, media, options = {}) {
    this
      .setType(type)
      .setMedia(media)
      .setCaption(options.caption)
      .setParseMode(options.parseMode)
      .setCaptionEntities(options.captionEntities)
      .setWidth(options.width)
      .setHeight(options.height)
      .setDuration(options.duration)
      .setSupportsStreaming(options.supportsStreaming)
      .setPerformer(options.performer)
      .setTitle(options.title)
      .setThumb(options.thumb)
      .setDisableContentTypeDetection(options.disableContentTypeDetection)
  }

  setType(type) {
    this.type = type
    return this
  }

  setMedia(media) {
    this.media = media ? (
      (Helper.isString(media) || media instanceof InputFile) ? media : new InputFile(media)
    ) : undefined
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
      entity instanceof MessageEntity ? entity : new MessageEntity(entity)
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

  setSupportsStreaming(boolean) {
    this.supportsStreaming = boolean
    return this
  }

  setPerformer(performer) {
    this.performer = performer
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      (Helper.isString(thumb) || thumb instanceof InputFile) ? thumb : new InputFile(thumb)
    ) : undefined
    return this
  }

  setDisableContentTypeDetection(boolean) {
    this.disableContentTypeDetection = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      params.type = this.type
    }
    if (this.media) {
      params.media = this.media
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
    if (this.width) {
      params.width = this.width
    }
    if (this.height) {
      params.height = this.height
    }
    if (Helper.exists(this.duration)) {
      params.duration = this.duration
    }
    if (Helper.exists(this.supportsStreaming)) {
      params.supports_streaming = this.supportsStreaming
    }
    if (Helper.exists(this.performer)) {
      params.performer = this.performer
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (this.thumb) {
      params.thumb = this.thumb
    }
    if (Helper.exists(this.disableContentTypeDetection)) {
      params.disable_content_type_detection = this.disableContentTypeDetection
    }
    return params
  }
}
