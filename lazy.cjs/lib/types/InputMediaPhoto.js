const types = require('./')
const constants = require('../constants')

class InputMediaPhoto extends types.InputMedia {
  constructor(media, options) {
    super(InputMediaPhoto.type, media, options)
  }
}
InputMediaPhoto.type = constants.MediaType.PHOTO
InputMediaPhoto.from = (media, options) => new InputMediaPhoto(media, options)

module.exports = InputMediaPhoto
