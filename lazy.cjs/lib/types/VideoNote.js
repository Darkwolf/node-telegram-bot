const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class VideoNote {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setLength(data.length)
      .setDuration(data.duration)
      .setThumb(data.thumb)
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

  setLength(length) {
    this.length = length
    return this
  }

  setDuration(duration) {
    this.duration = duration
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      thumb instanceof types.PhotoSize ? thumb : new types.PhotoSize(thumb, this.context)
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

  toJSON() {
    const data = {}
    if (this.fileId) {
      data.fileId = this.fileId
    }
    if (this.fileUid) {
      data.fileUid = this.fileUid
    }
    if (this.length) {
      data.length = this.length
    }
    if (Helper.exists(this.duration)) {
      data.duration = this.duration
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
VideoNote.from = (data, context) => new VideoNote(data, context)
VideoNote.fromParams = (params = {}, context) => {
  const data = {
    fileId: params.file_id,
    fileUid: params.file_unique_id,
    length: params.length,
    duration: params.duration,
    thumb: params.thumb,
    fileSize: params.file_size
  }
  if (data.thumb) {
    data.thumb = types.PhotoSize.fromParams(data.thumb, context)
  }
  return new VideoNote(data, context)
}

module.exports = VideoNote
