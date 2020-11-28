const NotFoundError = require('./NotFoundError')

class StickerSetNotFoundError extends NotFoundError {
  constructor(name) {
    super(`Sticker set not found: '${name}'.`, StickerSetNotFoundError.code)
    this.setName(StickerSetNotFoundError.name)
  }
}
StickerSetNotFoundError.name = 'StickerSetNotFoundError'
StickerSetNotFoundError.code = 'sticker-set-not-found'

module.exports = StickerSetNotFoundError
