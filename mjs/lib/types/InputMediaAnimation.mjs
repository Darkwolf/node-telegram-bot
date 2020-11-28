import { MediaType } from '../constants/index.mjs'
import InputMedia from './InputMedia.mjs'

export default class InputMediaAnimation extends InputMedia {
  static type = MediaType.ANIMATION

  static from(media, options) {
    return new InputMediaAnimation(media, options)
  }

  constructor(media, options) {
    super(InputMediaAnimation.type, media, options)
  }
}
