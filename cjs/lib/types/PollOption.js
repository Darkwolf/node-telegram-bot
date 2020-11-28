const Helper = require('@darkwolf/helper.cjs')

class PollOption {
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
PollOption.from = data => new PollOption(data)
PollOption.fromParams = (params = {}) => new PollOption({
  text: params.text,
  voterCount: params.voter_count
})

module.exports = PollOption
