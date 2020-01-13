module.exports = (app) => {
    const order = require('../controllers/order.controller.js');

    // Create a new order
    app.post('/order', order.create);

    // Retrieve all order
    app.get('/order', order.findAll);

    // Retrieve a single order with orderId
    app.get('/order/:orderId', order.findOne);

    // Update a order with orderId
    app.put('/order/:orderId', order.update);

    // Delete a order with orderId
    app.delete('/order/:orderId', order.delete);
}
