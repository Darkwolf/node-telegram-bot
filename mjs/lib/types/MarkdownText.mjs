import { ParseMode } from '../constants/index.mjs'
import FormattedText from './FormattedText.mjs'

export default class MarkdownText extends FormattedText {
  static mode = ParseMode.MARKDOWN

  static escape(text) {
    return text.replace(/[_*`\[]/g, char => `\\${char}`)
  }

  static bold(text) {
    return `*${text}*`
  }

  static italics(text) {
    return `_${text}_`
  }

  static code(text) {
    return `\`${text}\``
  }

  static pre(text, language) {
    return `\`\`\`${language || ''}\r${text}\`\`\``
  }

  static link(text, url) {
    return `[${text}](${url})`
  }

  static title(text) {
    return `*${text}*\n`
  }

  static item(name, value) {
    return `*${name}:* ${value}\n`
  }

  static from(text) {
    return new MarkdownText(text)
  }

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
