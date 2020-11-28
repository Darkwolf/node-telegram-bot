import { ParseMode } from '../constants/index.mjs'
import FormattedText from './FormattedText.mjs'

export default class MarkdownV2Text extends FormattedText {
  static mode = ParseMode.MARKDOWN_V2

  static escape(text) {
    return text.replace(/[_*\[\]()~`>#+-=|{}.!]/g, char => `\\${char}`)
  }

  static bold(text) {
    return `*${text}*`
  }

  static italics(text) {
    return `_${text}_`
  }

  static underline(text) {
    return `__${text}__`
  }

  static underlineItalics(text) {
    return `___${text}_\r__`
  }

  static strike(text) {
    return `~${text}~`
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
    return new MarkdownV2Text(text)
  }

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
