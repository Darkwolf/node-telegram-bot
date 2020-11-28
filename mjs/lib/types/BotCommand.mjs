import Helper from '@darkwolf/helper.mjs'

export default class BotCommand {
  static from(command, description) {
    return new BotCommand(command, description)
  }

  static fromParams(params = {}) {
    return new BotCommand(params.command, params.description)
  }

  constructor(command, description) {
    this
      .setCommand(command)
      .setDescription(description)
  }

  setCommand(command) {
    this.command = command
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  toParams() {
    const params = {}
    if (this.command) {
      params.command = this.command
    }
    if (Helper.exists(this.description)) {
      params.description = this.description
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.command) {
      data.command = this.command
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    return data
  }
}
