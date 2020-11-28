import { MediaType } from '../constants/index.mjs'
import InputMedia from './InputMedia.mjs'

export default class InputMediaVideo extends InputMedia {
  static type = MediaType.VIDEO

  static from(media, options) {
    return new InputMediaVideo(media, options)
  }

  constructor(media, options) {
    super(InputMediaVideo.type, media, options)
  }
}
