var multer  = require('multer')
//var upload = multer({ dest: 'server/uploads/' }) careful where you run 'nodemon server'
var upload = multer({ dest: 'uploads/' })

module.exports = function (db){

  async function add(req, res, next) {
    var form = req.body

    if(req.file){ // try/catch instead
      form.image = 'uploads/' + req.file.originalname;
      db.saveImage(req.file)
    }
    var products = await db.addProduct(form)
    // update collection's products count

    res.json({
      success: true,
      message: 'Product added to database',
      products: products

  });
  }

  const products = require('express').Router();
  products.post('/add', upload.single('file'), add)  
  
  return products
}

