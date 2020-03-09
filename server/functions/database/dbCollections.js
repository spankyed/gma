let path = require('path');
//fs = require('fs-extra'),
//shortId = require('shortid');

const data_dir = 'data',
collectionsPath = path.join(data_dir, 'collections.json');

exports.addCollection = function (obj) {
    obj = obj || {};
    obj.created = Date.now()
    return this.readJson(collectionsPath).then(function (collections) {
        let collection = {
            //id: shortId.generate(),
            ...obj
        };
        return collections.get('collections').push(collection).write().then(function (collections) {
            console.log('collection added /n', collections)
            return collections;
        })
    });
};
exports.getCollections = function (obj) {
    return this.readJson(collectionsPath).then(function (collectionsFile) {
        console.log(collectionsFile.get('collections').value())
        return collectionsFile.get('collections').value()
    });
};
 
// delete a collection by Id
exports.getCollectionById = function (id) {
    return this.readJson(collectionsPath).then(function (collectionsFile) {
        return collectionsFile.get('collections').find({
            id: id
        });
    })
};

// delete a collection by collectionId
exports.deleteCollectionById = function (obj) {
    return this.readJsons(collectionsPath).then(function (collectionsFile) { 
        return collectionsFile.get('collections').remove({ 
            id: obj.collectionId 
        }).write(); 
    });
};

// edit an item by collection and item id
exports.editCollectionById = function (obj) { 
    return this.getCollectionById(obj.collectionId).then(function (collection) { 
        var item = collection.get('items').find({
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