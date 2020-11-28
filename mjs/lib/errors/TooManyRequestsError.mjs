import Error from './Error.mjs'

export default class TooManyRequestsError extends Error {
  static name = 'TooManyRequestsError'
  static code = 'too-many-requests'

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
