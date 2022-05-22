export default class AppError extends Error {
  constructor (message, codeText, code) {
    super(message)

    this.codeText = codeText
    this.code = code
  }
}
