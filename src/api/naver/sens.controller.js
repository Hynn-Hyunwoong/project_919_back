const SendSMS = require('./sens.config')

class SMSVerification {
  constructor() {
    this.sendSMSInstance = new SendSMS()
  }

  generateVerificationCode() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')
  }

  async sendVerificationSMS(req, res) {
    try {
      const { phone } = req.body
      const verificationCode = this.generateVerificationCode()
      const message = `Project919 회원가입을 위해 인증번호[${verificationCode}]를 입력하세요.`
      // console.log('Phone number:', phone)
      // console.log('Verification code:', verificationCode)

      const response = await this.sendSMSInstance.sendSMS(phone, message)

      res.status(200).json({
        message: 'SMS sent successfully.',
        requestId: response.requestId,
        messageId: response,
      })
    } catch (e) {
      // console.log(`This error occurring in sendVerificationSMS method: ${e}`)
      res.status(500).json({ response: false, message: 'SMS sending failed.' })
    }
  }
  async getMessageId(req, res) {
    try {
      const { requestId } = req.params
      const messageId = await this.sendSMSInstance.getMessageId(requestId)
      res.status(200).json({ messageId })
    } catch (e) {
      console.log(`This error occurring in getMessageId method: ${e}`)
      res.status(500).json({ response: false, message: 'SMS sending failed.' })
    }
  }
  async getMessageContent(req, res) {
    try {
      const { messageId } = req.params
      // console.log(`messageId in getMessageContent ${messageId}`)
      const messageContent = await this.sendSMSInstance.getMessageContent(
        messageId
      )
      console.log(
        `messageContent in getMessageContent ${JSON.stringify(messageContent)}`
      )
      const regex = /\[(\d{6})\]/g
      // console.log(`regex in getMessageContent ${regex}`)
      const found = regex.exec(messageContent.messages[0].content)
      // console.log(`found in getMessageContent ${found}`)
      const sentVerificationCode = found ? found[1] : null
      // console.log(
      //   `sentVerificationCode in getMessageContent ${sentVerificationCode} `
      // )
      res.status(200).json({ sentVerificationCode })
    } catch (e) {
      // console.log(
      //   `This error occurring in getMessageContent method: ${e.message}`
      // )
      res.status(500).json({ response: false, message: 'SMS sending failed.' })
    }
  }
  async verifyUser(req, res) {
    try {
      const { requestId, userInputCode } = req.body
      const messageId = await this.sendSMSInstance.getMessageId(requestId)
      const messageContent = await this.sendSMSInstance.getMessageContent(
        messageId
      )
      const regex = /\[(\d{6})\]/g
      const found = regex.exec(messageContent.messages[0].content)
      const sentVerificationCode = found ? found[1] : null

      if (sentVerificationCode === userInputCode) {
        res
          .status(200)
          .json({ response: true, message: '인증번호가 확인되었습니다.' })
      } else {
        res
          .status(200)
          .json({ response: false, message: '인증번호가 일치하지 않습니다.' })
      }
    } catch (e) {
      console.log(`This error occurring in verifyUser method: ${e}`)
      res.status(500).json({ response: false, message: 'SMS sending failed.' })
    }
  }
}

module.exports = { SMSVerification }
