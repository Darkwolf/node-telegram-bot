import fs from 'fs'
import Helper from '@darkwolf/helper.mjs'

export default class InputFile {
  static from(file) {
    return new InputFile(file)
  }

  constructor(file) {
    this.setFile(file)
  }

  setFile(file) {
    this.file = Helper.isString(file) ? fs.createReadStream(file) : file
    return this
  }
}
