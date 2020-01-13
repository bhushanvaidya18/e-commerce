module.exports = (app) => {
    const orderItemsStatusCodes = require('../controllers/orderItemsStatusCodes.controller.js');

    // Create a new orderItemsStatusCodes
    app.post('/orderItemsStatusCodes', orderItemsStatusCodes.create);

    // Retrieve all orderItemsStatusCodes
    app.get('/orderItemsStatusCodes', orderItemsStatusCodes.findAll);

    // Retrieve a single orderItemsStatusCodes with orderItemsStatusCodesId
    app.get('/orderItemsStatusCodes/:orderItemsStatusCodesId', orderItemsStatusCodes.findOne);

    // Update a orderItemsStatusCodes with orderItemsStatusCodesId
    app.put('/orderItemsStatusCodes/:orderItemsStatusCodesId', orderItemsStatusCodes.update);

    // Delete a orderItemsStatusCodes with orderItemsStatusCodesId
    app.delete('/orderItemsStatusCodes/:orderItemsStatusCodesId', orderItemsStatusCodes.delete);
}
