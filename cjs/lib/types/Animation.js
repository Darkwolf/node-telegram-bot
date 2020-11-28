const Helper = require('@darkwolf/helper.cjs')
const PhotoSize = require('./PhotoSize')

class Animation {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setFileName(data.fileName)
      .setWidth(data.width)
      .setHeight(data.height)
      .setDuration(data.duration)
      .setThumb(data.thumb)
      .setMimeType(data.mimeType)
      .setFileSize(data.fileSize)
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

  setFileName(name) {
    this.fileName = name
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

  setThumb(thumb) {
    this.thumb = thumb ? (
      thumb instanceof PhotoSize ? thumb : new PhotoSize(thumb, this.context)
    ) : undefined
    return this
  }

  setMimeType(type) {
    this.mimeType = type
    return this
  }

  setFileSize(size) {
    this.fileSize = size
    return this
  }

  getFile() {
    return this.context.telegramBot.getFile(this.fileId)
  }

  toJSON() {
    const data = {}
    if (this.fileId) {
      data.fileId = this.fileId
    }
    if (this.fileUid) {
      data.fileUid = this.fileUid
    }
    if (Helper.exists(this.fileName)) {
      data.fileName = this.fileName
    }
    if (this.width) {
      data.width = this.width
    }
    if (this.height) {
      data.height = this.height
    }
    if (Helper.exists(this.duration)) {
      data.duration = this.duration
    }
    if (this.thumb) {
      data.thumb = this.thumb.toJSON()
    }
    if (this.mimeType) {
      data.mimeType = this.mimeType
    }
    if (this.fileSize) {
      data.fileSize = this.fileSize
    }
    return data
  }
}
Animation.from = (data, context) => new Animation(data, context)
Animation.fromParams = (params = {}, context) => {
  const data = {
    fileId: params.file_id,
    fileUid: params.file_unique_id,
    fileName: params.file_name,
    width: params.width,
    height: params.height,
    duration: params.duration,
    thumb: params.thumb,
    mimeType: params.mime_type,
    fileSize: params.file_size
  }
  if (data.thumb) {
    data.thumb = PhotoSize.fromParams(data.thumb, context)
  }
  return new Animation(data, context)
}

module.exports = Animation
