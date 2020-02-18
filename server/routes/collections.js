var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (db){

  async function add(req, res, next) {
    var form = req.body
    console.log('form',form) 
    var newCollection = await db.addCollection(form)
    
    res.json({
      success: true,
      mess: 'Collection added to database',
      body: req.body,
      collection: newCollection
    });
  }
  async function list(req, res, next){
    var collections = await db.getCollections()
    res.json(collections)
    /*res.json({
      success: true,
      mess: 'Collections successfully retrieved',
      collections: collections
    });*/
  }
  const collections = require('express').Router();
  collections.post('/add', upload.any(), add)  
  collections.get('/list', list)  

  return collections
}

