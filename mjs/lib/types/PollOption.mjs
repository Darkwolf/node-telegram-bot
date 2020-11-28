import Helper from '@darkwolf/helper.mjs'

export default class PollOption {
  static from(data) {
    return new PollOption(data)
  }

  static fromParams(params = {}) {
    return new PollOption({
      text: params.text,
      voterCount: params.voter_count
    })
  }

  constructor(data = {}) {
    this
      .setText(data.text)
      .setVoterCount(data.voterCount)
  }

  setText(text) {
    this.text = text
    return this
  }

  setVoterCount(count) {
    this.voterCount = count
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (Helper.exists(this.voterCount)) {
      data.voterCount = this.voterCount
    }
    return data
  }
}
