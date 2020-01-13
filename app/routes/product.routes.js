module.exports = (app) => {
    const product = require('../controllers/product.controller.js');
    const seller = require('../controllers/seller.controller.js');
    const customer = require('../controllers/customer.controller.js');

    // Create a new product
    app.post('/product', seller.validate, product.create);

    // Retrieve all product
    app.get('/product', seller.validate, product.findAll);

    // Retrieve a single product with productId
    app.get('/product/:productId', seller.validate, product.findOne);

    // Update a product with productId
    app.put('/product/:productId', seller.validate, product.update);

    // Delete a product with productId
    app.delete('/product/:productId', seller.validate, product.delete);

    // Retrieve all product
    app.get('/product/view/customer', customer.validate, product.findWithFilters);
}
