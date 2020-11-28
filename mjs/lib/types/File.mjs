import Time from '@darkwolf/time.mjs'

export default class File {
  static from(data, context) {
    return new File(data, context)
  }

  static fromParams(params = {}, context) {
    return new File({
      id: params.file_id,
      uid: params.file_unique_id,
      path: params.file_path,
      size: params.file_size
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setUid(data.uid)
      .setPath(data.path)
      .setSize(data.size)
      .setPrepareDate(data.prepareDate)
      .setDownloadLink(data.downloadLink)
  }

  get isLinkValid() {
    return this.prepareDate && Time.unixTimestamp().subtract(this.prepareDate) < Time.sec('1 hour')
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setUid(uid) {
    this.uid = uid
    return this
  }

  setPath(path) {
    this.path = path
    return this
  }

  setSize(size) {
    this.size = size
    return this
  }

  setPrepareDate(date) {
    this.prepareDate = date || this.path ? Time.unix() : undefined
    return this
  }

  setDownloadLink(link) {
    this.downloadLink = link || this.path ? this.context.telegramBot.getFileDownloadLinkByPath(this.path) : undefined
    return this
  }

  get() {
    return this.context.telegramBot.getFile(this.id)
  }

  download() {
    return this.context.telegramBot.downloadFileByPath(this.path)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.uid) {
      data.uid = this.uid
    }
    if (this.path) {
      data.path = this.path
    }
    if (this.size) {
      data.size = this.size
    }
    if (this.prepareDate) {
      data.prepareDate = this.prepareDate
    }
    if (this.downloadLink) {
      data.downloadLink = this.downloadLink
    }
    return data
  }
}
