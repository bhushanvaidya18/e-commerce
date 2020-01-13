module.exports = (app) => {
    const cartItems = require('../controllers/cartItems.controller.js');

    // Create a new cartItems
    app.post('/cartItems', cartItems.create);

    // Retrieve all cartItems
    app.get('/cartItems', cartItems.findAll);

    // Retrieve a single cartItems with cartItemsId
    app.get('/cartItems/:cartItemsId', cartItems.findOne);

    // Update a cartItems with cartItemsId
    app.put('/cartItems/:cartItemsId', cartItems.update);

    // Delete a cartItems with cartItemsId
    app.delete('/cartItems/:cartItemsId', cartItems.delete);
}
