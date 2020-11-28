import User from './User.mjs'

export default class PollAnswer {
  static from(data, context) {
    return new PollAnswer(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      pollId: params.poll_id,
      from: params.user,
      optionIds: params.option_ids
    }
    if (data.from) {
      data.from = User.fromParams(data.from, context)
    }
    return new PollAnswer(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setPollId(data.pollId)
      .setFrom(data.from)
      .setOptionIds(data.optionIds)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPollId(id) {
    this.pollId = id
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setOptionIds(ids) {
    this.optionIds = ids
    return this
  }

  toJSON() {
    const data = {}
    if (this.pollId) {
      data.pollId = this.pollId
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.optionIds) {
      data.optionIds = this.optionIds
    }
    return data
  }
}
