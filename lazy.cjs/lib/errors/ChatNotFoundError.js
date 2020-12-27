const errors = require('./')

class ChatNotFoundError extends errors.NotFoundError {
  constructor(id) {
    super(`Chat not found: '${id}'.`, ChatNotFoundError.code)
    this.setName(ChatNotFoundError.name)
  }
}
ChatNotFoundError.name = 'ChatNotFoundError'
ChatNotFoundError.code = 'chat-not-found'

module.exports = ChatNotFoundError
