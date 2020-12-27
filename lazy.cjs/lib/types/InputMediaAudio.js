const types = require('./')
const constants = require('../constants')

class InputMediaAudio extends types.InputMedia {
  constructor(media, options) {
    super(InputMediaAudio.type, media, options)
  }
}
InputMediaAudio.type = constants.MediaType.AUDIO
InputMediaAudio.from = (media, options) => new InputMediaAudio(media, options)

module.exports = InputMediaAudio
