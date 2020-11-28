const { MediaType } = require('../constants')
const InputMedia = require('./InputMedia')

class InputMediaDocument extends InputMedia {
  constructor(media, options) {
    super(InputMediaDocument.type, media, options)
  }
}
InputMediaDocument.type = MediaType.DOCUMENT
InputMediaDocument.from = (media, options) => new InputMediaDocument(media, options)

module.exports = InputMediaDocument
