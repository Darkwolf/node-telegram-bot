import Helper from '@darkwolf/helper.mjs'

export default class Voice {
  static from(data, context) {
    return new Voice(data, context)
  }

  static fromParams(params = {}, context) {
    return new Voice({
      fileId: params.file_id,
      fileUid: params.file_unique_id,
      duration: params.duration,
      mimeType: params.mime_type,
      fileSize: params.file_size
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setDuration(data.duration)
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

  setDuration(duration) {
    this.duration = duration
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
    if (Helper.exists(this.duration)) {
      data.duration = this.duration
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
