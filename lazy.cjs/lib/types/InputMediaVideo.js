const types = require('./')
const constants = require('../constants')

class InputMediaVideo extends types.InputMedia {
  constructor(media, options) {
    super(InputMediaVideo.type, media, options)
  }
}
InputMediaVideo.type = constants.MediaType.VIDEO
InputMediaVideo.from = (media, options) => new InputMediaVideo(media, options)

module.exports = InputMediaVideo
