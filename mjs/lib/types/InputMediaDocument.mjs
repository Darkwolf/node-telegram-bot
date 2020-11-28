import { MediaType } from '../constants/index.mjs'
import InputMedia from './InputMedia.mjs'

export default class InputMediaDocument extends InputMedia {
  static type = MediaType.DOCUMENT

  static from(media, options) {
    return new InputMediaDocument(media, options)
  }

  constructor(media, options) {
    super(InputMediaDocument.type, media, options)
  }
}
