const Helper = require('@darkwolf/helper.cjs')
const types = require('./')
const constants = require('../constants')

class Poll {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setQuestion(data.question)
      .setOptions(data.options)
      .setCorrectOptionId(data.correctOptionId)
      .setAnonymous(data.anonymous)
      .setAllowsMultipleAnswers(data.allowsMultipleAnswers)
      .setExplanation(data.explanation)
      .setExplanationEntities(data.explanationEntities)
      .setOpenPeriod(data.openPeriod)
      .setCloseDate(data.closeDate)
      .setClosed(data.closed)
      .setTotalVoterCount(data.totalVoterCount)
  }

  isRegular() {
    return this.type === constants.PollType.REGULAR
  }

  isQuiz() {
    return this.type === constants.PollType.QUIZ
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setQuestion(question) {
    this.question = question
    return this
  }

  setOptions(options) {
    this.options = options ? options.map(option =>
      option instanceof types.PollOption ? option : new types.PollOption(option)
    ) : undefined
    return this
  }

  setCorrectOptionId(id) {
    this.correctOptionId = id
    return this
  }

  setAnonymous(boolean) {
    this.anonymous = boolean
    return this
  }

  setAllowsMultipleAnswers(boolean) {
    this.allowsMultipleAnswers = boolean
    return this
  }

  setExplanation(explanation) {
    this.explanation = explanation
    return this
  }

  setExplanationEntities(entities) {
    this.explanationEntities = entities ? entities.map(entity =>
      entity instanceof types.MessageEntity ? entity : new types.MessageEntity(entity)
    ) : undefined
    return this
  }

  setOpenPeriod(duration) {
    this.openPeriod = duration
    return this
  }

  setCloseDate(date) {
    this.closeDate = date
    return this
  }

  setClosed(boolean) {
    this.closed = boolean
    return this
  }

  setTotalVoterCount(count) {
    this.totalVoterCount = count
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.question) {
      data.question = this.question
    }
    if (this.options) {
      data.options = this.options.map(option => option.toJSON())
    }
    if (Helper.exists(this.correctOptionId)) {
      data.correctOptionId = this.correctOptionId
    }
    if (Helper.exists(this.anonymous)) {
      data.anonymous = this.anonymous
    }
    if (Helper.exists(this.allowsMultipleAnswers)) {
      data.allowsMultipleAnswers = this.allowsMultipleAnswers
    }
    if (Helper.exists(this.explanation)) {
      data.explanation = this.explanation
    }
    if (this.explanationEntities) {
      data.explanationEntities = this.explanationEntities.map(entity => entity.toJSON())
    }
    if (this.openPeriod) {
      data.openPeriod = this.openPeriod
    }
    if (this.closeDate) {
      data.closeDate = this.closeDate
    }
    if (Helper.exists(this.closed)) {
      data.closed = this.closed
    }
    if (Helper.exists(this.totalVoterCount)) {
      data.totalVoterCount = this.totalVoterCount
    }
    return data
  }
}
Poll.from = (data, context) => new Poll(data, context)
Poll.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    type: params.type,
    question: params.question,
    options: params.options,
    correctOptionId: params.correct_option_id,
    anonymous: params.is_anonymous,
    allowsMultipleAnswers: params.allows_multiple_answers,
    explanation: params.explanation,
    explanationEntities: params.explanationEntities,
    openPeriod: params.open_period,
    closeDate: params.close_date,
    closed: params.is_closed,
    totalVoterCount: params.total_voter_count
  }
  if (data.options) {
    data.options = data.options.map(option => types.PollOption.fromParams(option))
  }
  if (data.explanationEntities) {
    data.explanationEntities = data.explanationEntities.map(entity => types.MessageEntity.fromParams(entity, {
      ...context,
      text: data.explanation
    }))
  }
  return new Poll(data, context)
}

module.exports = Poll
