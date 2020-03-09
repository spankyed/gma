var router = require('express').Router();
var Database = require('../functions/database/index');

var productsController = require('./products')(Database);
var collectionsController = require('./collections')(Database);

router.use('/collections', collectionsController)  
router.use('/products', productsController)  

module.exports = router;
