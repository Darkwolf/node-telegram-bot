const errors = require('./')

class InlineModeDisabledError extends errors.ForbiddenError {
  constructor(token) {
    super(`Inline mode disabled: '${token}'.`, InlineModeDisabledError.code)
    this.setName(InlineModeDisabledError.name)
  }
}
InlineModeDisabledError.name = 'InlineModeDisabledError'
InlineModeDisabledError.code = 'inline-mode-disabled'

module.exports = InlineModeDisabledError
