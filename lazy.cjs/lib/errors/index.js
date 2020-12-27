class Errors {}
Object.defineProperty(Errors, 'Error', {
  get: () => {
    if (!Errors._Error) {
      Errors._Error = require('./Error')
    }
    return Errors._Error
  }
})
Object.defineProperty(Errors, 'UnauthorizedError', {
  get: () => {
    if (!Errors._UnauthorizedError) {
      Errors._UnauthorizedError = require('./UnauthorizedError')
    }
    return Errors._UnauthorizedError
  }
})
Object.defineProperty(Errors, 'BadRequestError', {
  get: () => {
    if (!Errors._BadRequestError) {
      Errors._BadRequestError = require('./BadRequestError')
    }
    return Errors._BadRequestError
  }
})
Object.defineProperty(Errors, 'ForbiddenError', {
  get: () => {
    if (!Errors._ForbiddenError) {
      Errors._ForbiddenError = require('./ForbiddenError')
    }
    return Errors._ForbiddenError
  }
})
Object.defineProperty(Errors, 'NotFoundError', {
  get: () => {
    if (!Errors._NotFoundError) {
      Errors._NotFoundError = require('./NotFoundError')
    }
    return Errors._NotFoundError
  }
})
Object.defineProperty(Errors, 'TooManyRequestsError', {
  get: () => {
    if (!Errors._TooManyRequestsError) {
      Errors._TooManyRequestsError = require('./TooManyRequestsError')
    }
    return Errors._TooManyRequestsError
  }
})
Object.defineProperty(Errors, 'InvalidBotTokenError', {
  get: () => {
    if (!Errors._InvalidBotTokenError) {
      Errors._InvalidBotTokenError = require('./InvalidBotTokenError')
    }
    return Errors._InvalidBotTokenError
  }
})
Object.defineProperty(Errors, 'BotBlockedByUserError', {
  get: () => {
    if (!Errors._BotBlockedByUserError) {
      Errors._BotBlockedByUserError = require('./BotBlockedByUserError')
    }
    return Errors._BotBlockedByUserError
  }
})
Object.defineProperty(Errors, 'ChatMigratedError', {
  get: () => {
    if (!Errors._ChatMigratedError) {
      Errors._ChatMigratedError = require('./ChatMigratedError')
    }
    return Errors._ChatMigratedError
  }
})
Object.defineProperty(Errors, 'InlineModeDisabledError', {
  get: () => {
    if (!Errors._InlineModeDisabledError) {
      Errors._InlineModeDisabledError = require('./InlineModeDisabledError')
    }
    return Errors._InlineModeDisabledError
  }
})
Object.defineProperty(Errors, 'UserNotFoundError', {
  get: () => {
    if (!Errors._UserNotFoundError) {
      Errors._UserNotFoundError = require('./UserNotFoundError')
    }
    return Errors._UserNotFoundError
  }
})
Object.defineProperty(Errors, 'ChatNotFoundError', {
  get: () => {
    if (!Errors._ChatNotFoundError) {
      Errors._ChatNotFoundError = require('./ChatNotFoundError')
    }
    return Errors._ChatNotFoundError
  }
})
Object.defineProperty(Errors, 'MessageNotFoundError', {
  get: () => {
    if (!Errors._MessageNotFoundError) {
      Errors._MessageNotFoundError = require('./MessageNotFoundError')
    }
    return Errors._MessageNotFoundError
  }
})
Object.defineProperty(Errors, 'ReplyMessageNotFoundError', {
  get: () => {
    if (!Errors._ReplyMessageNotFoundError) {
      Errors._ReplyMessageNotFoundError = require('./ReplyMessageNotFoundError')
    }
    return Errors._ReplyMessageNotFoundError
  }
})
Object.defineProperty(Errors, 'FileNotFoundError', {
  get: () => {
    if (!Errors._FileNotFoundError) {
      Errors._FileNotFoundError = require('./FileNotFoundError')
    }
    return Errors._FileNotFoundError
  }
})
Object.defineProperty(Errors, 'StickerSetNotFoundError', {
  get: () => {
    if (!Errors._StickerSetNotFoundError) {
      Errors._StickerSetNotFoundError = require('./StickerSetNotFoundError')
    }
    return Errors._StickerSetNotFoundError
  }
})
Object.defineProperty(Errors, 'InvalidCallbackQueryError', {
  get: () => {
    if (!Errors._InvalidCallbackQueryError) {
      Errors._InvalidCallbackQueryError = require('./InvalidCallbackQueryError')
    }
    return Errors._InvalidCallbackQueryError
  }
})
Object.defineProperty(Errors, 'InvalidInlineQueryError', {
  get: () => {
    if (!Errors._InvalidInlineQueryError) {
      Errors._InvalidInlineQueryError = require('./InvalidInlineQueryError')
    }
    return Errors._InvalidInlineQueryError
  }
})
Object.defineProperty(Errors, 'InvalidShippingQueryError', {
  get: () => {
    if (!Errors._InvalidShippingQueryError) {
      Errors._InvalidShippingQueryError = require('./InvalidShippingQueryError')
    }
    return Errors._InvalidShippingQueryError
  }
})
Object.defineProperty(Errors, 'InvalidPreCheckoutQueryError', {
  get: () => {
    if (!Errors._InvalidPreCheckoutQueryError) {
      Errors._InvalidPreCheckoutQueryError = require('./InvalidPreCheckoutQueryError')
    }
    return Errors._InvalidPreCheckoutQueryError
  }
})
Object.defineProperty(Errors, 'UnknownError', {
  get: () => {
    if (!Errors._UnknownError) {
      Errors._UnknownError = require('./UnknownError')
    }
    return Errors._UnknownError
  }
})

module.exports = Errors
