class Constants {}
Object.defineProperty(Constants, 'EventType', {
  get: () => {
    if (!Constants._EventType) {
      Constants._EventType = require('./EventType')
    }
    return Constants._EventType
  }
})
Object.defineProperty(Constants, 'UpdateType', {
  get: () => {
    if (!Constants._UpdateType) {
      Constants._UpdateType = require('./UpdateType')
    }
    return Constants._UpdateType
  }
})
Object.defineProperty(Constants, 'ParseMode', {
  get: () => {
    if (!Constants._ParseMode) {
      Constants._ParseMode = require('./ParseMode')
    }
    return Constants._ParseMode
  }
})
Object.defineProperty(Constants, 'ChatType', {
  get: () => {
    if (!Constants._ChatType) {
      Constants._ChatType = require('./ChatType')
    }
    return Constants._ChatType
  }
})
Object.defineProperty(Constants, 'MessageType', {
  get: () => {
    if (!Constants._MessageType) {
      Constants._MessageType = require('./MessageType')
    }
    return Constants._MessageType
  }
})
Object.defineProperty(Constants, 'MessageEntityType', {
  get: () => {
    if (!Constants._MessageEntityType) {
      Constants._MessageEntityType = require('./MessageEntityType')
    }
    return Constants._MessageEntityType
  }
})
Object.defineProperty(Constants, 'PollType', {
  get: () => {
    if (!Constants._PollType) {
      Constants._PollType = require('./PollType')
    }
    return Constants._PollType
  }
})
Object.defineProperty(Constants, 'DiceEmoji', {
  get: () => {
    if (!Constants._DiceEmoji) {
      Constants._DiceEmoji = require('./DiceEmoji')
    }
    return Constants._DiceEmoji
  }
})
Object.defineProperty(Constants, 'ChatAction', {
  get: () => {
    if (!Constants._ChatAction) {
      Constants._ChatAction = require('./ChatAction')
    }
    return Constants._ChatAction
  }
})
Object.defineProperty(Constants, 'ChatMemberStatus', {
  get: () => {
    if (!Constants._ChatMemberStatus) {
      Constants._ChatMemberStatus = require('./ChatMemberStatus')
    }
    return Constants._ChatMemberStatus
  }
})
Object.defineProperty(Constants, 'MediaType', {
  get: () => {
    if (!Constants._MediaType) {
      Constants._MediaType = require('./MediaType')
    }
    return Constants._MediaType
  }
})
Object.defineProperty(Constants, 'MaskPositionPoint', {
  get: () => {
    if (!Constants._MaskPositionPoint) {
      Constants._MaskPositionPoint = require('./MaskPositionPoint')
    }
    return Constants._MaskPositionPoint
  }
})
Object.defineProperty(Constants, 'InlineQueryResultType', {
  get: () => {
    if (!Constants._InlineQueryResultType) {
      Constants._InlineQueryResultType = require('./InlineQueryResultType')
    }
    return Constants._InlineQueryResultType
  }
})
Object.defineProperty(Constants, 'PassportElementType', {
  get: () => {
    if (!Constants._PassportElementType) {
      Constants._PassportElementType = require('./PassportElementType')
    }
    return Constants._PassportElementType
  }
})
Object.defineProperty(Constants, 'PassportElementErrorSource', {
  get: () => {
    if (!Constants._PassportElementErrorSource) {
      Constants._PassportElementErrorSource = require('./PassportElementErrorSource')
    }
    return Constants._PassportElementErrorSource
  }
})

module.exports = Constants
