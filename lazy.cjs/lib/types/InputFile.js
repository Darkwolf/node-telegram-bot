const fs = require('fs')
const Helper = require('@darkwolf/helper.cjs')

class InputFile {
  constructor(file) {
    this.setFile(file)
  }

  setFile(file) {
    this.file = Helper.isString(file) ? fs.createReadStream(file) : file
    return this
  }
}
InputFile.from = file => new InputFile(file)

module.exports = InputFile
