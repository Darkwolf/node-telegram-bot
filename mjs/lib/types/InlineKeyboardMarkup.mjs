import Helper from '@darkwolf/helper.mjs'
import InlineKeyboard from './InlineKeyboard.mjs'

export default class InlineKeyboardMarkup {
  static from(keyboard, context) {
    return new InlineKeyboardMarkup(keyboard, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      inlineKeyboard: params.inline_keyboard
    }
    if (data.inlineKeyboard) {
      data.inlineKeyboard = InlineKeyboard.fromParams(data.inlineKeyboard, context)
    }
    return new InlineKeyboardMarkup(data.inlineKeyboard, context)
  }

  constructor(keyboard, context) {
    this
      .setContext(context)
      .setKeyboard(keyboard)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setKeyboard(keyboard) {
    this.inlineKeyboard = keyboard instanceof InlineKeyboard ? keyboard : new InlineKeyboard(keyboard, this.context)
    return this
  }

  addRow(...rows) {
    this.inlineKeyboard.addRow(...rows)
    return this
  }

  addButton(...buttons) {
    this.inlineKeyboard.addButton(...buttons)
    return this
  }

  clearKeyboard() {
    this.inlineKeyboard.clear()
    return this
  }

  toParams() {
    const params = {}
    if (this.inlineKeyboard) {
      params.inline_keyboard = this.inlineKeyboard.toParams()
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.inlineKeyboard) {
      data.inlineKeyboard = this.inlineKeyboard.toJSON()
    }
    return data
  }
}
