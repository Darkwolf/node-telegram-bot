const EventType = require('./EventType')
const UpdateType = require('./UpdateType')
const ParseMode = require('./ParseMode')
const ChatType = require('./ChatType')
const MessageType = require('./MessageType')
const MessageEntityType = require('./MessageEntityType')
const PollType = require('./PollType')
const DiceEmoji = require('./DiceEmoji')
const ChatAction = require('./ChatAction')
const ChatMemberStatus = require('./ChatMemberStatus')
const MediaType = require('./MediaType')
const MaskPositionPoint = require('./MaskPositionPoint')
const InlineQueryResultType = require('./InlineQueryResultType')
const PassportElementType = require('./PassportElementType')
const PassportElementErrorSource = require('./PassportElementErrorSource')

class Constants {}
Constants.EventType = EventType
Constants.UpdateType = UpdateType
Constants.ParseMode = ParseMode
Constants.ChatType = ChatType
Constants.MessageType = MessageType
Constants.MessageEntityType = MessageEntityType
Constants.PollType = PollType
Constants.DiceEmoji = DiceEmoji
Constants.ChatAction = ChatAction
Constants.ChatMemberStatus = ChatMemberStatus
Constants.MediaType = MediaType
Constants.MaskPositionPoint = MaskPositionPoint
Constants.InlineQueryResultType = InlineQueryResultType
Constants.PassportElementType = PassportElementType
Constants.PassportElementErrorSource = PassportElementErrorSource

module.exports = Constants
