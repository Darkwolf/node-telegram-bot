const { MediaType } = require('../constants')
const InputMedia = require('./InputMedia')

class InputMediaVideo extends InputMedia {
  constructor(media, options) {
    super(InputMediaVideo.type, media, options)
  }
}
InputMediaVideo.type = MediaType.VIDEO
InputMediaVideo.from = (media, options) => new InputMediaVideo(media, options)

module.exports = InputMediaVideo
