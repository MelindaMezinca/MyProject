const Product = require('../models/product.model');
const bodyParser = require('body-parser');


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
exports.product_details =  (req, res, next) => {
    const id = req.params.id;
    //if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next (err);
        res.send(product);
    })
}
//} 
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


/////// endpoint with gte ////////////
exports.product_filter = (req,res) => {
    const id = req.query.id;
    const price = req.query.price;

   //You need a method in the mongo db which is exposing SELCT * FROM PRODUCTS WHERE id = req.query.id and price >20;
   
   var query = Product.find( {id : id, price: { $gte: 20 }});

   query.exec(function (err, product) {
   if (err) return next (err);
        res.send(product);
  }); 

}
////// end test endpoint with gte ////////

/// gte with dynamic value: endpoint: /products/search?filterFields=price&lowerValue=20 /////
exports.product_filter_price= (req,res)=>{
    console.log(req.query);
    if (req.query.filterFields!=null) {
    const price = req.query.filterFields;
    const lowerValue = req.query.lowerValue;
    var query = Product.find( {price: { $gte: lowerValue }});

   query.exec(function (err, product, next) {
   if (err) return next (err);
        res.send(product);
  }); 
    }
}
/////////////////// end ///////////////


exports.product_all = (req, res) => {
    Product.find(req.params.id, (err, product) => {
        if (err) return next (err);
        res.send(product);
    })
}