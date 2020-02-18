require('dotenv').config()
let cfenv = require('cfenv'),
bodyParser = require('body-parser'),
express = require('express'),
http = require('http'),
path = require('path'),
//fs = require('fs'),

app = express();
app.use(bodyParser.urlencoded({ extended: true }));// Parse POST bodies
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/dist')));

//Routes
var indexRouter = require('./routes/index');
app.use('/', indexRouter);


/*app._router.stack.forEach(function(r){
  if (r.handle && r.handle.stack){
    //console.log(Object.keys(r.handle.stack[0].handle.stack))
    //console.log(r.handle.stack[0].handle.stack[0].route)
    routes = r.handle.stack[0].handle.stack[0]
    routes.forEach((r)=>{
      console.log(r.route)
    })
  }
})*/

// Start the server
app.listen(cfenv.getAppEnv().port, '0.0.0.0', function () {
  console.log('Server running on ' + cfenv.getAppEnv().port)

})

module.exports = app
