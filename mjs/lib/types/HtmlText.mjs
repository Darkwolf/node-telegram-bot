import { ParseMode } from '../constants/index.mjs'
import FormattedText from './FormattedText.mjs'

export default class HtmlText extends FormattedText {
  static mode = ParseMode.HTML

  static escape(text) {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
  }

  static bold(text) {
    return `<b>${text}</b>`
  }

  static italics(text) {
    return `<i>${text}</i>`
  }

  static underline(text) {
    return `<u>${text}</u>`
  }

  static strike(text) {
    return `<s>${text}</s>`
  }

  static code(text) {
    return `<code>${text}</code>`
  }

  static pre(text, language) {
    return `<pre>${language ? `<code class="language-${language}">` : ''}${text}${language ? '</code>' : ''}</pre>`
  }

  static link(text, url) {
    return `<a href="${url}">${text}</a>`
  }

  static title(text) {
    return `<b>${text}</b>\n`
  }

  static item(name, value) {
    return `<b>${name}:</b> ${value}\n`
  }

  static from(text) {
    return new HtmlText(text)
  }

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
