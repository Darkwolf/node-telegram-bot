import Helper from '@darkwolf/helper.mjs'
import { DiceEmoji } from '../constants/index.mjs'

export default class Dice {
  static from(data, context) {
    return new Dice(data, context)
  }

  static fromParams(params = {}, context) {
    return new Dice({
      emoji: params.emoji,
      value: params.value
    }, context)
  }

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
