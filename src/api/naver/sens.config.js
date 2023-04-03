const CryptoJS = require('crypto-js')
const axios = require('axios')
const { query } = require('express')
const config = require('../../../config').sens

class sendSMS {
  constructor() {
    this.config = config
  }

  makeSignature(httpMethod = 'POST', queryParams = '', urlPath = '') {
    const timestamp = Date.now().toString()
    const method = httpMethod
    const space = ' '
    const newLine = '\n'
    const url2 = `/sms/v2/services/${config.serviceId}/messages${queryParams}`
    const accessKey = this.config.AccessKeyID

    const hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA256,
      this.config.SecretAccessKey
    )
    hmac.update(method)
    hmac.update(space)
    hmac.update(url2)
    hmac.update(newLine)
    hmac.update(timestamp)
    hmac.update(newLine)
    hmac.update(accessKey)

    const hash = hmac.finalize()

    return {
      signature: hash.toString(CryptoJS.enc.Base64),
      timestamp,
    }
  }
  // Verification Code SENT
  async sendSMS(to, message) {
    const { signature, timestamp } = this.makeSignature()
    const url = `${this.config.sendUrl}/services/${this.config.serviceId}/messages`
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.config.AccessKeyID,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    console.log('header : ', headers)

    const smsPayload = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: this.config.from,
      content: message,
      messages: [
        {
          to: to,
        },
      ],
    }
    try {
      const response = await axios.post(url, smsPayload, { headers })
      return response.data
    } catch (e) {
      console.log('Error details:', e.response.data)
      throw new Error(e)
    }
  }
  // Add this function in sens.config.js
  async getMessageId(requestId) {
    const queryParams = `?requestId=${requestId}`
    const { signature, timestamp } = this.makeSignature('GET', queryParams)
    console.log(
      `requestId in getMessageId test getMesageId for requestId ${signature} `
    )
    const url = `${this.config.sendUrl}/services/${this.config.serviceId}/messages?requestId=${requestId}`
    console.log(url)
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.config.AccessKeyID,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    try {
      const response = await axios.get(url, { headers })
      console.log(`response in getMessageId ${JSON.stringify(response.data)}`)
      const messages = response.data.messages
      console.log(`message in getMessageId ${JSON.stringify(messages)}`)
      const message = messages.find(
        (message) => message.requestId === requestId
      )
      console.log(`message in getMessageId ${JSON.stringify(message)}`)
      const messageId = message ? message.messageId : null
      console.log(`messageId in getMessageId ${JSON.stringify(messageId)}`)
      return messageId
    } catch (e) {
      console.log('Error details:', e.response ? e.response.data : e.message)
      throw new Error(e)
    }
  }

  async getMessageContent(messageId) {
    const urlPath = `/sms/v2/services/${this.config.serviceId}/messages/${messageId}`
    const { signature, timestamp } = this.makeSignature('GET', urlPath)
    console.log(`signature in getMessage : `, signature)
    console.log(`timestamp in getMessage : `, timestamp)
    const url = `${this.config.sendUrl}${urlPath}`
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.config.AccessKeyID,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    try {
      const response = await axios.get(url, { headers })
      console.log(`Reponse data in getMessage : `, response.data)
      return response.data
    } catch (e) {
      console.log(`Error details : `, e.response.data)
      throw new Error(e)
    }
  }
}

module.exports = sendSMS
