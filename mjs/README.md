# Telegram Bot API
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/telegram-bot.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/telegram-bot.cjs`
## Using
```javascript
// ECMAScript
import TelegramBot, {
  InputFile,
  InputMediaPhoto,
  InlineKeyboardMarkup,
  InlineKeyboardButton,
  MarkdownText,
  ParseMode
} from '@darkwolf/telegram-bot.mjs'

// CommonJS
const TelegramBot = require('@darkwolf/telegram-bot.cjs')
const {
  InputFile,
  InputMediaPhoto,
  InlineKeyboardMarkup,
  InlineKeyboardButton,
  MarkdownText,
  ParseMode
} = TelegramBot

const bot = new TelegramBot(token, {
  agent: new Agent()
})

// Handling events
bot.on('request', request => {})
bot.on('response', response => {})
bot.on('error', error => {})

// Sending messages
const text = new MarkdownText()
  .addTitle(MarkdownText.escape('Ave, Darkwolf!'))
  .addItem('First Name', 'Pavel')
  .addItem('Last Name', 'Wolf')
const message = await bot.sendMessage(chatId, text, {
  parseMode: ParseMode.MARKDOWN,
  replyMarkup: new InlineKeyboardMarkup([
    [new InlineKeyboardButton('Ave, Darkwolf!', {
      callbackData: 'ave-darkwolf'
    })]
  ])
})
// Sending photo
const photoMessage = await bot.sendPhoto(chatId, new InputFile('photo.jpeg'))
// Sending media group
const messages = await bot.sendMediaGroup(chatId, [
  new InputMediaPhoto(new InputFile('first.jpeg')),
  new InputMediaPhoto(new InputFile('second.jpeg')),
  new InputMediaPhoto(new InputFile('third.jpeg'))
])
// Downloading files
const files = await Promise.all(messages.map(message => message.photo[0].getFile()))
const blobs = await Promise.all(files.map(file => file.download()))
```
## [API Documentation](https://github.com/Darkwolf/node-telegram-bot/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
