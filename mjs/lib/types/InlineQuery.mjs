import Helper from '@darkwolf/helper.mjs'
import User from './User.mjs'
import Location from './Location.mjs'

export default class InlineQuery {
  static from(data, context) {
    return new InlineQuery(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      id: params.id,
      from: params.from,
      location: params.location,
      query: params.query,
      offset: params.offset
    }
    if (data.from) {
      data.from = User.fromParams(data.from, context)
    }
    if (data.location) {
      data.location = Location.fromParams(data.location)
    }
    return new InlineQuery(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setFrom(data.from)
      .setLocation(data.location)
      .setQuery(data.query)
      .setOffset(data.offset)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof Location ? location : new Location(location)
    ) : undefined
    return this
  }

  setQuery(query) {
    this.query = query
    return this
  }

  setOffset(offset) {
    this.offset = offset
    return this
  }

  answer(results, options) {
    return this.context.telegramBot.answerInlineQuery(this.id, results, options)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.location) {
      data.location = this.location.toJSON()
    }
    if (Helper.exists(this.query)) {
      data.query = this.query
    }
    if (Helper.exists(this.offset)) {
      data.offset = this.offset
    }
    return data
  }
}
