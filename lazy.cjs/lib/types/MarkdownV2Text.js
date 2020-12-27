const types = require('./')
const constants = require('../constants')

class MarkdownV2Text extends types.FormattedText {
  constructor(text) {
    super(text)
    this.mode = MarkdownV2Text.mode
  }

  escape() {
    this.value = MarkdownV2Text.escape(this.value)
    return this
  }

  bold() {
    this.value = MarkdownV2Text.bold(this.value)
    return this
  }

  italics() {
    this.value = MarkdownV2Text.italics(this.value)
    return this
  }

  underline() {
    this.value = MarkdownV2Text.underline(this.value)
    return this
  }

  underlineItalics() {
    this.value = MarkdownV2Text.underlineItalics(this.value)
    return this
  }

  strike() {
    this.value = MarkdownV2Text.strike(this.value)
    return this
  }

  code() {
    this.value = MarkdownV2Text.code(this.value)
    return this
  }

  pre(language) {
    this.value = MarkdownV2Text.pre(this.value, language)
    return this
  }

  link(url) {
    this.value = MarkdownV2Text.link(this.value, url)
    return this
  }

  title() {
    this.value = MarkdownV2Text.title(this.value)
    return this
  }

  item(value) {
    this.value = MarkdownV2Text.item(this.value, value)
    return this
  }

  addEscaped(text) {
    this.value += MarkdownV2Text.escape(text)
    return this
  }

  addBold(text) {
    this.value += MarkdownV2Text.bold(text)
    return this
  }

  addItalics(text) {
    this.value += MarkdownV2Text.italics(text)
    return this
  }

  addUnderlined(text) {
    this.value += MarkdownV2Text.underline(text)
    return this
  }

  addUnderlinedItalics(text) {
    this.value += MarkdownV2Text.underlineItalics(text)
    return this
  }

  addStrike(text) {
    this.value += MarkdownV2Text.strike(text)
    return this
  }

  addCode(text) {
    this.value += MarkdownV2Text.code(text)
    return this
  }

  addPre(text, language) {
    this.value += MarkdownV2Text.pre(text, language)
    return this
  }

  addLink(text, url) {
    this.value += MarkdownV2Text.link(text, url)
    return this
  }

  addTitle(text) {
    this.value += MarkdownV2Text.title(text)
    return this
  }

  addItem(name, value) {
    this.value += MarkdownV2Text.item(name, value)
    return this
  }

  clone() {
    return new MarkdownV2Text(this.value)
  }
}
MarkdownV2Text.mode = constants.ParseMode.MARKDOWN_V2
MarkdownV2Text.escape = text => text.replace(/[_*\[\]()~`>#+-=|{}.!]/g, char => `\\${char}`)
MarkdownV2Text.bold = text => `*${text}*`
MarkdownV2Text.italics = text => `_${text}_`
MarkdownV2Text.underline = text => `__${text}__`
MarkdownV2Text.underlineItalics = text => `___${text}_\r__`
MarkdownV2Text.strike = text => `~${text}~`
MarkdownV2Text.code = text => `\`${text}\``
MarkdownV2Text.pre = (text, language) => `\`\`\`${language || ''}\r${text}\`\`\``
MarkdownV2Text.link = (text, url) => `[${text}](${url})`
MarkdownV2Text.title = text => `*${text}*\n`
MarkdownV2Text.item = (name, value) => `*${name}:* ${value}\n`
MarkdownV2Text.from = text => new MarkdownV2Text(text)

module.exports = MarkdownV2Text
