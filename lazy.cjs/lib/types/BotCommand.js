const Helper = require('@darkwolf/helper.cjs')

class BotCommand {
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
BotCommand.from = (command, description) => new BotCommand(command, description)
BotCommand.fromParams = (params = {}) => new BotCommand(params.command, params.description)

module.exports = BotCommand
