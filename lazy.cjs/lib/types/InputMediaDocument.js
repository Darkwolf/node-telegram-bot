const types = require('./')
const constants = require('../constants')

class InputMediaDocument extends types.InputMedia {
  constructor(media, options) {
    super(InputMediaDocument.type, media, options)
  }
}
InputMediaDocument.type = constants.MediaType.DOCUMENT
InputMediaDocument.from = (media, options) => new InputMediaDocument(media, options)

module.exports = InputMediaDocument
