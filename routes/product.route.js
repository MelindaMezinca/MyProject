const express = require('express');
const router = express.Router();

// Require the controllers
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly
router.get('/test', product_controller.test);

 // create a new product
 router.post('/create', product_controller.product_create);

 // read an existing product
 router.get('/:id', product_controller.product_details);

 // update an existing product
 router.put('/:id/update', product_controller.product_update);

 // delete an existing product
 router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;