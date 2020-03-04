let path = require('path');
//fs = require('fs-extra'),
//shortId = require('shortid');

const data_dir = 'data',
productsPath = path.join(data_dir, 'products.json');

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
exports.getProducts = function (obj) {
    return this.readJson(productsPath).then(function (products) {
        return products.get('products').value()
    });
};
 
exports.getProductById = function (id) {
    return this.readJson(productsPath).then(function (productsFile) {
        return productsFile.get('products').find({
            id: id
        });
    })
};

exports.getFilteredProductsByPage = function (query) {
    let last = query.page * 4,
        first = last - 4
    return this.readJson(productsPath).then(function (productsFile) {
        return productsFile.get('products').filter((product)=>{
            return Object.keys(product).some(prop => { 
                return String(product[prop]).toLowerCase().includes(query.filter.toLowerCase())
            })
        }).value()
    }).then(function(products){
        return {
            count: products.length,
            products: products.slice(first,last)
        }
    })
};
 
// delete a product by productId
exports.deleteProductById = function (obj) {
    return this.readJsons(productsPath).then(function (db) { 
        return db.get('products').remove({ 
            id: obj.productId 
        }).write(); 
    });
};

// edit an item by product and item id
exports.editProductById = function (obj) { 
    return this.getProductById(obj.productId).then(function (product) { 
        var item = product.get('items').find({
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





