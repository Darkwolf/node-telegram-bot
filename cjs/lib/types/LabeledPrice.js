const Helper = require('@darkwolf/helper.cjs')

class LabeledPrice {
  constructor(label, amount) {
    this
      .setLabel(label)
      .setAmount(amount)
  }

  setLabel(label) {
    this.label = label
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.label)) {
      params.label = this.label
    }
    if (Helper.exists(this.amount)) {
      params.amount = this.amount
    }
    return params
  }
}
LabeledPrice.from = (label, amount) => new LabeledPrice(label, amount)

module.exports = LabeledPrice
