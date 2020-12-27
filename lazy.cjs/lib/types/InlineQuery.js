const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class InlineQuery {
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
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof types.Location ? location : new types.Location(location)
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
InlineQuery.from = (data, context) => new InlineQuery(data, context)
InlineQuery.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    from: params.from,
    location: params.location,
    query: params.query,
    offset: params.offset
  }
  if (data.from) {
    data.from = types.User.fromParams(data.from, context)
  }
  if (data.location) {
    data.location = types.Location.fromParams(data.location)
  }
  return new InlineQuery(data, context)
}

module.exports = InlineQuery
