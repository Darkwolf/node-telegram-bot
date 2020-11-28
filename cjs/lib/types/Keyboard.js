const KeyboardButton = require('./KeyboardButton')

class Keyboard {
  constructor(rows) {
    this.setRows(rows)
  }

  setRows(rows) {
    this.rows = rows ? Keyboard.normalize(rows).map(row => row.map(button =>
      button instanceof KeyboardButton ? button : new KeyboardButton(button.text, button)
    )) : []
    return this
  }

  addRow(...rows) {
    this.rows = [
      ...this.rows,
      ...Keyboard.normalize(rows).map(row => row.map(button =>
        button instanceof KeyboardButton ? button : new KeyboardButton(button.text, button)
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
}
Keyboard.normalize = keyboard => {
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
Keyboard.from = rows => new Keyboard(rows)

module.exports = Keyboard
