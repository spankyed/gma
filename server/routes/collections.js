var multer  = require('multer')
var upload = multer()

module.exports = function (db){

  async function add(req, res, next) {
    var form = req.body
    //console.log('form',form)    

    try {
      var collections = await db.addCollection(form)
    } catch (error) {
      console.error(error)
      res.json({
        success: false,
        message: 'Error Adding Collection',
        collections: collections || undefined
      })
    }

    res.json({
      success: true,
      message: 'Collection Successfully Added !',
      collections: collections
    });
  }
  
  async function list(req, res, next){
    try {
      var collections = await db.getCollections()
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        message: 'Error retrieving collections',
        collections: collections
      })
    }
    
    //res.json(collections)
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

