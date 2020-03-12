let path = require('path'),
fs = require('fs'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb');

var Collections = require('./dbCollections');
var Products = require('./dbProducts');
exports.ensureDB = function (path) {
    let dbAdapter = new FileAsync(path);
    //{ products: [], user: {}, count: 0 }
    return fs.ensureDir(data_dir).then(function () {
        return low(dbAdapter).then(function (list) {
            return list.defaults({
                lists: []
            }).write();
        })
    }); 
};
exports.readJson = function (path) {
    let listAdapter = new FileAsync(path); 
    return low(listAdapter);
};

exports.addProduct = Products.addProduct
exports.addCollection = Collections.addCollection
exports.editProductById = Products.editProductById
exports.editCollection = Collections.editCollection
exports.deleteProductById = Products.deleteProductById
exports.deleteCollection = Collections.deleteCollection
exports.getProducts = Products.getProducts
exports.getCollections = Collections.getCollections
exports.getProductById = Products.getProductById
exports.getCollectionById = Collections.getCollectionById
exports.getFilteredProductsByPage = Products.getFilteredProductsByPage
 
exports.saveImage = function (file){
    var tmp_path = file.path;
    var target_path = 'uploads/' + file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    //todo: delete temp src file
    //src.on('end', function() { res.render('complete'); });
    //src.on('error', function(err) { res.render('error'); });
}



