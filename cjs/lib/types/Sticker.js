const Helper = require('@darkwolf/helper.cjs')
const MaskPosition = require('./MaskPosition')
const PhotoSize = require('./PhotoSize')

class Sticker {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setWidth(data.width)
      .setHeight(data.height)
      .setSetName(data.setName)
      .setAnimated(data.animated)
      .setEmoji(data.emoji)
      .setMaskPosition(data.maskPosition)
      .setThumb(data.thumb)
      .setFileSize(data.fileSize)
  }

  get isAnimated() {
    return !!this.animated
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setFileId(id) {
    this.fileId = id
    return this
  }

  setFileUid(uid) {
    this.fileUid = uid
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

  setSetName(name) {
    this.setName = name
    return this
  }

  setAnimated(boolean) {
    this.animated = boolean
    return this
  }

  setEmoji(emoji) {
    this.emoji = emoji
    return this
  }

  setMaskPosition(maskPosition) {
    this.maskPosition = maskPosition ? (
      maskPosition instanceof MaskPosition ? maskPosition : new MaskPosition(maskPosition.point, maskPosition.xShift, maskPosition.yShift, maskPosition.scale)
    ) : undefined
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      thumb instanceof PhotoSize ? thumb : new PhotoSize(thumb, this.context)
    ) : undefined
    return this
  }

  setFileSize(size) {
    this.fileSize = size
    return this
  }

  getFile() {
    return this.context.telegramBot.getFile(this.fileId)
  }

  getSet() {
    return this.context.telegramBot.getStickerSet(this.setName)
  }

  setPositionInSet(position) {
    return this.context.telegramBot.setStickerPositionInSet(this.fileId, position)
  }

  deleteFromSet() {
    return this.context.telegramBot.deleteStickerFromSet(this.fileId)
  }

  toJSON() {
    const data = {}
    if (this.fileId) {
      data.fileId = this.fileId
    }
    if (this.fileUid) {
      data.fileUid = this.fileUid
    }
    if (this.width) {
      data.width = this.width
    }
    if (this.height) {
      data.height = this.height
    }
    if (this.setName) {
      data.setName = this.setName
    }
    if (Helper.exists(this.animated)) {
      data.animated = this.animated
    }
    if (this.emoji) {
      data.emoji = this.emoji
    }
    if (this.maskPosition) {
      data.maskPosition = this.maskPosition.toJSON()
    }
    if (this.thumb) {
      data.thumb = this.thumb.toJSON()
    }
    if (this.fileSize) {
      data.fileSize = this.fileSize
    }
    return data
  }
}
Sticker.from = (data, context) => new Sticker(data, context)
Sticker.fromParams = (params = {}, context) => {
  const data = {
    fileId: params.file_id,
    fileUid: params.file_unique_id,
    width: params.width,
    height: params.height,
    setName: params.set_name,
    animated: params.is_animated,
    emoji: params.emoji,
    maskPosition: params.mask_position,
    thumb: params.thumb,
    fileSize: params.file_size
  }
  if (data.maskPosition) {
    data.maskPosition = MaskPosition.fromParams(data.maskPosition)
  }
  if (data.thumb) {
    data.thumb = PhotoSize.fromParams(data.thumb, context)
  }
  return new Sticker(data, context)
}

module.exports = Sticker
