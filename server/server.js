require('dotenv').config()
let cfenv = require('cfenv')
let bodyParser = require('body-parser')
let express = require('express')
var multer  = require('multer')

let Database = require('./functions/database');
let db = new Database()

let app = express()
//routes = require('./routes'),
//user = require('./routes/user'),
http = require('http'),
path = require('path'),
fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));// Parse POST bodies
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/dist')));


var upload = multer({ dest: 'uploads/' })
app.post('/products/upload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  //var resp = await conversation.handleIncoming(req.body, 'mock-api')

  var form = req.body
  for (let field in form) {
    if (field == "") delete form.field
  }
  form.image = 'uploads/' + req.file.originalname;
  db.saveImage(req.file)
  console.log(db.getProducts())
  db.addProduct(form).then((e) => console.log('State has been saved',e))

  res.status(200).send({text:"hello world"})

}, function (error, response) {
  if (error) {
    return res.send(error);
  } else {
    console.log('Session: ', response)
    return res.send(response);
  }
});


// Start the server
app.listen(cfenv.getAppEnv().port, '0.0.0.0', function () {
  console.log('Server running on ' + cfenv.getAppEnv().port)

})

module.exports = app
