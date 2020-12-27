class MessageId {
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
MessageId.from = (data, context) => new MessageId(data, context)
MessageId.fromParams = (params = {}, context) => new MessageId({
  id: params.message_id
}, context)

module.exports = MessageId
