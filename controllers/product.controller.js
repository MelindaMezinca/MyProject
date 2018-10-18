const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test =  (req, res) => res.send('Greetings from the Test controller!');

//////// create a new product ////////////
exports.product_create = (req, res) =>  {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save( (err) => {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
//////// end create a new product //////////

/////// read an existing product /////////
exports.product_details =  (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next (err);
        res.send(product);
    })
} 
///// end read an existing product ////

//// update an existing product ////
exports.product_update = (req,res) => {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},  (err, product) => {
        if (err) return next (err);
        res.send('Product updated.');
    })
}
///// end update an existing product /////


///// delete an existing product //////
exports.product_delete = (req,res) => {
    Product.findByIdAndRemove(req.params.id,  (err) => {
        if (err) return next (err);
        res.send('Deleted successfully');
    })
};
///// end delete an existing product /////