import NotFoundError from './NotFoundError.mjs'

export default class ReplyMessageNotFoundError extends NotFoundError {
  static name = 'ReplyMessageNotFoundError'
  static code = 'reply-message-not-found'

  constructor(id) {
    super(`Reply message not found: '${id}'.`, ReplyMessageNotFoundError.code)
    this.setName(ReplyMessageNotFoundError.name)
  }
}
