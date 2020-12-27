class PassportFile {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setUid(data.uid)
      .setSize(data.size)
      .setDate(data.date)
  }

  setId(id) {
    this.id = id
    return this
  }

  setUid(uid) {
    this.uid = uid
    return this
  }

  setSize(size) {
    this.size = size
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  getFile() {
    return this.context.telegramBot.getFile(this.fileId)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.uid) {
      data.uid = this.uid
    }
    if (this.size) {
      data.size = this.size
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
PassportFile.from = (data, context) => new PassportFile(data, context)
PassportFile.fromParams = (params = {}, context) => new PassportFile({
  id: params.file_id,
  uid: params.file_unique_id,
  size: params.file_size,
  date: params.file_date
}, context)

module.exports = PassportFile
