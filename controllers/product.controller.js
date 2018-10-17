const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//////// create a new product ////////////
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
//////// end create a new product //////////

/////// read an existing product /////////
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product){
        if (err) return next (err);
        res.send(product);
    })
} 
///// end read an existing product ////

//// update an existing product ////
exports.product_update = function(req,res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next (err);
        res.send('Product updated.');
    })
}
///// end update an existing product /////


///// delete an existing product //////
exports.product_delete = function(req,res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next (err);
        res.send('Deleted successfully');
    })
};
///// end delete an existing product /////