const { MediaType } = require('../constants')
const InputMedia = require('./InputMedia')

class InputMediaAnimation extends InputMedia {
  constructor(media, options) {
    super(InputMediaAnimation.type, media, options)
  }
}
InputMediaAnimation.type = MediaType.ANIMATION
InputMediaAnimation.from = (media, options) => new InputMediaAnimation(media, options)

module.exports = InputMediaAnimation
