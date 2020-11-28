import Helper from '@darkwolf/helper.mjs'
import LabeledPrice from './LabeledPrice.mjs'

export default class ShippingOption {
  static from(id, title, prices) {
    return new ShippingOption(id, title, prices)
  }

  constructor(id, title, prices) {
    this
      .setId(id)
      .setTitle(title)
      .setPrices(prices)
  }

  setId(id) {
    this.id = id
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setPrices(prices) {
    this.prices = prices ? prices.map(price =>
      price instanceof LabeledPrice ? price : new LabeledPrice(price.label, price.amount)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (this.id) {
      params.id = this.id
    }
    if (Helper.exists(this.title)) {
      params.title = this.title
    }
    if (this.prices) {
      params.prices = this.prices.map(price => price.toParams())
    }
    return params
  }
}
