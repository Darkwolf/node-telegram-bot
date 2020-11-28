const Helper = require('@darkwolf/helper.cjs')

class ForceReply {
  constructor(options = {}) {
    this.forceReply = ForceReply.forceReply
    this.setSelective(options.selective)
  }

  setSelective(boolean) {
    this.selective = boolean
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.forceReply)) {
      params.force_reply = this.forceReply
    }
    if (Helper.exists(this.selective)) {
      params.selective = this.selective
    }
    return params
  }
}
ForceReply.forceReply = true
ForceReply.from = options => new ForceReply(options)

module.exports = ForceReply
