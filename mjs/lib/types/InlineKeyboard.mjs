import InlineKeyboardButton from './InlineKeyboardButton.mjs'

export default class InlineKeyboard {
  static normalize(keyboard) {
    const rows = []
    keyboard.forEach(row => {
      if (Array.isArray(row) && row.length) {
        const buttons = row.filter(button => button)
        if (buttons.length) {
          rows.push(buttons)
        }
      }
    })
    return rows
  }

  static from(rows, context) {
    return new InlineKeyboard(rows, context)
  }

  static fromParams(params = [], context) {
    return new InlineKeyboard(params.map(row =>
      row.map(button => InlineKeyboardButton.fromParams(button, context))
    ), context)
  }

  constructor(rows, context) {
    this
      .setContext(context)
      .setRows(rows)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setRows(rows) {
    this.rows = rows ? InlineKeyboard.normalize(rows).map(row => row.map(button =>
      button instanceof InlineKeyboardButton ? button : new InlineKeyboardButton(button.text, button, this.context)
    )) : []
    return this
  }

  addRow(...rows) {
    this.rows = [
      ...this.rows,
      ...InlineKeyboard.normalize(rows).map(row => row.map(button =>
        button instanceof InlineKeyboardButton ? button : new InlineKeyboardButton(button.text, button, this.context)
      ))
    ]
    return this
  }

  addButton(...buttons) {
    return this.addRow(buttons)
  }

  clear() {
    this.rows = []
    return this
  }

  toParams() {
    return this.rows ? this.rows.map(row => row.map(button => button.toParams())) : []
  }

  toJSON() {
    return this.rows ? this.rows.map(row => row.map(button => button.toJSON())) : []
  }
}
