import Helper from '@darkwolf/helper.mjs'
import Keyboard from './Keyboard.mjs'

export default class ReplyKeyboardMarkup {
  static from(keyboard, options) {
    return new ReplyKeyboardMarkup(keyboard, options)
  }

  constructor(keyboard, options = {}) {
    this
      .setKeyboard(keyboard)
      .setResizeKeyboard(options.resizeKeyboard)
      .setOneTimeKeyboard(options.oneTimeKeyboard)
      .setSelective(options.selective)
  }

  setKeyboard(keyboard) {
    this.keyboard = keyboard instanceof Keyboard ? keyboard : new Keyboard(keyboard)
    return this
  }

  addRow(...rows) {
    this.keyboard.addRow(...rows)
    return this
  }

  addButton(...buttons) {
    this.keyboard.addButton(...buttons)
    return this
  }

  clearKeyboard() {
    this.keyboard.clear()
    return this
  }

  setResizeKeyboard(boolean) {
    this.resizeKeyboard = boolean
    return this
  }

  setOneTimeKeyboard(boolean) {
    this.oneTimeKeyboard = boolean
    return this
  }

  setSelective(boolean) {
    this.selective = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.keyboard) {
      params.keyboard = this.keyboard.toParams()
    }
    if (Helper.exists(this.resizeKeyboard)) {
      params.resize_keyboard = this.resizeKeyboard
    }
    if (Helper.exists(this.oneTimeKeyboard)) {
      params.one_time_keyboard = this.oneTimeKeyboard
    }
    if (Helper.exists(this.selective)) {
      params.selective = this.selective
    }
    return params
  }
}
