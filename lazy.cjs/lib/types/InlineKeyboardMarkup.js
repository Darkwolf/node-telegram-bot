const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class InlineKeyboardMarkup {
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
    this.inlineKeyboard = keyboard instanceof types.InlineKeyboard ? keyboard : new types.InlineKeyboard(keyboard, this.context)
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
InlineKeyboardMarkup.from = (keyboard, context) => new InlineKeyboardMarkup(keyboard, context)
InlineKeyboardMarkup.fromParams = (params = {}, context) => {
  const data = {
    inlineKeyboard: params.inline_keyboard
  }
  if (data.inlineKeyboard) {
    data.inlineKeyboard = types.InlineKeyboard.fromParams(data.inlineKeyboard, context)
  }
  return new InlineKeyboardMarkup(data.inlineKeyboard, context)
}

module.exports = InlineKeyboardMarkup
