import Helper from '@darkwolf/helper.mjs'

export default class ReplyKeyboardRemove {
  static removeKeyboard = true

  static from(options) {
    return new ReplyKeyboardRemove(options)
  }

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
