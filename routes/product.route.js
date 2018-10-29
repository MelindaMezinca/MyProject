const express = require('express');
const router = express.Router();

// Require the controllers
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly
router.get('/test', product_controller.test);

 // create a new product
 router.post('/product/create', product_controller.product_create);

 // read an existing product
 router.get('/product/:id', product_controller.product_details);

 // update an existing product
 router.put('/product/:id/update', product_controller.product_update);

 // delete an existing product
 router.delete('/product/:id/delete', product_controller.product_delete);

 // endpoint
//router.get('/product/:id/execute', product_controller.product_filter);

 // endpoint /products/search?filterFields=price&lowerValue=20 
 router.get('/products/search', product_controller.product_filter_price);

 //  GET request for list of all Products items
 router.get('/products', product_controller.product_all);

module.exports = router;