module.exports = (app) => {
    const orderItems = require('../controllers/orderItems.controller.js');

    // Create a new orderItems
    app.post('/orderItems', orderItems.create);

    // Retrieve all orderItems
    app.get('/orderItems', orderItems.findAll);

    // Retrieve a single orderItems with orderItemsId
    app.get('/orderItems/:orderItemsId', orderItems.findOne);

    // Update a orderItems with orderItemsId
    app.put('/orderItems/:orderItemsId', orderItems.update);

    // Delete a orderItems with orderItemsId
    app.delete('/orderItems/:orderItemsId', orderItems.delete);
}
