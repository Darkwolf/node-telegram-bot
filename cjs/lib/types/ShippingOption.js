const Helper = require('@darkwolf/helper.cjs')
const LabeledPrice = require('./LabeledPrice')

class ShippingOption {
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
ShippingOption.from = (id, title, prices) => new ShippingOption(id, title, prices)

module.exports = ShippingOption
