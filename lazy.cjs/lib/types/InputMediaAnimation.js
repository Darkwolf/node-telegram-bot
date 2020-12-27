const types = require('./')
const constants = require('../constants')

class InputMediaAnimation extends types.InputMedia {
  constructor(media, options) {
    super(InputMediaAnimation.type, media, options)
  }
}
InputMediaAnimation.type = constants.MediaType.ANIMATION
InputMediaAnimation.from = (media, options) => new InputMediaAnimation(media, options)

module.exports = InputMediaAnimation
