import EventType from './EventType.mjs'
import UpdateType from './UpdateType.mjs'
import ParseMode from './ParseMode.mjs'
import ChatType from './ChatType.mjs'
import MessageType from './MessageType.mjs'
import MessageEntityType from './MessageEntityType.mjs'
import PollType from './PollType.mjs'
import DiceEmoji from './DiceEmoji.mjs'
import ChatAction from './ChatAction.mjs'
import ChatMemberStatus from './ChatMemberStatus.mjs'
import MediaType from './MediaType.mjs'
import MaskPositionPoint from './MaskPositionPoint.mjs'
import InlineQueryResultType from './InlineQueryResultType.mjs'
import PassportElementType from './PassportElementType.mjs'
import PassportElementErrorSource from './PassportElementErrorSource.mjs'

export {
  EventType,
  UpdateType,
  ParseMode,
  ChatType,
  MessageType,
  MessageEntityType,
  PollType,
  DiceEmoji,
  ChatAction,
  ChatMemberStatus,
  MediaType,
  MaskPositionPoint,
  InlineQueryResultType,
  PassportElementType,
  PassportElementErrorSource
}

export default class Constants {
  static EventType = EventType
  static UpdateType = UpdateType
  static ParseMode = ParseMode
  static ChatType = ChatType
  static MessageType = MessageType
  static MessageEntityType = MessageEntityType
  static PollType = PollType
  static DiceEmoji = DiceEmoji
  static ChatAction = ChatAction
  static ChatMemberStatus = ChatMemberStatus
  static MediaType = MediaType
  static MaskPositionPoint = MaskPositionPoint
  static InlineQueryResultType = InlineQueryResultType
  static PassportElementType = PassportElementType
  static PassportElementErrorSource = PassportElementErrorSource
}
