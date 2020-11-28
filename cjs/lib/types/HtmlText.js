const { ParseMode } = require('../constants')
const FormattedText = require('./FormattedText')

class HtmlText extends FormattedText {
  constructor(text) {
    super(text)
    this.mode = HtmlText.mode
  }

  escape() {
    this.value = HtmlText.escape(this.value)
    return this
  }

  bold() {
    this.value = HtmlText.bold(this.value)
    return this
  }

  italics() {
    this.value = HtmlText.italics(this.value)
    return this
  }

  underline() {
    this.value = HtmlText.underline(this.value)
    return this
  }

  strike() {
    this.value = HtmlText.strike(this.value)
    return this
  }

  code() {
    this.value = HtmlText.code(this.value)
    return this
  }

  pre(language) {
    this.value = HtmlText.pre(this.value, language)
    return this
  }

  link(url) {
    this.value = HtmlText.link(this.value, url)
    return this
  }

  title() {
    this.value = HtmlText.title(this.value)
    return this
  }

  item(value) {
    this.value = HtmlText.item(this.value, value)
    return this
  }

  addEscaped(text) {
    this.value += HtmlText.escape(text)
    return this
  }

  addBold(text) {
    this.value += HtmlText.bold(text)
    return this
  }

  addItalics(text) {
    this.value += HtmlText.italics(text)
    return this
  }

  addUnderlined(text) {
    this.value += HtmlText.underline(text)
    return this
  }

  addStrike(text) {
    this.value += HtmlText.strike(text)
    return this
  }

  addCode(text) {
    this.value += HtmlText.code(text)
    return this
  }

  addPre(text, language) {
    this.value += HtmlText.pre(text, language)
    return this
  }

  addLink(text, url) {
    this.value += HtmlText.link(text, url)
    return this
  }

  addTitle(text) {
    this.value += HtmlText.title(text)
    return this
  }

  addItem(name, value) {
    this.value += HtmlText.item(name, value)
    return this
  }

  clone() {
    return new HtmlText(this.value)
  }
}
HtmlText.mode = ParseMode.HTML
HtmlText.escape = text => text
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
HtmlText.bold = text => `<b>${text}</b>`
HtmlText.italics = text => `<i>${text}</i>`
HtmlText.underline = text => `<u>${text}</u>`
HtmlText.strike = text => `<s>${text}</s>`
HtmlText.code = text => `<code>${text}</code>`
HtmlText.pre = (text, language) => `<pre>${language ? `<code class="language-${language}">` : ''}${text}${language ? '</code>' : ''}</pre>`
HtmlText.link = (text, url) => `<a href="${url}">${text}</a>`
HtmlText.title = text => `<b>${text}</b>\n`
HtmlText.item = (name, value) => `<b>${name}:</b> ${value}\n`
HtmlText.from = text => new HtmlText(text)

module.exports = HtmlText
