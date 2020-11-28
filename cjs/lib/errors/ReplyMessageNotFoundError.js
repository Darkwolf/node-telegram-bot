const NotFoundError = require('./NotFoundError')

class ReplyMessageNotFoundError extends NotFoundError {
  constructor(id) {
    super(`Reply message not found: '${id}'.`, ReplyMessageNotFoundError.code)
    this.setName(ReplyMessageNotFoundError.name)
  }
}
ReplyMessageNotFoundError.name = 'ReplyMessageNotFoundError'
ReplyMessageNotFoundError.code = 'reply-message-not-found'

module.exports = ReplyMessageNotFoundError
