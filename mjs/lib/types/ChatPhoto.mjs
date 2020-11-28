export default class ChatPhoto {
  static from(data, context) {
    return new ChatPhoto(data, context)
  }

  static fromParams(params = {}, context) {
    return new ChatPhoto({
      smallFileId: params.small_file_id,
      smallFileUid: params.small_file_unique_id,
      bigFileId: params.big_file_id,
      bigFileUid: params.big_file_unique_id
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setSmallFileId(data.smallFileId)
      .setSmallFileUid(data.smallFileUid)
      .setBigFileId(data.bigFileId)
      .setBigFileUid(data.bigFileUid)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setSmallFileId(id) {
    this.smallFileId = id
    return this
  }

  setSmallFileUid(uid) {
    this.smallFileUid = uid
    return this
  }

  setBigFileId(id) {
    this.bigFileId = id
    return this
  }

  setBigFileUid(uid) {
    this.bigFileUid = uid
    return this
  }

  getSmallFile() {
    return this.context.telegramBot.getFile(this.smallFileId)
  }

  getBigFile() {
    return this.context.telegramBot.getFile(this.bigFileId)
  }

  set(photo) {
    return this.context.telegramBot.setChatPhoto(this.context.chatId, photo)
  }

  delete() {
    return this.context.telegramBot.deleteChatPhoto(this.context.chatId)
  }

  toJSON() {
    const data = {}
    if (this.smallFileId) {
      data.smallFileId = this.smallFileId
    }
    if (this.smallFileUid) {
      data.smallFileUid = this.smallFileUid
    }
    if (this.bigFileId) {
      data.bigFileId = this.bigFileId
    }
    if (this.bigFileUid) {
      data.bigFileUid = this.bigFileUid
    }
    return data
  }
}
