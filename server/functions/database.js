let path = require('path'),
//fs = require('fs-extra'),
fs = require('fs'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb');
//shortId = require('shortid');

const data_dir = 'data',
productsPath = path.join(data_dir, 'products.json');
collectionsPath = path.join(data_dir, 'collections.json');

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
exports.addProduct = function (obj) {
    obj = obj || {};
    obj.description = obj.description || 'New Product';
    obj.created = Date.now()
    return this.readJson(productsPath).then(function (products) {
        let product = {
            //id: shortId.generate(),
            ...obj
        };
        return products.get('products').push(product).write().then(function (as) {
            console.log('added',product)
            return product;
        })
    });
};
exports.addCollection = function (obj) {
    obj = obj || {};
    obj.created = Date.now()
    return this.readJson(collectionsPath).then(function (collections) {
        let collection = {
            //id: shortId.generate(),
            ...obj
        };
        return collections.get('collections').push(collection).write().then(function (c) {
            console.log('added',collection)
            return collection;
        })
    });
};
exports.getCollections = function (obj) {
    return this.readJson(collectionsPath).then(function (collections) {
        console.log(collections.get('collections').value())
        return collections.get('collections').value()
    });
};
 
// delete a product by Id
exports.getProductById = function (id) {
 
    return this.readLists().then(function (lists) {
 
        return lists.get('lists').find({
            id: id
        });
 
    }).then(function (list) {
 
        // sort by done
        return list.assign({
 
            items: list.get('items').sortBy(function (item) {
 
                return !item.done;
 
            }).value()
        });
 
    });
 
};
 
// delete a product by productId
exports.deleteProductById = function (obj) {
 
    return this.readLists().then(function (db) {
 
        return db.get('products').remove({
 
            id: obj.productId
 
        }).write();
 
    });
 
};

// edit an item by list and item id
exports.editProductById = function (obj) {
 
    return this.getProductById(obj.listId).then(function (list) {
 
        var item = list.get('items').find({
                id: obj.itemId
            });
 
        // toggle done flag?
        if (obj.toggleDone) {
 
            return item.assign({
                done: !item.value().done
            }).write();
 
        } else {
 
            // then direct edit, if we have an item object to do so with
            if (obj.item) {
                return item.assign(obj.item).write();
            }
 
        }
 
        // if this happens just return a promise,
        // and change nothing.
        return item.write();
 
    });
 
};
 
// get an item by list and item id
exports.deleteProductById = function (obj) {
 
    return this.getListById(obj.listId).then(function (list) {
 
        return list.get('items').remove({
            id: obj.itemId
        }).write();
 
    });
 
};
 

exports.saveImage = function (file){
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



