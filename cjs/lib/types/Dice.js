const Helper = require('@darkwolf/helper.cjs')
const { DiceEmoji } = require('../constants')

class Dice {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setEmoji(data.emoji)
      .setValue(data.value)
  }

  get isDice() {
    return this.emoji === DiceEmoji.DICE
  }

  get isDarts() {
    return this.emoji === DiceEmoji.DARTS
  }

  get isBasketball() {
    return this.emoji === DiceEmoji.BASKETBALL
  }

  get isFootball() {
    return this.emoji === DiceEmoji.FOOTBALL
  }

  get isSlotMachine() {
    return this.emoji === DiceEmoji.SLOT_MACHINE
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setEmoji(emoji) {
    this.emoji = emoji
    return this
  }

  setValue(value) {
    this.value = value
    return this
  }

  toJSON() {
    const data = {}
    if (this.emoji) {
      data.emoji = this.emoji
    }
    if (Helper.exists(this.value)) {
      data.value = this.value
    }
    return data
  }
}
Dice.from = (data, context) => new Dice(data, context)
Dice.fromParams = (params = {}, context) => new Dice({
  emoji: params.emoji,
  value: params.value
}, context)

module.exports = Dice
