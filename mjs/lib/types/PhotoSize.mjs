export default class PhotoSize {
  static from(data, context) {
    return new PhotoSize(data, context)
  }

  static fromParams(params = {}, context) {
    return new PhotoSize({
      fileId: params.file_id,
      fileUid: params.file_unique_id,
      width: params.width,
      height: params.height,
      fileSize: params.file_size
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setWidth(data.width)
      .setHeight(data.height)
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

  setWidth(width) {
    this.width = width
    return this
  }

  setHeight(height) {
    this.height = height
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
    if (this.width) {
      data.width = this.width
    }
    if (this.height) {
      data.height = this.height
    }
    if (this.fileSize) {
      data.fileSize = this.fileSize
    }
    return data
  }
}
