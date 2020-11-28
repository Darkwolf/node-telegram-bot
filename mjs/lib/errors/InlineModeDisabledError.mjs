import ForbiddenError from './ForbiddenError.mjs'

export default class InlineModeDisabledError extends ForbiddenError {
  static name = 'InlineModeDisabledError'
  static code = 'inline-mode-disabled'

  constructor(token) {
    super(`Inline mode disabled: '${token}'.`, InlineModeDisabledError.code)
    this.setName(InlineModeDisabledError.name)
  }
}
