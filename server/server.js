require('dotenv').config()
let express = require('express')
let bodyParser = require('body-parser')
let cfenv = require('cfenv')

// Load & initialize the Conversation Extension Class object with our conversation credentials
let Core = require('./conversation/core');

let conversation = new Core(process.env.CONVERSATION_API_URL, process.env.CONVERSATION_API_USER, process.env.CONVERSATION_API_PASSWORD)
console.log('Watson API Creds',process.env.CONVERSATION_API_URL);

// If conversation responds with a value in output.apiCall with the format 
// "apiName:public" or "apiName:private" or just "apiName" it will attempt to match the requested API name to the registered APIs.
// i.e. to call the diceRoll API, we'll need conversation to respond with
// output.apiCall: "diceRoll" or output.apiCall: "diceRoll:public" or "output.apiCall: "diceRoll:private"

// Register the diceRoll API to 'diceRoll'
//conversation.addAPI('diceRoll', require('./api/diceRoll').rollDice)

// Initialize express
let app = express()
//routes = require('./routes'),
//user = require('./routes/user'),
http = require('http'),
path = require('path'),
fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));// Parse POST bodies
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/dist')));

// Mock Incoming message
// body.text: message to send
// body.user: 'user' sending the message
app.post('/api/message', async (req, res, next) => {
  console.log('User Request Text', req.body.input.text) 

  // Send incoming messages through conversation extension framework
  // Framework will respond with {responseText, userData}
  // userData is made up of: { context: The context object directly from conversation, privateContext: The private context for this user and source from the app }

  var resp = await conversation.handleIncoming(req.body, 'mock-api')
  console.log('response', resp)
  res.status(200).send(resp)

  //res.status(200).send({text:'fuck it up'})

  // Here do something relevant to your incoming message source
  // and not just reply with this data. For instance, if this was an incoming
  // Slack message, you would reply to the user via Facebook
})

app.get('/api/session', function (req, res) {
  conversation.assistant.createSession({
    assistant_id: 'f60f9f5d-8b43-48b9-9cf2-8d724cbbbd09',//process.env.ASSISTANT_ID || '{assistant_id}',
  }, function (error, response) {
    if (error) {
      return res.send(error);
    } else {
      console.log('Session: ', response)
      return res.send(response);
    }
  });
});


// Start the server
app.listen(cfenv.getAppEnv().port, '0.0.0.0', function () {
  console.log('Server running on ' + cfenv.getAppEnv().port)

})

module.exports = app
