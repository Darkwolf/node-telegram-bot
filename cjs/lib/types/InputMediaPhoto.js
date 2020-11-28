const { MediaType } = require('../constants')
const InputMedia = require('./InputMedia')

class InputMediaPhoto extends InputMedia {
  constructor(media, options) {
    super(InputMediaPhoto.type, media, options)
  }
}
InputMediaPhoto.type = MediaType.PHOTO
InputMediaPhoto.from = (media, options) => new InputMediaPhoto(media, options)

module.exports = InputMediaPhoto
