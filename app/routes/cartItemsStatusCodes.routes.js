module.exports = (app) => {
    const cartItemsStatusCodes = require('../controllers/cartItemsStatusCodes.controller.js');

    // Create a new cartItemsStatusCodes
    app.post('/cartItemsStatusCodes', cartItemsStatusCodes.create);

    // Retrieve all cartItemsStatusCodes
    app.get('/cartItemsStatusCodes', cartItemsStatusCodes.findAll);

    // Retrieve a single cartItemsStatusCodes with cartItemsStatusCodesId
    app.get('/cartItemsStatusCodes/:cartItemsStatusCodesId', cartItemsStatusCodes.findOne);

    // Update a cartItemsStatusCodes with cartItemsStatusCodesId
    app.put('/cartItemsStatusCodes/:cartItemsStatusCodesId', cartItemsStatusCodes.update);

    // Delete a cartItemsStatusCodes with cartItemsStatusCodesId
    app.delete('/cartItemsStatusCodes/:cartItemsStatusCodesId', cartItemsStatusCodes.delete);
}
