const NotFoundError = require('./NotFoundError')

class ChatNotFoundError extends NotFoundError {
  constructor(id) {
    super(`Chat not found: '${id}'.`, ChatNotFoundError.code)
    this.setName(ChatNotFoundError.name)
  }
}
ChatNotFoundError.name = 'ChatNotFoundError'
ChatNotFoundError.code = 'chat-not-found'

module.exports = ChatNotFoundError
