const errors = require('./')

class MessageNotFoundError extends errors.NotFoundError {
  constructor(id) {
    super(`Message not found: '${id}'.`, MessageNotFoundError.code)
    this.setName(MessageNotFoundError.name)
  }
}
MessageNotFoundError.name = 'MessageNotFoundError'
MessageNotFoundError.code = 'message-not-found'

module.exports = MessageNotFoundError
