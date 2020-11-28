import Helper from '@darkwolf/helper.mjs'

export default class ForceReply {
  static forceReply = true

  static from(options) {
    return new ForceReply(options)
  }

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
