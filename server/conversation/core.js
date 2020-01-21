let handler = require('./process-handler/process')
let processUtils = require('./utils/process')
var AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk

class conversationExtension {
  constructor (conversationUrl, conversationUser, conversationPassword) {
    this.handler = handler
    this.options = {
      conversationUrl: conversationUrl,
      conversationUser: conversationUser,
      conversationPassword: conversationPassword
    }
    this.assistant = new AssistantV2({
      version: '2018-11-08',
      iam_apikey: '_A__CWFfCmPcQ3knESeA89w9SG6ogxH5ZrtzvsNzG66f',
      url: 'https://gateway.watsonplatform.net/assistant/api'
    });
  }
  _retrieveUserData (user, source) {
    return processUtils.retrieveUserData(user, source)
  }
  _storeUserData (user, source, context, privateContext, responseOptions) {
    return processUtils.storeUserData(user, source, context, privateContext, responseOptions)
  }
  addAPI (apiCallName, apiCallPromise) {
    this.handler.apiCallDirector.addAPI(apiCallName, apiCallPromise)
  }
  async handleIncoming (incomingMessage, userId, source) {
    try {
      return (await this.handler.processMessage(this.assistant, incomingMessage, userId, source))
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = conversationExtension
