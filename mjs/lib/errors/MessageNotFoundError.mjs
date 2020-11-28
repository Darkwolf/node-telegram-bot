import NotFoundError from './NotFoundError.mjs'

export default class MessageNotFoundError extends NotFoundError {
  static name = 'MessageNotFoundError'
  static code = 'message-not-found'

  constructor(id) {
    super(`Message not found: '${id}'.`, MessageNotFoundError.code)
    this.setName(MessageNotFoundError.name)
  }
}
