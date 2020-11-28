const { ParseMode } = require('../constants')
const FormattedText = require('./FormattedText')

class MarkdownText extends FormattedText {
  constructor(text) {
    super(text)
    this.mode = MarkdownText.mode
  }

  escape() {
    this.value = MarkdownText.escape(this.value)
    return this
  }

  bold() {
    this.value = MarkdownText.bold(this.value)
    return this
  }

  italics() {
    this.value = MarkdownText.italics(this.value)
    return this
  }

  code() {
    this.value = MarkdownText.code(this.value)
    return this
  }

  pre(language) {
    this.value = MarkdownText.pre(this.value, language)
    return this
  }

  link(url) {
    this.value = MarkdownText.link(this.value, url)
    return this
  }

  title() {
    this.value = MarkdownText.title(this.value)
    return this
  }

  item(value) {
    this.value = MarkdownText.item(this.value, value)
    return this
  }

  addEscaped(text) {
    this.value += MarkdownText.escape(text)
    return this
  }

  addBold(text) {
    this.value += MarkdownText.bold(text)
    return this
  }

  addItalics(text) {
    this.value += MarkdownText.italics(text)
    return this
  }

  addCode(text) {
    this.value += MarkdownText.code(text)
    return this
  }

  addPre(text, language) {
    this.value += MarkdownText.pre(text, language)
    return this
  }

  addLink(text, url) {
    this.value += MarkdownText.link(text, url)
    return this
  }

  addTitle(text) {
    this.value += MarkdownText.title(text)
    return this
  }

  addItem(name, value) {
    this.value += MarkdownText.item(name, value)
    return this
  }

  clone() {
    return new MarkdownText(this.value)
  }
}
MarkdownText.mode = ParseMode.MARKDOWN
MarkdownText.escape = text => text.replace(/[_*`\[]/g, char => `\\${char}`)
MarkdownText.bold = text => `*${text}*`
MarkdownText.italics = text => `_${text}_`
MarkdownText.code = text => `\`${text}\``
MarkdownText.pre = (text, language) => `\`\`\`${language || ''}\r${text}\`\`\``
MarkdownText.link = (text, url) => `[${text}](${url})`
MarkdownText.title = text => `*${text}*\n`
MarkdownText.item = (name, value) => `*${name}:* ${value}\n`
MarkdownText.from = text => new MarkdownText(text)

module.exports = MarkdownText
