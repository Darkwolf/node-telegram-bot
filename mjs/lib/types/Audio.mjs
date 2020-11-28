import Helper from '@darkwolf/helper.mjs'
import PhotoSize from './PhotoSize.mjs'

export default class Audio {
  static from(data, context) {
    return new Audio(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      fileId: params.file_id,
      fileUid: params.file_unique_id,
      fileName: params.file_name,
      duration: params.duration,
      performer: params.performer,
      title: params.title,
      thumb: params.thumb,
      mimeType: params.mime_type,
      fileSize: params.file_size
    }
    if (data.thumb) {
      data.thumb = PhotoSize.fromParams(data.thumb, context)
    }
    return new Audio(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setFileId(data.fileId)
      .setFileUid(data.fileUid)
      .setFileName(data.fileName)
      .setDuration(data.duration)
      .setPerformer(data.performer)
      .setTitle(data.title)
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

  setDuration(duration) {
    this.duration = duration
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
    if (Helper.exists(this.duration)) {
      data.duration = this.duration
    }
    if (Helper.exists(this.performer)) {
      data.performer = this.performer
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
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
