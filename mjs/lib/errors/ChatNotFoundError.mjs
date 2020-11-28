import NotFoundError from './NotFoundError.mjs'

export default class ChatNotFoundError extends NotFoundError {
  static name = 'ChatNotFoundError'
  static code = 'chat-not-found'

  constructor(id) {
    super(`Chat not found: '${id}'.`, ChatNotFoundError.code)
    this.setName(ChatNotFoundError.name)
  }
}
