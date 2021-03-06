import Helper from '@darkwolf/helper.mjs'
import PhotoSize from './PhotoSize.mjs'

export default class Document {
  static from(data, context) {
    return new Document(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      fileId: params.file_id,
      fileUid: params.file_unique_id,
      fileName: params.file_name,
      thumb: params.thumb,
      mimeType: params.mime_type,
      fileSize: params.file_size
    }
    if (data.thumb) {
      data.thumb = PhotoSize.fromParams(data.thumb, context)
    }
    return new Document(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setFileName(data.fileName)
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
