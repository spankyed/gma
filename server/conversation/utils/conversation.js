//let genericRequestRawPromise = require('./api').genericRequestRawPromise
var AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk

/**
 * sendMessageToWatson - Make an HTTP request to send a message to Watson Conversation
 *
 * @param  {string} message               message to send
 * @param  {object} context               context object
 * @param  {string} conversationUrl       conversation API endpoint
 * @param  {string} conversationUser      conversation user
 * @param  {string} conversationPassword  conversation password
 * @return {Promise}                      a promise to make an HTTP call to Watson Conversation
 */
//let sendMessageToWatson = function (assistantSDK, message, context, session_id, assistant_id) {
let sendMessageToWatson = function (assistantSDK, message) {
  //console.log('this shit fucking it up',message.input.text)
  var payload = {
    assistant_id: 'f60f9f5d-8b43-48b9-9cf2-8d724cbbbd09', //assistant_id,
    session_id: message.session_id, //req.body.session_id,
    context: {
      global : {
        system : {
          turn_count : 1
        }
      }
    },//context,
    input: {
      message_type : 'text',
      text : message.input.text.text,
      options : {
        return_context : true
      }
    }
  };

  return new Promise(function(resolve, reject) {
    assistantSDK.message(payload, function (err, data) {
      if(err){
        reject(err.code || 500) 
      } else {
        console.log('oh shit waddup', data)
        resolve(data)
      }
      //(!err) ? resolve(data) : reject(err.code || 500) 
      //(!err) ? resolve(res.json(data)) : reject(res.status(err.code || 500).json(err)) 
    }); 
  });

}

module.exports = {
  sendMessageToWatson
}

