const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class database {
  constructor (defaults) {
    this.db = low(new FileSync('data/db.json'))
    this.db.defaults = defaults ? defaults : { products: [], user: {}, count: 0 }
    console.log("state", this.db.getState())
  }
  _get (user, source) {
    return this.db
    .get('posts')
    .find({ id: 1 })
    .value()
  }

  addProduct (product) {
    console.log(this.db
      .get('products').value())
    return this.db
    .get('products')
    .push(product)
    .write()
  }

  getProducts (apiCallName, apiCallPromise) {
    return this.db.get('products')
  }

  saveImage (file){
    var tmp_path = file.path;

    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = 'uploads/' + file.originalname;
  
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    //todo: delete temp src file
    
    //src.on('end', function() { res.render('complete'); });
    //src.on('error', function(err) { res.render('error'); });
  }

}

module.exports = database
