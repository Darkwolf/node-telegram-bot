import { MediaType } from '../constants/index.mjs'
import InputMedia from './InputMedia.mjs'

export default class InputMediaAudio extends InputMedia {
  static type = MediaType.AUDIO

  static from(media, options) {
    return new InputMediaAudio(media, options)
  }

  constructor(media, options) {
    super(InputMediaAudio.type, media, options)
  }
}
