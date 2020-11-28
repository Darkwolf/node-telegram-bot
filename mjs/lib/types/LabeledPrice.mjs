import Helper from '@darkwolf/helper.mjs'

export default class LabeledPrice {
  static from(label, amount) {
    return new LabeledPrice(label, amount)
  }

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
