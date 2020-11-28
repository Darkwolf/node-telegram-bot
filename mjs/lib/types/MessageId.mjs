export default class MessageId {
  static from(data, context) {
    return new MessageId(data, context)
  }

  static fromParams(params = {}, context) {
    return new MessageId({
      id: params.message_id
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    return data
  }
}
