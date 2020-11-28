import NotFoundError from './NotFoundError.mjs'

export default class StickerSetNotFoundError extends NotFoundError {
  static name = 'StickerSetNotFoundError'
  static code = 'sticker-set-not-found'

  constructor(name) {
    super(`Sticker set not found: '${name}'.`, StickerSetNotFoundError.code)
    this.setName(StickerSetNotFoundError.name)
  }
}
