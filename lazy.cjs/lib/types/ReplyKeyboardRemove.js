const Helper = require('@darkwolf/helper.cjs')

class ReplyKeyboardRemove {
  constructor(options = {}) {
    this.removeKeyboard = ReplyKeyboardRemove.removeKeyboard
    this.setSelective(options.selective)
  }

  setSelective(boolean) {
    this.selective = boolean
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.removeKeyboard)) {
      params.remove_keyboard = this.removeKeyboard
    }
    if (Helper.exists(this.selective)) {
      params.selective = this.selective
    }
    return params
  }
}
ReplyKeyboardRemove.removeKeyboard = true
ReplyKeyboardRemove.from = options => new ReplyKeyboardRemove(options)

module.exports = ReplyKeyboardRemove
