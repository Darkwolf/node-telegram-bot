import { MediaType } from '../constants/index.mjs'
import InputMedia from './InputMedia.mjs'

export default class InputMediaPhoto extends InputMedia {
  static type = MediaType.PHOTO

  static from(media, options) {
    return new InputMediaPhoto(media, options)
  }

  constructor(media, options) {
    super(InputMediaPhoto.type, media, options)
  }
}
