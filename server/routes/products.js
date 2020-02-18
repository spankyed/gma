var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (db){

  async function add(req, res, next) {
    var form = req.body

    if(req.file){ // try/catch instead
      form.image = 'uploads/' + req.file.originalname;
      db.saveImage(req.file)
    }
    var newProduct = await db.addProduct(form)
    // update collection's products count

    res.json({
      success: true,
      mess: 'Product added to database',
      body: req.body,
      product: newProduct

  });
  }

  const products = require('express').Router();
  products.post('/add', upload.single('file'), add)  
  
  return products
}

