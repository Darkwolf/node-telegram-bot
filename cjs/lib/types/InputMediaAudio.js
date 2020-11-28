const { MediaType } = require('../constants')
const InputMedia = require('./InputMedia')

class InputMediaAudio extends InputMedia {
  constructor(media, options) {
    super(InputMediaAudio.type, media, options)
  }
}
InputMediaAudio.type = MediaType.AUDIO
InputMediaAudio.from = (media, options) => new InputMediaAudio(media, options)

module.exports = InputMediaAudio
