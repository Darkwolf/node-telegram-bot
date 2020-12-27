const errors = require('./')

class TooManyRequestsError extends errors.Error {
  constructor(duration) {
    super(`Too many requests. Retry after: '${duration}'.`, TooManyRequestsError.code)
    this
      .setName(TooManyRequestsError.name)
      .setRetryAfter(duration)
  }

  setRetryAfter(duration) {
    this.retryAfter = duration
    return this
  }
}
TooManyRequestsError.name = 'TooManyRequestsError'
TooManyRequestsError.code = 'too-many-requests'

module.exports = TooManyRequestsError
