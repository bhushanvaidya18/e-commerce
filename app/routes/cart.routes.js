module.exports = (app) => {
    const cart = require('../controllers/cart.controller.js');
    const customer = require('../controllers/customer.controller.js');

    // Create a new cart
    app.post('/cart', customer.validate, cart.create);

    // Retrieve all cart
    app.get('/cart', cart.findAll);

    // Retrieve a single cart with cartId
    app.get('/cart/:cartId', cart.findOne);

    // Update a cart with cartId
    app.put('/cart/:cartId', cart.update);

    // Delete a cart with cartId
    app.delete('/cart/:cartId', cart.delete);
}
